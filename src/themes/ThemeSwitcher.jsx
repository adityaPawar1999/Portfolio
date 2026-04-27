import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeContext';
import { themeNames } from './themes';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';

const ThemeSwitcherContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 8px;
  padding: 6px;
  box-shadow: ${props => props.theme.shadowSm};
`;

const ThemeButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.isActive ? props.theme.textWhite : props.theme.textMuted};
  background-color: ${props => props.isActive ? props.theme.primary : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isActive ? props.theme.primaryHover : props.theme.bgHover};
    color: ${props => props.isActive ? props.theme.textWhite : props.theme.textMid};
  }
  
  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 11px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const themeIcons = {
  light: LightModeIcon,
  dark: DarkModeIcon,
  neon: BrightnessHighIcon,
};

export const ThemeSwitcher = () => {
  const { currentTheme, switchTheme } = useTheme();

  return (
    <ThemeSwitcherContainer>
      {themeNames.map((themeName) => {
        const IconComponent = themeIcons[themeName] || LightModeIcon;
        return (
          <ThemeButton
            key={themeName}
            isActive={currentTheme === themeName}
            onClick={() => switchTheme(themeName)}
            title={`Switch to ${themeName} theme`}
          >
            <IconComponent style={{ fontSize: '18px' }} />
            <span className="hidden sm:inline capitalize">{themeName}</span>
          </ThemeButton>
        );
      })}
    </ThemeSwitcherContainer>
  );
};

export default ThemeSwitcher;
