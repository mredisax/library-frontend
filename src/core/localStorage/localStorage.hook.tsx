import { useState } from 'react';

export const useLocalStorage = function <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      return (item ? JSON.parse(item) : initialValue) as T;
    } catch (error) {
      console.log(error);

      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));

      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  const refetchValue = () => {
    try {
      const item = localStorage.getItem(key);

      setStoredValue((item ? JSON.parse(item) : initialValue) as T);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, refetchValue];
};
