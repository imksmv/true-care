import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const capitalise = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
