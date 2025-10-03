import { useRef } from "react";

import debounce from "lodash/debounce";

export function useDebouncedCallback<Args extends unknown[]>(callback: (...args: Args) => void, delay: number) {
  const cb = useRef(callback);
  cb.current = callback;

  return useRef(debounce((...args: Args) => cb.current(...args), delay)).current;
}
