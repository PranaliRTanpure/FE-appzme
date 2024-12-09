import { format } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const BASIC_DATE_FORMAT = "yyyy-MM-dd";
export const BASIC_DATE_TIME_FORMAT = "yyyy-MM-ddTHH:mm:ss";
export const BASIC_TIME_FORMAT = "HH:mm:ss";
export const BASIC_DATE_FORMAT_MM_DD_YYYY = "MM-dd-yyyy";

const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TimeZoneMap: { [key: string]: string } = {
  EST: "EST",
  MST: "MST",
  HST: "HST",
  PST: "America/Los_Angeles",
  CST: "America/Chicago",
  IST: "Asia/Calcutta",
  AST: "America/Anchorage",
};

export const TimeZoneMapLocalToMoment: { [key: string]: string } = {
  EST: "EST",
  MST: "MST",
  HST: "HST",
  "America/Los_Angeles": "PST",
  "America/Chicago": "CST",
  "Asia/Calcutta": "IST",
  "America/Anchorage": "AST",
};

export const formatDateMMddyyyyToUTC = (dateString: string) => {
  // eslint-disable-next-line no-constant-condition
  if (!dateString || "-") {
    return;
  }
  // dateString format : yyyy-MM-dd HH:mm:ss (return by date picker)
  const updatedDateAndTime = fromZonedTime(dateString, "UTC"); ///Return in 2024-11-08T00:00:00.000Z format
  return updatedDateAndTime;
};

export const formatUTCDateTimeInLocalTZ = (dateString: string) => {
  // eslint-disable-next-line no-constant-condition
  if (!dateString || "-") {
    return;
  }

  // dateString format is 2024-11-08T00:00:00.000Z
  const dateAndTimeInLocalTZ = toZonedTime(dateString, localTz);
  const MMDDYYDate = format(dateAndTimeInLocalTZ, BASIC_DATE_FORMAT_MM_DD_YYYY);
  return { dateAndTime: dateAndTimeInLocalTZ, MMDDYY: MMDDYYDate };
};
