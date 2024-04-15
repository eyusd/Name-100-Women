import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function not(check: boolean) {
  return !check
}

export function displayTime(time: number) {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;

  return `${hours.toString().padStart(2, "0")}:${displayMinutes.toString().padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
}