import { useState } from "react";

const useLocalStorage = (key: string, initialValue?: string) => {
  const [currentValue, setCurrentValue] = useState<string | undefined>(() => {
    try {
      const value = localStorage.getItem(key);

      if (value) return value;

      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    setCurrentValue(value);
    localStorage.setItem(key, value);
  };

  const removeValue = () => {
    setCurrentValue(undefined);
    localStorage.removeItem(key);
  };

  return { value: currentValue, setValue, removeValue };
};

export default useLocalStorage;
