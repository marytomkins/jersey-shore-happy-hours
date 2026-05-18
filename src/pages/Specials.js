import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom"

const Specials = () => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <h1 className="text-center font-semibold text-blue sm:text-4xl text-2xl sm:mx-40">
        S p e c i a l S
      </h1>
      <div className="towns p-6 gap-4 grid md:grid-cols-3 grid-cols-1">
        <div className="flex flex-col text-blue bg-white shadow-sm rounded-2xl p-10 border border-gray-200 hover:shadow-md h-full">
          <h2 className="text-3xl font-semibold mb-4">Wine Deals</h2>
          <p>All the best wine deals by-the-glass and more below!</p>
          <div className="flex-grow" />
          <Link
            to="/specials/wine"
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-24 py-2 rounded-3xl mt-8"
          >
            View
            <ArrowLongRightIcon className="w-4 ml-2" />
          </Link>
        </div>
        <div className="flex flex-col text-blue bg-white shadow-sm rounded-2xl p-10 border border-gray-200 hover:shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Margarita Deals</h2>
          <p>
            It's never too early for a marg. Find the best margarita deals
            below!
          </p>
          <div className="flex-grow" />
          <Link
            to="/specials/margarita"
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-24 py-2 rounded-3xl mt-8"
          >
            View
            <ArrowLongRightIcon className="w-4 ml-2" />
          </Link>
        </div>
        <div className="flex flex-col text-blue bg-white shadow-sm rounded-2xl p-10 border border-gray-200 hover:shadow-md">
          <h2 className="text-3xl font-semibold mb-4">Martini Deals</h2>
          <p>
            Shaken or stirred? Dirty or espresso? Discover the best martini
            specials below!
          </p>
          <div className="flex-grow" />
          <Link
            to="/specials/martini"
            className="flex justify-center text-center font-semibold bg-blue hover-bg-light-blue text-sm text-white w-24 py-2 rounded-3xl mt-8"
          >
            View
            <ArrowLongRightIcon className="w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Specials;
