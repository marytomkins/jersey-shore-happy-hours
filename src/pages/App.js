import "../App.css";
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import Content from "../components/Content";
import { happyHours } from "../data/happyHours";

function App() {
  const [filteredData, setFilteredData] = useState(happyHours);

  const handleFilter = (filters) => {
    const { towns, days, times } = filters;
    const result = happyHours.filter((item) => {
      const matchTown = towns.length === 0 || towns.includes(item.town);
      const matchDay =
        days.length === 0 || item.dayFilter?.some((day) => days.includes(day));
      const matchTime =
        times.length === 0 ||
        item.timeFilter?.some((time) => times.includes(time));
      return matchTown && matchDay && matchTime;
    });
    setFilteredData(result);
  };

  return (
    <div className="App h-max">
      <Header />
      <FilterBar onFilter={handleFilter} />
      <Content data={filteredData} />
    </div>
  );
}

export default App;
