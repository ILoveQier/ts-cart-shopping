import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    let jsonValue = localStorage.getItem(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    } else {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    return () => {};
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
}
