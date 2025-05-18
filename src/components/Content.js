import React, { useState } from "react";
import { happyHours } from "../data/happyHours";
import Card from "./Card";

const Content = () => {
  return (
    <div className="cards p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {happyHours.map((bar, index) => 
      <Card bar={bar} index={index} />
        )}
    </div>
  );
};

export default Content;
