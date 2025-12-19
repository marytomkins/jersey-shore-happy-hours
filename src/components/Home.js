import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../components/FilterBar";
// import MobileFilter from "../components/MobileFilter";
import Content from "../components/Content";
import { parseTimeString } from "../data/helpers";

const Home = ({ page }) => {
  const [content, setContent] = useState([]);
  const [verifiedDate, setVerifiedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currently, setCurrently] = useState([]);
  const [sortByState, setSortByState] = useState("");
  const location = useLocation();
  useEffect(() => {
    let url =
      window.location.pathname === "/happenings"
        ? "https://gist.githubusercontent.com/marytomkins/547cce901dea5e7d5e96870b68917df2/raw/dcfe88c91340f8a32969d6f8c6c60526e097b59c/happenings.json?ts="
        : "https://gist.githubusercontent.com/marytomkins/a25ef825b3571312111b34581c0f28e1/raw/happyHours.json?ts=";

    fetch(url + Date.now())
      .then((res) => res.json())
      .then((json) => {
        if (json && Object.prototype.hasOwnProperty.call(json, "lastVerified")) {
          setVerifiedDate(json.lastVerified);
        }
        if (json && Object.prototype.hasOwnProperty.call(json, "content")) {
          const sortedContent = json.content.sort((a, b) => a.name.localeCompare(b.name));
          setContent(sortedContent);
        }
      });
  }, [location]);

  useEffect(() => {
    setFilteredData(content);
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

  const searchCheck = (item, searchTerm) => {
    let name = item.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
    let search = searchTerm.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
    return name.includes(search);
  }

  const handleFilter = (filters, searchTerm = "", happeningNow = false) => {
    const { towns, events, days, times } = filters || [];
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
        !searchTerm || searchCheck(item.name, searchTerm)
      return matchTown && matchDay && matchTime && matchSearch;
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

  return (
    <div className="home-page">
      {/* <div className="sm:hidden"> */}
      <FilterBar page={page} onFilter={handleFilter} onSort={handleSort} />
      {/* </div> */}
      {/* <div><MobileFilter /></div> */}
      <Content data={filteredData} verifiedDate={verifiedDate} />
    </div>
  );
};

export default Home;
