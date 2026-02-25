import { Link } from "react-router-dom";
import home from "../images/home.png";
import { towns, days } from "../data/filters";

function getToday() {
  return days[new Date().getDay()];
}

function formatTownLink(town) {
  return `${town.toLowerCase().trim().replace(/\s+/g, "-")}-happy-hours`;
}

const Home = () => {
  return (
    <div className="home-page">
      <div className="section-1 h-[66vh] sm:h-[81vh] flex flex-col items-center justify-center bg-white rounded-2xl mx-4 mb-4 shadow-lg">
        <Link to="/" className="w-4/5 nav:w-3/5 my-0 mx-auto">
          <img src={home} alt="Jersey Shore Happy Hours" />
        </Link>
        <h2 className="tagline text-center font-semibold sm:text-base text-sm mt-4 mx-8 sm:mx-40">
          Your guide to the best happy hours and daily deals along the Jersey
          Shore from Asbury Park to Point Pleasant
        </h2>
        <div className="flex flex-col nav:flex-row justify-center mt-8">
          <Link
            to={`/happyhours?day=${getToday()}`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
          >
            Today's Happy Hours
          </Link>
          <Link
            to={`/happyhours`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
          >
            All Happy Hours
          </Link>
          <Link
            to={`/events`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
          >
            Daily Events
          </Link>
        </div>
      </div>
      <div className="search-by-town justify-center pt-8">
        <h1 className="text-center font-semibold text-blue sm:text-4xl text-2xl sm:mx-40">
          Search by Town
        </h1>
        <div className="towns p-6 gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 nav:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center">
          {towns.map((town) => (
            <Link
              key={town}
              to={formatTownLink(town)}
              className="flex text-blue hover:text-white hover-bg-light-blue items-center justify-center text-center text-base font-semibold bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md lg:min-w-[8rem] min-h-[6rem]"
            >
              <h2>{town}</h2>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="section-2 flex flex-row h-[40vh]">
        <div className="w-1/2 py-6 px-24 flex flex-col text-left justify-center bg-light-blue">
          <span className="font-bold text-2xl text-white mb-4">NEW!</span>
          <p className="text-base font-semibold">Your guide to daily events and happenings when you're not just looking for a happy hour deal...</p>
        </div>
        <div className="">
        </div>
      </div> */}
    </div>
  );
};

export default Home;
