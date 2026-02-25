const TownBlurb = ({ town }) => {
  return (
    <h1 className="flex flex-col justify-center text-center overflow-wrap m-4 mb-0 sm:text-3xl text-2xl text-blue">
      <div>{town?.toUpperCase()}</div>
      <div>H a p p y H o u r s</div>
    </h1>
  );
};

export default TownBlurb;
