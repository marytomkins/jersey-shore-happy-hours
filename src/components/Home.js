import { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import Content from "../components/Content";
import { happyHours } from "../data/happyHours";
import { parseTimeString } from "../data/helpers";

const Home = () => {
  const [filteredData, setFilteredData] = useState(happyHours);
  const [currentHappyHours, setCurrentHappyHours] = useState([]);
  const [sortByState, setSortByState] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentDay = now.toLocaleString("en-US", { weekday: "long" });
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const currentTime = `${hours}:${paddedMinutes}${period}`;

    const result = happyHours.filter((item) => {
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
    setCurrentHappyHours(result);
  }, []);

  const handleFilter = (filters, searchTerm = "", happeningNow = false) => {
    const { towns, days, times } = filters || [];
    const data = happeningNow ? currentHappyHours : happyHours;
    const result = data.filter((item) => {
      const matchTown = towns?.length === 0 || towns?.includes(item.town);
      const matchDay =
        days?.length === 0 ||
        Object.keys(item.dayFilter)?.some((day) => days?.includes(day));
      const matchTime =
        times?.length === 0 ||
        item.timeFilter?.some((time) => times?.includes(time));
      const matchSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());
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
      <FilterBar onFilter={handleFilter} onSort={handleSort} />
      <Content data={filteredData} />
    </div>
  );
};

export default Home;
