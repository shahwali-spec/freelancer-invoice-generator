/**
 * src/lib/utils.ts
 * Small, typed utility helpers used across the application.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SUPPORTED_CURRENCIES } from "./constants";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Check if trial is active
 */
export function isTrialActive(startDate: string | Date, trialDays = 7): boolean {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  const trialPeriodMs = trialDays * 24 * 60 * 60 * 1000;
  return now - start <= trialPeriodMs;
}

/**
 * Format currency with Intl.NumberFormat using supported currency list for defaults
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
  locale = "en-US",
  options?: Intl.NumberFormatOptions
): string {
  const currency =
    SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) ?? SUPPORTED_CURRENCIES[0];

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: currency.decimals ?? 2,
    maximumFractionDigits: currency.decimals ?? 2,
    ...options,
  }).format(amount);
}

/**
 * Robust unique id generator (uses crypto if available)
 */
export function generateUniqueId(prefix = "id"): string {
  try {
    const id =
      typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function"
        ? (crypto as any).randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    return `${prefix}_${id}`;
  } catch {
    return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
  }
}

/**
 * Safe parse number helper
 */
export function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * Simple debounce (returns a function that cancels previous pending call)
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, wait = 200) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Storage helpers (localStorage safe)
 */
export const storage = {
  set: (key: string, value: unknown) => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write errors
    }
  },
  get: <T = unknown>(key: string): T | null => {
    try {
      if (typeof window === "undefined") return null;
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  remove: (key: string) => {
    try {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};

/**
 * Placeholder: currency conversion rates structure (to be populated via API)
 */
export type ConversionRates = Readonly<Record<string, number>>;
export const DEFAULT_CONVERSION_RATES: ConversionRates = {};

/**
 * Export utility types
 */
export type { ClassValue };
