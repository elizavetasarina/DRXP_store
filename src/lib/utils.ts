import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx. Handles conditional classes
 * and resolves Tailwind conflicts automatically.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price from kopecks to a human-readable "X XXX ₽" string.
 * @param kopecks - Price in kopecks (e.g., 550000 = 5 500 ₽)
 */
export function formatPrice(kopecks: number): string {
  const rubles = Math.floor(kopecks / 100);
  return `${rubles.toLocaleString("ru-RU")} \u20BD`;
}

/**
 * Convert a string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
