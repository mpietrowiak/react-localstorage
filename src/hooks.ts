import { useState, useEffect } from "react";
import { eventKey } from "./consts";

export const useLocalStorageWatch = (watchKey: string, pollingRate = 500) => {
  const [watcher, setWatcher] = useState<string | null>(
    (watchKey && typeof window !== 'undefined') ? window.localStorage.getItem(watchKey) : null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWatcher(window.localStorage.getItem(watchKey));
      const callback = () => {
        const value = window.localStorage.getItem(watchKey);
        setWatcher(value);
      };
      window.addEventListener(eventKey, callback);

      let pollingInterval: number;
      if (pollingRate > 0) {
        pollingInterval = setInterval(callback, pollingRate) as unknown as number;
      }
      return () => {
        window.removeEventListener(eventKey, callback);
        if (pollingInterval && pollingRate > 0) {
          clearInterval(pollingInterval);
        }
      }
    }
  }, []);

  return watcher;
}