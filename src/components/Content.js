import Card from "./Card";
import { noResultsMessages } from "../data/messages";

const Content = ({ data }) => {
  const isData = data.length > 0;

  const getNoResultsMessage = () => {
    const randomIndex = Math.floor(Math.random() * noResultsMessages.length);
    return noResultsMessages[randomIndex];
  };

  return isData ? (
    <div className="cards p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {data.map((item, index) => (
        <Card bar={item} index={index} />
      ))}
    </div>
  ) : (
    <div className="flex my-16 mx-24 text-center sm:mx-auto w-fit items-center">
      {getNoResultsMessage()}
    </div>
  );
};

export default Content;
