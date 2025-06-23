import { useState } from "react";

const Map = () => {
  return (
    <div className="flex justify-center m-8">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1Zc1LD8riGfNPKuNzq-n6TuA8-Jt7mQo&ehbc=2E312F"
        width="640" height="480"
        allowFullScreen
        loading="lazy"
        className="border-none rounded-lg shadow-md"
      ></iframe>
    </div>
  );
};
export default Map;
