import React, { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const towns = [
  "Asbury Park",
  "Ocean Grove",
  "Bradley Beach",
  "Avon-by-the-sea",
  "Belmar",
  "Spring Lake",
  "Sea Girt",
  "Manasquan",
  "Point Pleasant",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const times = [
  "All Day",
  "3:00PM",
  "4:00PM",
  "5:00PM",
  "6:00PM",
  "7:00PM",
  "8:00PM",
  "9:00PM",
  "10:00PM",
  "11:00PM",
  "12:00AM",
];

const FilterBar = ({ onFilter }) => {
  const [selectedTowns, setSelectedTowns] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    towns: [],
    days: [],
    times: [],
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleSearch = () => {
    const newFilters = {
      towns: selectedTowns,
      days: selectedDays,
      times: selectedTimes,
    };
    setAppliedFilters(newFilters);
    onFilter({
      towns: selectedTowns,
      days: selectedDays,
      times: selectedTimes,
    });
  };

  const removeFilter = (category, value) => {
    const updated = {
      ...appliedFilters,
      [category]: appliedFilters[category].filter((item) => item !== value),
    };
    setAppliedFilters(updated);
    if (category === "towns") setSelectedTowns(updated.towns);
    if (category === "days") setSelectedDays(updated.days);
    if (category === "times") setSelectedTimes(updated.times);

    onFilter(updated);
  };

  const clearAllFilters = () => {
    setSelectedTowns([]);
    setSelectedDays([]);
    setSelectedTimes([]);
    setAppliedFilters({ towns: [], days: [], times: [] });
    onFilter({ towns: [], days: [], times: [] });
  };

  const renderDropdown = (label, key, options, selected, setSelected) => (
    <div className="relative group">
      <button
        className="flex items-center bg-white border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm hover:bg-gray-100"
        onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
      >
        <span className="mr-2">{label}</span>
        <ChevronDownIcon className="h-4 w-4 text-gray-500" />
      </button>

      {openDropdown === key && (
        <div className="absolute z-10 bg-white border border-gray-200 shadow-md rounded-md mt-2 p-2 w-40">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 py-1 text-sm"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleSelection(option, selected, setSelected)}
                className="accent-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  const renderSelectedFilters = (category, filters) =>
    filters.map((item) => (
      <div
        key={item}
        className="flex items-center bg-white text-sm px-2 py-1 mr-2 mb-2 rounded-full text-[#2f55c4] cursor-pointer hover:text-black"
      >
        <span className="mr-2 capitalize">{item}</span>
        <button onClick={() => removeFilter(category, item)}>×</button>
      </div>
    ));

  return (
    <div>
      <div className="filter-bar block sm:flex">
        <div ref={dropdownRef} className="dropdowns flex flex-wrap w-fit gap-2 items-center justify-start p-4">
          {renderDropdown(
            "Filter by town",
            "towns",
            towns,
            selectedTowns,
            setSelectedTowns
          )}
          {renderDropdown("Days", "days", days, selectedDays, setSelectedDays)}
          {renderDropdown(
            "Times",
            "times",
            times,
            selectedTimes,
            setSelectedTimes
          )}
        </div>
        <div className="buttons flex flex-wrap w-fit gap-4 items-center justify-start p-0 sm:p-4 m-auto sm:m-0">
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            Search
          </button>
          {(appliedFilters.towns.length > 0 ||
            appliedFilters.days.length > 0 ||
            appliedFilters.times.length > 0) && (
            <button
              onClick={clearAllFilters}
              className="bg-white text-[#2f55c4] px-4 py-2 rounded-md text-sm border border-gray-200 hover:bg-blue-700 transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="selected-filters flex flex-wrap px-4">
        {renderSelectedFilters("towns", appliedFilters.towns)}
        {renderSelectedFilters("days", appliedFilters.days)}
        {renderSelectedFilters("towns", appliedFilters.times)}
      </div>
    </div>
  );
};

export default FilterBar;
