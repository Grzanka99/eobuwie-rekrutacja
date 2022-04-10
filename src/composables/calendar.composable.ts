import { Day } from "@cgsh/calendarts/build/main/types";
import { IPickedDates } from "~/types";

export const useCalendarHelpers = () => {
  const isReserved = (day: Day, allDates: IPickedDates[]): boolean =>
    !!allDates.filter(
      (reservedDate) =>
        reservedDate.startDate &&
        reservedDate.endDate &&
        day.fullJSONDate >= reservedDate.startDate.fullJSONDate &&
        day.fullJSONDate <= reservedDate.endDate.fullJSONDate
    ).length;

  const validatePicked = (val: IPickedDates): boolean => {
    if (!val.startDate || !val.endDate) return true;
    if (val.startDate.fullJSONDate > val.endDate.fullJSONDate) return false;
    return true;
  };

  return {
    isReserved,
    validatePicked,
  };
};
