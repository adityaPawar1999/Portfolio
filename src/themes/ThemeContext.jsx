import React, { createContext, useState, useEffect } from 'react';
import { themes, themeNames } from './themes';

// Create Theme Context
export const ThemeContext = createContext();

// Create Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or default to 'light'
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'light';
  });

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('portfolioTheme', currentTheme);
  }, [currentTheme]);

  // Get current theme object
  const theme = themes[currentTheme];

  // Function to change theme
  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  // Function to toggle between themes (cycles through light -> dark -> neon -> light)
  const toggleTheme = () => {
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    switchTheme(themeNames[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, switchTheme, toggleTheme, themeNames }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
