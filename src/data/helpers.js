import { gists } from "./gists";

export const loadPageContent = async ({
  pathname,
  special,
  day,
  town,
  setVerifiedDate,
  setContent,
  setError,
}) => {
  const { happyHours, events, specials } = gists;
  let url = null;
  if (pathname === "/events") {
    url = events;
  } else if (pathname.includes("/specials")) {
    if (special) {
      url = specials;
    } else return;
  } else {
    url = happyHours;
  }

  if (!url) return;

  try {
    const res = await fetch(url + Date.now());
    const json = await res.json();

    if (json && Object.prototype.hasOwnProperty.call(json, "lastVerified")) {
      setVerifiedDate(json.lastVerified);
    }

    if (json && Object.prototype.hasOwnProperty.call(json, "content")) {
      let filteredContent = json.content;
      if (day || town || special) {
        if (day) {
          filteredContent = filteredContent?.filter(
            (item) =>
              item?.dayFilter &&
              Object.prototype.hasOwnProperty.call(item.dayFilter, day),
          );
        }
        if (town) {
          filteredContent = filteredContent?.filter(
            (item) => item?.town?.toLowerCase() === town?.toLowerCase(),
          );
        }
        if (special) {
          filteredContent = filteredContent?.[special?.toLowerCase()];
        }
      }

      const sortedContent = filteredContent?.sort((a, b) =>
        a?.name.localeCompare(b?.name),
      );
      setContent(sortedContent);
    }
  } catch (error) {
    setError?.(true);
    console.error("Failed to load page content", error);
  }
};

export const parseTimeString = (timeStr) => {
  const match = timeStr.match(/(\d+):(\d+)(AM|PM)/i);
  if (!match) return null;
  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};
