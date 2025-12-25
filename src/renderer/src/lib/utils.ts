import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function pickUnique<T>(arr: T[], count: number): T[] {
  if (count > arr.length) {
    throw new Error("count cannot be larger than array length");
  }

  const result = arr.slice();
  const len = result.length;

  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (len - i));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, count);
}
