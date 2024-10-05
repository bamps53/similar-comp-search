// src/components/ThemeToggle.tsx
import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <label>
      <input
        type="checkbox"
        role="checkbox"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      {isDarkMode ? 'ダークモード' : 'ライトモード'}
    </label>
  );
};

export default ThemeToggle;
