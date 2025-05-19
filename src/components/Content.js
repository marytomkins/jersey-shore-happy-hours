import React from "react";
import Card from "./Card";

const Content = ({ data }) => {
  return (
    <div className="cards p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {data.map((item, index) => (
        <Card bar={item} index={index} />
      ))}
    </div>
  );
};

export default Content;
