import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import FilterBar from "./FilterBar";
import Content from "./Content";
import Spinner from "./Spinner";
import MappyHours from "../pages/MappyHours";
import { parseTimeString, loadPageContent } from "../data/helpers";

const Page = ({ page, day = null, town = null, special = null }) => {
  const [content, setContent] = useState([]);
  const [verifiedDate, setVerifiedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currently, setCurrently] = useState([]);
  const [sortByState, setSortByState] = useState("");
  const [error, setError] = useState(false);
  const location = useLocation();
  const lastFetchedPath = useRef(null);
  const isMapPage = page === "map";

  useEffect(() => {
    if (lastFetchedPath.current === location.pathname) return;
    lastFetchedPath.current = location.pathname;
    setError(false);
    loadPageContent({
      pathname: location.pathname,
      special,
      day,
      town,
      setVerifiedDate,
      setContent,
      setError,
    });
  }, [location.pathname, day, town, special, isMapPage]);

  useEffect(() => {
    if (content?.length) {
      setFilteredData(content);
    }
  }, [content]);

  useEffect(() => {
    if (!day && !town && !special) {
      const now = new Date();
      const currentDay = now.toLocaleString("en-US", { weekday: "long" });
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const paddedMinutes = minutes.toString().padStart(2, "0");
      const currentTime = `${hours}:${paddedMinutes}${period}`;

      const result = content.filter((item) => {
        const matchDay =
          item &&
          item.dayFilter &&
          typeof item.dayFilter === "object" &&
          Object.keys(item.dayFilter).includes(currentDay);
        if (matchDay) {
          const [start, end] = item?.dayFilter[currentDay];
          if (start.toLowerCase() === "all day") return true;
          const current = parseTimeString(currentTime);
          const startMinutes = parseTimeString(start);
          const endMinutes = parseTimeString(end);
          return current >= startMinutes && current <= endMinutes;
        }
        return false;
      });
      setCurrently(result);
    }
  }, [content, day, town, special]);

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
              .trim(),
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

  if ((!content || content.length === 0) && !error) {
    return <Spinner />;
  }

  return (
    <div className={`${page}-page`}>
      <FilterBar
        page={page}
        onFilter={handleFilter}
        onSort={handleSort}
        dataReady={content.length > 0}
        day={day}
        town={town}
      />
      {isMapPage ? (
        <MappyHours data={filteredData} currently={currently} />
      ) : (
        <Content
          data={filteredData}
          verifiedDate={verifiedDate}
          currently={currently}
          error={error}
        />
      )}
      {(day || town) && (
        <Link
          to="/happyhours"
          className="flex flex-col justify-center text-center break-words m-4 mb-8 font-bold uppercase text-lg text-blue hover-text-light-blue"
        >
          View All Happy Hours
        </Link>
      )}
      {special && (
        <Link
          to="/specials"
          className="flex flex-col justify-center text-center break-words m-4 mb-8 font-bold uppercase text-lg text-blue hover-text-light-blue"
        >
          View All Specials
        </Link>
      )}
    </div>
  );
};

export default Page;
