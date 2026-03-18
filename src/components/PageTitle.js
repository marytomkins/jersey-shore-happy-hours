const PageTitle = ({ day = null, town = null, special = null }) => {
  let title = day || town || special || "";
  return (
    <h1 className="flex flex-col justify-center text-center overflow-wrap m-4 mb-0 sm:text-5xl text-4xl text-blue">
      {(day || town) ? (
        <>
          <div>{title?.toUpperCase()}</div>
          <div>H a p p y H o u r s</div>
        </>
      ) : (
        <div>{title?.charAt(0).toUpperCase() + title?.slice(1)} Specials</div>
      )}
    </h1>
  );
};

export default PageTitle;
