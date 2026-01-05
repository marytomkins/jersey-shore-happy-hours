import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

const towns = [
  "Asbury Park",
  "Ocean Grove",
  "Bradley Beach",
  // "Avon-by-the-sea",
  "Belmar",
  "Spring Lake",
  "Sea Girt",
  "Manasquan",
  "Brielle",
  "Point Pleasant",
];
const events = ["Trivia", "Bingo", "Karaoke"];
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
  "12:00PM",
  "1:00PM",
  "2:00PM",
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
const sortBy = [
  "Restaurant A to Z",
  "Restaurant Z to A",
  "Town A to Z",
  "Town Z to A",
];

const FilterBar = ({ page, onFilter, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTowns, setSelectedTowns] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Sort by");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showClearAll, setClearAllState] = useState(false);
  const [happeningNow, setHappeningNow] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    towns: [],
    events: [],
    days: [],
    times: [],
  });
  const dropdownRef = useRef(null);
  const showTimeFilter = !!(page === "home");
  const showEventFilter = !!(page === "happenings");

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

  const toggleSelection = (value, list, setList, search = false) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
    // if (search) {
    //   handleSearch();
    // }
  };

  const handleSearch = () => {
    setOpenDropdown(null);
    const newFilters = {
      towns: selectedTowns,
      events: selectedEvents,
      days: selectedDays,
      times: selectedTimes,
    };
    setAppliedFilters(newFilters);
    onFilter(
      {
        towns: selectedTowns,
        events: selectedEvents,
        days: selectedDays,
        times: selectedTimes,
      },
      searchTerm,
      happeningNow
    );
    setClearAllState(
      searchTerm.length > 0 ||
        selectedTowns.length > 0 ||
        selectedEvents.length > 0 ||
        selectedDays.length > 0 ||
        selectedTimes.length > 0
    );
  };

  const getCurrentDateTime = (getCurrentDateTime) => {
    setHappeningNow(getCurrentDateTime);
    setClearAllState(getCurrentDateTime);
    onFilter(
      {
        towns: selectedTowns,
        events: selectedEvents,
        days: selectedDays,
        times: selectedTimes,
      },
      searchTerm,
      getCurrentDateTime
    );
  };

  const removeFilter = (category, value) => {
    const updated = {
      ...appliedFilters,
      [category]: appliedFilters[category].filter((item) => item !== value),
    };
    setAppliedFilters(updated);
    if (category === "towns") setSelectedTowns(updated.towns);
    if (category === "events") setSelectedEvents(updated.events);
    if (category === "days") setSelectedDays(updated.days);
    if (category === "times") setSelectedTimes(updated.times);
    onFilter(updated, searchTerm, happeningNow);
    setClearAllState(
      searchTerm.length > 0 ||
        updated.towns?.length > 0 ||
        updated.events?.length > 0 ||
        updated.days?.length > 0 ||
        updated.times?.length > 0
    );
  };

  const setSortBy = (option) => {
    setOpenDropdown(false);
    setSelectedSort(option);
    onSort(option);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedTowns([]);
    setSelectedEvents([]);
    setSelectedDays([]);
    setSelectedTimes([]);
    setAppliedFilters({ towns: [], events: [], days: [], times: [] });
    onFilter({ towns: [], events: [], days: [], times: [] });
    setHappeningNow(false);
    setClearAllState(false);
  };

  const renderDropdown = (
    label,
    key,
    options,
    selected,
    setSelected,
    icon = <></>
  ) => {
    let isSortBy = key === "sortBy";
    let disabled = (key === "times" || key === "days") && happeningNow;
    return (
      <div className="relative group">
        <button
          className={`flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm hover:bg-gray-100 ${
            disabled ? "bg-gray-100" : "bg-white"
          }`}
          onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
          disabled={disabled}
        >
          {icon}
          <span className="mr-2">{label}</span>
          {openDropdown === key ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {openDropdown === key && (
          <div
            className={`absolute z-10 bg-white border border-gray-200 shadow-md rounded-md mt-2 p-2 w-40 ${
              isSortBy ? "right-0" : ""
            }`}
          >
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 py-1 text-sm hover:text-gray-500 cursor-pointer"
                onClick={() => (isSortBy ? setSortBy(option) : null)}
              >
                {!isSortBy && (
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() =>
                      toggleSelection(option, selected, setSelected)
                    }
                    className="accent-blue-600"
                  />
                )}
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSelectedFilters = (category, filters) =>
    filters.map((item) => (
      <div
        key={item}
        className="flex items-center bg-white text-sm px-2 py-1 mr-2 mb-2 rounded-full text-blue cursor-pointer hover:text-black"
      >
        <span className="mr-2 capitalize">{item}</span>
        <div onClick={() => removeFilter(category, item)}>×</div>
      </div>
    ));

  return (
    <div className="filter-bar">
      <div
        className="happening-now cursor-pointer flex justify-center w-fit m-auto items-center h-10 py-1 text-sm font-semibold hover:text-gray-500"
        onClick={() => {
          getCurrentDateTime(!happeningNow);
        }}
      >
        <button
          className={`relative inline-flex !h-6 w-11 items-center rounded-full transition-colors duration-300 mr-4 ${
            happeningNow ? "bg-green" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
              happeningNow ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        Happening Now
      </div>
      <div className="town-buttons flex flex-wrap gap-2 px-4 mt-4 mb-2 m-auto w-[85%] justify-center">
        {towns.map((town) => (
          <button
            key={town}
            className={`cursor-pointer hover:bg-gray-100 hover-text-blue bg-white border border-gray-300 rounded-3xl px-4 text-base font-semibold shadow-sm focus:outline-none ${
              selectedTowns.includes(town)
                ? "bg-blue text-white border-blue"
                : "text-blue bg-white border-gray-300 hover-bg-green"
            }`}
            onClick={() => toggleSelection(town, selectedTowns, setSelectedTowns, true)}
          >
            {town}
          </button>
        ))}
      </div>
      <div className="block sm:flex" ref={dropdownRef}>
        <div className="left-filters flex px-4 sm:px-8">
          <div className="search-filters flex  justify-center sm:justify-start flex-wrap items-center gap-2 py-4">
            <div>
              <input
                type="text"
                placeholder="Search by restaurant"
                className="cursor-pointer h-10 hover:bg-gray-100 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            <div className="dropdowns flex flex-wrap w-fit gap-2 items-center">
              {/* {renderDropdown(
                "Filter by town",
                "towns",
                towns,
                selectedTowns,
                setSelectedTowns
              )} */}
              {showEventFilter &&
                renderDropdown(
                  "Events",
                  "events",
                  events,
                  selectedEvents,
                  setSelectedEvents
                )}
              {renderDropdown(
                "Days",
                "days",
                days,
                selectedDays,
                setSelectedDays,
                <CalendarDaysIcon className="h-4 w-4 text-gray-500 mr-2" />
              )}
              {showTimeFilter &&
                renderDropdown(
                  "Times",
                  "times",
                  times,
                  selectedTimes,
                  setSelectedTimes,
                  <ClockIcon className="h-4 w-4 text-gray-500 mr-2" />
                )}
            </div>
          </div>
        </div>
        <div className="right-filters flex flex-wrap justify-center sm:justify-between grow pl-8 pr-8 sm:pl-0 py-4 gap-4">
          <div className="buttons flex w-fit gap-4">
            <button
              onClick={handleSearch}
              className="bg-blue text-white px-8 py-2 rounded-md text-sm hover-bg-green transition"
            >
              Search
            </button>
            {showClearAll && (
              <button
                onClick={clearAllFilters}
                className="bg-white min-w-[6rem] text-blue px-4 py-2 rounded-md text-sm border border-gray-200 hover-bg-green transition"
              >
                Clear All
              </button>
            )}
          </div>
          {renderDropdown(
            selectedSort,
            "sortBy",
            sortBy,
            selectedSort,
            setSelectedSort
          )}
        </div>
      </div>
      <div className="selected-filters flex flex-wrap px-4">
        {renderSelectedFilters("towns", appliedFilters.towns)}
        {renderSelectedFilters("events", appliedFilters.events)}
        {renderSelectedFilters("days", appliedFilters.days)}
        {renderSelectedFilters("times", appliedFilters.times)}
      </div>
    </div>
  );
};

export default FilterBar;
