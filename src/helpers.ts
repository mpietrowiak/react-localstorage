import { eventKey } from "./consts";

export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
  const event = new CustomEvent(eventKey);
  window.dispatchEvent(event);
}