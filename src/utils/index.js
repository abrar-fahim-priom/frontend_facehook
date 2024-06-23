export const getDateDifferenceFromNow = (fromDate) => {
  let difference = new Date().getTime() - new Date(fromDate).getTime();

  // Convert difference to seconds
  difference = difference / 1000;
  let yearDifference = Math.floor(difference / (3600 * 24 * 365));
  difference -= yearDifference * 3600 * 24 * 365;
  let monthDifference = Math.floor(difference / (3600 * 24 * 30));
  difference -= monthDifference * 3600 * 24 * 30;
  let dayDifference = Math.floor(difference / (3600 * 24));
  difference -= dayDifference * 3600 * 24;
  let hourDifference = Math.floor(difference / 3600);
  difference -= hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  difference -= minuteDifference * 60;
  let secondDifference = Math.round(difference);

  let message;

  if (yearDifference > 0) {
    message = `${yearDifference} year${yearDifference > 1 ? "s" : ""}`;
    return message;
  }

  if (monthDifference > 0) {
    message = `${monthDifference} month${monthDifference > 1 ? "s" : ""}`;
    return message;
  }

  if (dayDifference > 0) {
    message = `${dayDifference} day${dayDifference > 1 ? "s" : ""}`;
    return message;
  }

  if (hourDifference > 0) {
    message = `${hourDifference} hour${hourDifference > 1 ? "s" : ""}`;
    if (minuteDifference > 0) {
      message += ` ${minuteDifference} minute${
        minuteDifference > 1 ? "s" : ""
      }`;
    }
    return message;
  }

  if (minuteDifference > 0) {
    message = `${minuteDifference} minute${minuteDifference > 1 ? "s" : ""}`;
    return message;
  }

  if (secondDifference > 0) {
    message = `${secondDifference} second${secondDifference > 1 ? "s" : ""}`;
    return message;
  }

  return "just now";
};
