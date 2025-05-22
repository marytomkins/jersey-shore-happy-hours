import React from "react";

const Footer = ({ onClick, showFeedbackForm }) => {
  return (
    <div className="block text-center text-xs py-4">
      <div
        className="underline cursor-pointer hover:text-gray-300"
        onClick={() => onClick()}
      >
        {showFeedbackForm ? "Home Page" : "Feedback Form"}
      </div>
      <div className="mt-2">
        Jersey Shore Happy Hours © Developed by AMT 2025
      </div>
    </div>
  );
};
export default Footer;
