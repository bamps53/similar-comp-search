// src/hooks/useToggleSwitch.ts
import { useState } from "react";

const useToggleSwitch = (onToggle: (isSolution: boolean) => void) => {
  const [isSolution, setIsSolution] = useState(false);

  const handleToggle = () => {
    setIsSolution((prev) => {
      const newValue = !prev;
      onToggle(newValue);
      return newValue;
    });
  };

  return { isSolution, handleToggle };
};

export default useToggleSwitch;
