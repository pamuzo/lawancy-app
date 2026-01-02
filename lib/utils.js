import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// convert a prima date to string
export function covertToPlainObject(value) {
  return JSON.parse(JSON.stringify(value));
}

// Format number to decimal Places
export function formatToDecimalPlaces(num) {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
