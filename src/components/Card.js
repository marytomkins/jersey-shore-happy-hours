import { useState, useRef, useEffect } from "react";
import Tooltip from "./Tooltip";
import {
  MapPinIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  FireIcon,
} from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const Card = ({ bar, index, happeningNow }) => {
  const { name, town, dayText, description, link, specials, events } = bar;
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowToggle(contentRef.current.scrollHeight > 200);
      setExpanded(window.innerWidth < 640);
    }
  }, [bar]);

  const ListText = ({ text, bullets = true }) => {
    if (!text) return null;
    const items = text.split("/").map((item) => item.trim());
    return (
      <ul className={bullets ? `list-disc ml-5` : ""}>
        {items.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    );
  };

  const EventText = ({ text }) => {
    if (!text) return null;
    const items = text.split("/").map((item) => item.trim());
    return (
      <div className="flex flex-col">
        {items.map((item, idx) => {
          const [left, right] = item.split("#").map((part) => part.trim());
          return (
            <div key={idx} className="flex border-b border-gray-300 py-2">
              <div className="w-1/2 text-sm font-medium pr-2 border-r border-gray-300">
                {left}
              </div>
              <div className="w-1/2 text-sm pl-2">{right}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      key={index}
      className={`relative flex flex-col bg-white shadow-sm rounded-2xl p-4 border border-gray-200 hover:shadow-md transition duration-300 min-h-[15rem] ${
        expanded ? "max-h-[1000px]" : "max-h-[15rem]"
      }`}
    >
      <div
        className="transition duration-300 overflow-hidden flex flex-col"
        ref={contentRef}
      >
        <div className="font-semibold text-base flex justify-between">
          <div className="text-xl">{name}</div>
          <div className="flex items-center gap-2">
            {happeningNow && (
              <Tooltip
                icon={<FireIcon className="w-5 h-5 text-[#ff9b64]" />}
                text="Happening Now!"
              />
            )}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover-text-light-blue"
            >
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="flex items-center text-sm pb-2 border-b border-gray-300">
          {<MapPinIcon className="w-4 h-4 mr-1" style={{ color: "#3677cd" }} />}
          {town}
        </div>
        {events ? (
          <EventText text={events} bullets={false} />
        ) : dayText ? (
          <div className="flex py-2">
            <div className="w-1/2 pr-2">
              <div className="flex items-center mb-1">
                <span className="font-semibold text-xs tracking-wide text-[#aad8d5]">
                  HAPPY HOUR
                </span>
              </div>
              <div className="text-sm font-medium">
                <ListText text={dayText} bullets={false} />
              </div>
            </div>
            {description && (
              <div className="text-sm w-1/2 pl-2 border-l border-gray-300">
                <div className="flex items-center mb-1">
                  <span className="font-semibold text-xs tracking-wide text-[#8da663]">
                    DEALS
                  </span>
                </div>
                <ListText text={description} />
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        {specials && (
          <div className="py-2 text-sm">
            <div className="bg-[#e4f2f4] border-[#3677cd] p-2 rounded-lg border">
              <div className="flex items-center mb-1">
                <span className="font-semibold text-xs tracking-wide text-blue">
                  DAILY SPECIALS
                </span>
              </div>
              <ListText text={specials} bullets={false} />
            </div>
          </div>
        )}
      </div>
      {showToggle && (
        <div className="flex justify-end">
          {expanded ? (
            <ChevronDoubleUpIcon
              className="w-6 h-6 text-blue hover:text-light-blue cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            />
          ) : (
            <ChevronDoubleDownIcon
              className="w-6 h-6 text-blue hover:text-light-blue cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            />
          )}
        </div>
      )}
      {!expanded && showToggle && (
        <div className="absolute bottom-9 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default Card;
