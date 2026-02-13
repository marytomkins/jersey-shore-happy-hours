import { Link } from "react-router-dom";
import home from "../images/home.png";

function getToday() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
}

const Home = () => {
  return (
    <div className="home-page">
      <div className="section-1 h-[66vh] sm:h-[81vh] flex flex-col items-center justify-center bg-white rounded-2xl mx-4 mb-4 shadow-lg">
        <Link to="/" className="w-4/5 nav:w-3/5 my-0 mx-auto">
          <img src={home} alt="Jersey Shore Happy Hours" className="" />
        </Link>
        <span className="tagline text-center font-semibold sm:text-base text-sm mt-4 mx-8 sm:mx-40">
          Your guide to the best happy hours and daily deals along the Jersey
          Shore from Asbury Park to Point Pleasant
        </span>
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
      {/* <div className="section-2 flex flex-row h-[40vh]">
        <div className="w-1/2 py-6 px-24 flex flex-col text-left justify-center bg-light-blue">
          <span className="font-bold text-2xl text-white mb-4">NEW!</span>
          <p className="text-base font-semibold">Your guide to daily events and happenings when you're not just looking for a happy hour deal...</p>
        </div>
        <div className="">
        </div>
      </div> */}
      <div className="flex flex-wrap">
        {/* <img src={home1} alt="Home 1" className="md:w-1/4 w-1/2 h-auto" />
        <img src={home2} alt="Home 2" className="md:w-1/4 w-1/2 h-auto" />
        <img src={home3} alt="Home 3" className="md:w-1/4 w-1/2 h-auto" /> */}
        {/* <img src={home4 ?? ""} alt="Home 4" className="md:w-1/4 w-1/2 h-auto" /> */}
      </div>
    </div>
  );
};

export default Home;
