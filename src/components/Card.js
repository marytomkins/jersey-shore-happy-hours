import { useState, useRef, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const Card = ({ bar, index }) => {
  const { name, town, dayText, timeText, description, link } = bar;
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowToggle(contentRef.current.scrollHeight > 105);
    }
  }, [bar]);

  return (
    <div
      key={index}
      className={`relative flex flex-col bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md transition duration-300 min-h-[9rem] ${
        expanded ? "max-h-[1000px]" : "max-h-[9rem]"
      }`}
    >
      <div
        className="transition duration-300 overflow-hidden flex flex-col"
        ref={contentRef}
      >
        <div className="font-semibold text-base flex justify-between">
          <div>{name}</div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover-text-light-blue"
          >
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        </div>
        <div className="flex items-center text-sm">
          {<MapPinIcon className="w-4 h-4 mr-1" style={{ color: "#3677cd" }} />}
          {town}
        </div>
        <div className="text-[.9rem] font-medium">
          {dayText}
          {timeText ? ", ": ""}
          {timeText}
        </div>
        <div className="text-sm">{description}</div>
      </div>
      {showToggle && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm cursor-pointer text-right hover:underline focus:outline-none"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
      {!expanded && showToggle && (
        <div className="absolute bottom-9 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default Card;
