import { gists } from "./gists";

export const getColors = (town) => {
  switch (town) {
    case "Red Bank":
      return "bg-[#3677cd] border-[#aad8d5] text-[#aad8d5]";
    case "Long Branch":
      return "bg-[#e0f2fb] border-[#ff7494] text-[#ff7494]";
    case "Asbury Park":
      return "bg-[#e8ef9c] border-[#595e2e] text-[#595e2e]";
    // case "Ocean Grove":
    //   return "bg-[#3677cd] border-[#e1f2fa] text-[#e1f2fa]";
    case "Bradley Beach":
      return "bg-[#ff9b64] border-[#fdf3ea] text-[#fdf3ea]";
    case "Avon-by-the-sea":
      return "bg-[#9bbb66] border-[#5d7931] text-white";
    case "Belmar":
      return "bg-[#ffdbdf] border-[#f49287] text-[#f49287]";
    case "Spring Lake":
      return "bg-[#aad8d5] border-[#3677cd] text-[#3677cd]";
    case "Sea Girt":
      return "bg-[#8da663] border-white text-white";
    case "Manasquan":
      return "bg-[#fda7bb] border-white text-white";
    case "Brielle":
      return "bg-[#fff5e6] border-[#ff9256] text-[#ff9256]";
    case "Point Pleasant":
      return "bg-[#e2e772] border-[#3677cd] text-[#3677cd]";
    default:
      return "bg-blue";
  }
};

export const loadPageContent = async ({
  pathname,
  special,
  day,
  town,
  setVerifiedDate,
  setContent,
  setError,
}) => {
  const { happyHours, events, specials, gameDaySpecials } = gists;
  let url = null;
  if (pathname === "/events") {
    url = events;
  } else if (pathname.includes("/specials")) {
    if (special) {
      url = specials;
    } else return;
  } else if (pathname === "/game-day-specials") {
    url = gameDaySpecials;
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
        a.name.replace(/^the\s+/i, '').localeCompare(
          b.name.replace(/^the\s+/i, '')
        )
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
