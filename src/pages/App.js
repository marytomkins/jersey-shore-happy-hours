import "../App.css";
import { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import Content from "../components/Content";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { happyHours } from "../data/happyHours";
function App() {
  const [filteredData, setFilteredData] = useState(happyHours);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [sortByState, setSortByState] = useState("");

  const handleFilter = (filters, searchTerm = "") => {
    const { towns, days, times } = filters || [];
    const result = happyHours.filter((item) => {
      const matchTown = towns?.length === 0 || towns?.includes(item.town);
      const matchDay =
        days?.length === 0 ||
        item.dayFilter?.some((day) => days?.includes(day));
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
    }
    setFilteredData(sortedData);
  };

  return (
    <div className="App h-max flex flex-col">
      <Analytics />
      <div>
        <Header />
      </div>
      <div className="main-content flex-grow">
        {showFeedbackForm ? (
          <Feedback />
        ) : (
          <>
            <FilterBar onFilter={handleFilter} onSort={handleSort} />
            <Content data={filteredData} />
          </>
        )}
      </div>
      <Footer
        onClick={() => setShowFeedbackForm(!showFeedbackForm)}
        showFeedbackForm={showFeedbackForm}
      />
    </div>
  );
}

export default App;
