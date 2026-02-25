import { Link } from "react-router-dom";

const TownBlurb = ({ town = null }) => {
  return town ? (
    <h1 className="flex flex-col justify-center text-center overflow-wrap m-4 mb-0 sm:text-3xl text-2xl text-blue">
      <div>{town?.toUpperCase()}</div>
      <div>H a p p y H o u r s</div>
    </h1>
  ) : (
    <Link to="/happyhours" className="flex flex-col justify-center text-center overflow-wrap m-4 font-bold uppercase text-large text-blue hover-text-light-blue">
      View All Happy Hours
    </Link>
  );
};

export default TownBlurb;
