import Card from "./Card";
import { noResultsMessages } from "../data/messages";

const Content = ({ data, verifiedDate }) => {
  const isData = data.length > 0;

  const getNoResultsMessage = () => {
    const randomIndex = Math.floor(Math.random() * noResultsMessages.length);
    return noResultsMessages[randomIndex];
  };

  return (
    <div>
      <div className="flex justify-between px-6 pt-6">
        <div className="last-verified-text text-sm font-small ">
          Last Verified: {verifiedDate}
        </div>
        <div className="results text-sm font-small">
          {data.length} Results
        </div>
      </div>
      {isData ? (
        <div className="cards px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {data.map((item, index) => (
            <Card bar={item} index={index} />
          ))}
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
