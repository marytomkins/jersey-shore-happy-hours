import Card from "./Card";
import { noResultsMessages } from "../data/messages";

const Content = ({ data, verifiedDate, currently }) => {
  const isData = data.length > 0;

  const getNoResultsMessage = () => {
    const randomIndex = Math.floor(Math.random() * noResultsMessages.length);
    return noResultsMessages[randomIndex];
  };

  return (
    <div>
      <div className="flex justify-between px-6 pt-6">
        {verifiedDate && (
          <div className="last-verified-text text-sm font-small ">
            Last Verified: {verifiedDate}
          </div>
        )}
        <div className="results text-sm font-small ml-auto">
          {data.length} Result(s)
        </div>
      </div>
      {isData ? (
        <div className="cards px-6 py-4 items-start grid grid-cols-1 gap-4 sm:grid-cols-2 desktop:grid-cols-3 desktopPlus:grid-cols-4">
          {data.map((item, index) => {
            const happeningNow = currently.some(
              (curr) => curr.name === item.name,
            );
            return (
              <Card bar={item} index={index} happeningNow={happeningNow} />
            );
          })}
        </div>
      ) : (
        <div className="flex my-16 mx-24 text-center sm:mx-auto w-fit items-center">
          {getNoResultsMessage()}
        </div>
      )}
    </div>
  );
};

export default Content;
