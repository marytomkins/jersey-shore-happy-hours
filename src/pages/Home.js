import { Link } from "react-router-dom";
import home from "../images/home.png";
import { towns, days, truncDays } from "../data/filters";
import posthog from "posthog-js";
import { FaFootballBall } from "react-icons/fa";
// import Specials from "./Specials";

function getToday() {
  return days[new Date().getDay()];
}

function formatSearchLink(item) {
  return `${item.toLowerCase().trim().replace(/\s+/g, "-")}-happy-hours`;
}

const Home = () => {
  return (
    <div className="home-page">
      <div className="section-1 h-[66vh] sm:h-[81vh] flex flex-col items-center justify-center bg-white rounded-2xl mx-4 mb-8 shadow-lg">
        <Link to="/" className="w-4/5 nav:w-3/5 my-0 mx-auto">
          <img src={home} alt="Jersey Shore Happy Hours" />
        </Link>
        <h2 className="tagline text-center font-semibold sm:text-base text-sm mt-4 mx-8 sm:mx-40">
          Your guide to the best happy hours and daily deals along the Jersey
          Shore!
        </h2>
        <div className="flex flex-col nav:flex-row justify-center mt-8">
          <Link
            to={`/happyhours?day=${getToday()}`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
            onClick={() =>
              posthog.capture("home_cta_clicked", {
                cta: "Today's Happy Hours",
              })
            }
          >
            Today's Happy Hours
          </Link>
          <Link
            to={`/happyhours`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
            onClick={() =>
              posthog.capture("home_cta_clicked", { cta: "All Happy Hours" })
            }
          >
            All Happy Hours
          </Link>
          <Link
            to={`/map`}
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-44 py-2 rounded-3xl m-2"
            onClick={() =>
              posthog.capture("home_cta_clicked", { cta: "View Map" })
            }
          >
            View Map
          </Link>
        </div>
      </div>
      {/* <div className="specials py-12 mt-8 border-t border-gray-300">
        <Specials />
      </div> */}
      <div className="search-by-container justify-center border-t border-gray-300 pb-16 pt-14 bg-light-blue">
        <h1 className="text-center font-semibold text-blue sm:text-4xl text-2xl sm:mx-24">
          Game Day is Better at the SHORE!
        </h1>
        <h2 className="tagline text-center font-semibold sm:text-base text-sm mt-4 mx-8 sm:mx-40">
          Check out all the NFL Game Day Specials at your favorite Jersey Shore bars and restaurants!
        </h2>
        <Link
          to={`/game-day-specials`}
          className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-max rounded-3xl m-auto mt-8 py-3 px-8"
          onClick={() =>
            posthog.capture("home_cta_clicked", { cta: "GAME DAY SPECIALS" })
          }
        >
          <FaFootballBall className="mt-1 mr-2" />
          VIEW ALL NFL GAME DAY SPECIALS
          <FaFootballBall className="mt-1 ml-2" />

        </Link>
      </div>
      <div className="search-by-town justify-center border-t border-gray-300 pb-16 pt-8">
        <h1 className="text-center font-semibold text-blue sm:text-4xl text-2xl sm:mx-40">
          s e a r c h BY d a y
        </h1>
        <div className="towns p-6 pb-0 gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 nav:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center">
          {truncDays.map((day, index) => (
            <Link
              key={day}
              to={formatSearchLink(days[index])}
              className="flex text-blue hover:text-white hover-bg-light-blue items-center justify-center text-center text-base font-semibold bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md lg:min-w-[8rem] min-h-[6rem]"
              onClick={() =>
                posthog.capture("search_by_day_clicked", { day: days[index] })
              }
            >
              <h2>{day}</h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="search-by-town justify-center border-t border-gray-300 pb-16 pt-8">
        <h1 className="text-center font-semibold text-blue sm:text-4xl text-2xl sm:mx-40">
          s e a r c h BY t o w n
        </h1>
        <div className="towns p-6 pb-0 gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 nav:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center">
          {towns.map((town) => (
            <Link
              key={town}
              to={formatSearchLink(town)}
              className="flex text-blue hover:text-white hover-bg-light-blue items-center justify-center text-center text-base font-semibold bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md lg:min-w-[8rem] min-h-[6rem]"
              onClick={() =>
                posthog.capture("search_by_town_clicked", { town })
              }
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
