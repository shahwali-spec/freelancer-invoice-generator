// src/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

/**
 * useLocalStorage hook
 * Generic hook to store any value in localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue; // SSR safety
        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.error("useLocalStorage getItem error:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("useLocalStorage setItem error:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}