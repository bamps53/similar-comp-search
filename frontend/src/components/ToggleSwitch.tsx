// src/components/ToggleSwitch.tsx
import React, { useState } from 'react';

interface ToggleSwitchProps {
  onToggle: (isSolution: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle }) => {
  const [isSolution, setIsSolution] = useState(false);

  const handleToggle = () => {
    setIsSolution(!isSolution);
    onToggle(!isSolution);
  };

  return (
    <label>
      <input
        type="checkbox"
        role="checkbox"
        checked={isSolution}
        onChange={handleToggle}
      />
      {isSolution ? 'ソリューション検索' : 'コンペ検索'}
    </label>
  );
};

export default ToggleSwitch;
