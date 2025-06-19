export const parseTimeString = (timeStr) => {
  const [_, hourStr, minuteStr, period] = timeStr.match(/(\d+):(\d+)(AM|PM)/i);
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
};
