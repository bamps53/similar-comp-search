// src/components/ToggleSwitch.tsx
import React from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import useToggleSwitch from "../hooks/useToggleSwitch";

interface ToggleSwitchProps {
  onToggle: (isSolution: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const { isSolution, handleToggle } = useToggleSwitch(onToggle);

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="toggle-search" mb="0">
        {isSolution ? "ソリューション検索" : "コンペ検索"}
      </FormLabel>
      <Switch
        id="toggle-search"
        isChecked={isSolution}
        onChange={handleToggle}
        colorScheme="teal"
        aria-label="検索タイプ切り替えスイッチ"
      />
    </FormControl>
  );
};

export default ToggleSwitch;
