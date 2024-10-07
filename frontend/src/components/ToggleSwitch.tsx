// src/components/ToggleSwitch.tsx
import React from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";

interface ToggleSwitchProps {
  onToggle: (isSolution: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const [isSolution, setIsSolution] = React.useState(false);

  const handleToggle = () => {
    setIsSolution(!isSolution);
    onToggle(!isSolution);
  };

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
      />
    </FormControl>
  );
};

export default ToggleSwitch;
