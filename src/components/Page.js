import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../components/FilterBar";
// import MobileFilter from "../components/MobileFilter";
import Content from "../components/Content";
import { parseTimeString } from "../data/helpers";

const Page = ({ page }) => {
  const [content, setContent] = useState([]);
  const [verifiedDate, setVerifiedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currently, setCurrently] = useState([]);
  const [sortByState, setSortByState] = useState("");
  const location = useLocation();
  const lastFetchedPath = useRef(null);

  useEffect(() => {
    if (lastFetchedPath.current === location.pathname) return;
    lastFetchedPath.current = location.pathname;

    let url =
      location.pathname === "/happyhours"
        ? "https://gist.githubusercontent.com/marytomkins/a25ef825b3571312111b34581c0f28e1/raw/happyHours.json?ts="
        : location.pathname === "/events"
        ? "https://gist.githubusercontent.com/marytomkins/547cce901dea5e7d5e96870b68917df2/raw/happenings.json?ts="
        : "";

    fetch(url + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (
          json &&
          Object.prototype.hasOwnProperty.call(json, "lastVerified")
        ) {
          setVerifiedDate(json.lastVerified);
        }
        if (json && Object.prototype.hasOwnProperty.call(json, "content")) {
          const sortedContent = json.content.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setContent(sortedContent);
        }
      });
  }, [location.pathname]);

  useEffect(() => {
    if (content.length) {
      setFilteredData(content);
    }
  }, [content]);

  useEffect(() => {
    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" });
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const currentTime = `${hours}:${paddedMinutes}${period}`;

    const result = content.filter((item) => {
      const matchDay = Object.keys(item.dayFilter).includes(currentDay);
      if (matchDay) {
        const [start, end] = item.dayFilter[currentDay];
        if (start.toLowerCase() === "all day") return true;
        const current = parseTimeString(currentTime);
        const startMinutes = parseTimeString(start);
        const endMinutes = parseTimeString(end);
        return current >= startMinutes && current <= endMinutes;
      }
      return false;
    });
    setCurrently(result);
  }, [content]);

  const handleFilter = (filters, searchTerm = "", happeningNow = false) => {
    const { towns, events, days, times } = filters || {};
    const data = happeningNow ? currently : content;
    const result = data.filter((item) => {
      const matchTown = towns?.length === 0 || towns?.includes(item.town);
      const matchEvents =
        events?.length === 0 ||
        item.eventFilter?.some((event) => events?.includes(event));
      const matchDay =
        days?.length === 0 ||
        Object.keys(item.dayFilter)?.some((day) => days?.includes(day));
      const matchTime =
        times?.length === 0 ||
        item.timeFilter?.some((time) => times?.includes(time));
      const matchSearch =
        !searchTerm ||
        item.name
          .toLowerCase()
          .replace(/[^\w\s]/g, "")
          .trim()
          .includes(
            searchTerm
              .toLowerCase()
              .replace(/[^\w\s]/g, "")
              .trim()
          );
      return matchTown && matchEvents && matchDay && matchTime && matchSearch;
    });
    if (sortByState) handleSort(sortByState, result);
    else setFilteredData(result);
  };

  const handleSort = (sortBy, data = []) => {
    setSortByState(sortBy);
    let sortedData = data.length > 0 ? [...data] : [...filteredData];
    switch (sortBy) {
      case "Restaurant A to Z":
        sortedData = sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Restaurant Z to A":
        sortedData = sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Town A to Z":
        sortedData = sortedData.sort((a, b) => a.town.localeCompare(b.town));
        break;
      case "Town Z to A":
        sortedData = sortedData.sort((a, b) => b.town.localeCompare(a.town));
        break;
      default:
        break;
    }
    setFilteredData(sortedData);
  };

  return content.length > 0 ? (
    <div className={`${page}-page`}>
      <FilterBar
        page={page}
        onFilter={handleFilter}
        onSort={handleSort}
        dataReady={content.length > 0}
      />
      <Content data={filteredData} verifiedDate={verifiedDate} />
    </div>
  ) : null;
};

export default Page;
