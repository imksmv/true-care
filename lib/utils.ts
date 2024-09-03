import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const capitalise = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

// TimePicker utils
export const isValidHour = (value: string) =>
  /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);

export const isValid12Hour = (value: string) => /^(0[1-9]|1[0-2])$/.test(value);

export const isValidMinuteOrSecond = (value: string) =>
  /^[0-5][0-9]$/.test(value);

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

export const getValidNumber = (
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig,
) => {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
};

export const getValidHour = (value: string) =>
  isValidHour(value) ? value : getValidNumber(value, { max: 23 });

export const getValid12Hour = (value: string) =>
  isValid12Hour(value) ? value : getValidNumber(value, { min: 1, max: 12 });

export const getValidMinuteOrSecond = (value: string) =>
  isValidMinuteOrSecond(value) ? value : getValidNumber(value, { max: 59 });

type GetValidArrowNumberConfig = {
  min: number;
  max: number;
  step: number;
};

export const getValidArrowNumber = (
  value: string,
  { min, max, step }: GetValidArrowNumberConfig,
) => {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
};

export const getValidArrowHour = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 0, max: 23, step });

export const getValidArrow12Hour = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 1, max: 12, step });

export const getValidArrowMinuteOrSecond = (value: string, step: number) =>
  getValidArrowNumber(value, { min: 0, max: 59, step });

export const setMinutes = (date: Date, value: string) => {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
};

export const setSeconds = (date: Date, value: string) => {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
};

export const setHours = (date: Date, value: string) => {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
};

export const set12Hours = (date: Date, value: string, period: Period) => {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
};

export type TimePickerType = "minutes" | "seconds" | "hours" | "12hours";
export type Period = "AM" | "PM";

export const setDateByType = (
  date: Date,
  value: string,
  type: TimePickerType,
  period?: Period,
) => {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours":
      return period ? set12Hours(date, value, period) : date;
    default:
      return date;
  }
};

export const getDateByType = (date: Date, type: TimePickerType) => {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours":
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    default:
      return "00";
  }
};

export const getArrowByType = (
  value: string,
  step: number,
  type: TimePickerType,
) => {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
};

export const convert12HourTo24Hour = (hour: number, period: Period) => {
  if (period === "PM") {
    return hour <= 11 ? hour + 12 : hour;
  } else if (period === "AM") {
    return hour === 12 ? 0 : hour;
  }
  return hour;
};

export const display12HourValue = (hours: number) => {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  return hours % 12 > 9 ? `${hours}` : `0${hours % 12}`;
};
