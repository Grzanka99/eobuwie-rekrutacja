import { IPickedDates } from "./structures.types";

export interface IDatePickerProps {
  basePrice: number;
  stars: number;
  votes: number;
  reservedDates: IPickedDates[];
}

export interface ICalendarProps {
  picked: IPickedDates[];
  reservedDates: IPickedDates[];
}
