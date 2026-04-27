# Theme System Documentation

## Overview

Your portfolio now uses a **centralized color theme system** built with **styled-components** and **React Context**. This allows you to easily switch between multiple color themes and maintain consistent styling across the entire application.

## Theme Files Structure

```
src/themes/
├── index.js                 # Main export file
├── themes.js               # Theme definitions (light, dark, neon)
├── ThemeContext.jsx        # React Context for theme state management
├── ThemeSwitcher.jsx       # UI component for theme switching
├── GlobalStyles.js         # Global CSS styles that respond to theme
└── README.md              # This file
```

## Available Themes

### 1. **Light Theme** (Default)
- Clean, professional light background
- Dark text for readability
- Primary blue accent color (#1477d2)
- Best for daytime viewing

### 2. **Dark Theme**
- Dark background (#0f172a)
- Light text for reduced eye strain
- Brighter accent colors optimized for dark mode
- Best for evening viewing

### 3. **Neon Theme**
- Dark background with neon cyan accents
- High contrast colors
- Modern, vibrant aesthetic
- Perfect for a tech-forward look

## How to Use the Theme System

### 1. Access Theme in Components

Use the `useTheme` hook to access theme colors:

```jsx
import { useTheme } from '../../themes/ThemeContext';
import styled from 'styled-components';

// Access theme in styled-components
const MyButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textWhite};
  border: 1px solid ${props => props.theme.borderCard};
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

// Access theme in functional component
export function MyComponent() {
  const { theme, currentTheme, switchTheme } = useTheme();
  
  return (
    <MyButton onClick={() => switchTheme('dark')}>
      Switch to Dark Theme
    </MyButton>
  );
}
```

### 2. Available Theme Properties

Every theme object includes:

**Primary Colors:**
- `primary` - Main brand color
- `primaryHover` - Hover state for primary
- `primaryLight` - Light variant

**Accent Colors:**
- `accentGreen` - Success/positive color
- `accentRed` - Error/negative color
- `accentPink` - Pink accent
- `accentYellow` - Warning color
- `accentPurple` - Purple accent

**Text Colors:**
- `textDark` - Primary text color
- `textMid` - Secondary text
- `textMuted` - Muted/disabled text
- `textLight` - Light text
- `textWhite` - White text

**Background Colors:**
- `bgPage` - Main page background
- `bgCard` - Card/container background
- `bgHover` - Hover state background
- `bgSecondary` - Secondary background

**Border Colors:**
- `borderCard` - Card/container borders
- `borderLight` - Light borders
- `borderMuted` - Muted borders

**Social Colors:**
- `github` - GitHub brand color
- `linkedin` - LinkedIn brand color
- `instagram` - Instagram brand color

**Shadows:**
- `shadow` - Regular shadow
- `shadowSm` - Small shadow
- `shadowLg` - Large shadow

### 3. Create Styled Components

Always use styled-components with the theme:

```jsx
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${props => props.theme.bgCard};
  border: 1px solid ${props => props.theme.borderCard};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${props => props.theme.shadowSm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadowLg};
  }
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.textDark};
  margin-bottom: 8px;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const CardText = styled.p`
  color: ${props => props.theme.textMuted};
  font-size: 14px;
  line-height: 1.6;
  transition: color 0.3s ease;
`;
```

### 4. Theme Switcher Component

The **ThemeSwitcher** component is automatically included in the Navbar and provides buttons to switch between themes. Users can also access it directly:

```jsx
import { ThemeSwitcher } from '../themes/ThemeSwitcher';

export function Header() {
  return (
    <header>
      <h1>My Portfolio</h1>
      <ThemeSwitcher />
    </header>
  );
}
```

## Customizing Themes

### Modify Existing Theme

Edit `src/themes/themes.js`:

```jsx
export const lightTheme = {
  primary: "#1477d2",           // Change primary color
  accentGreen: "#22c55e",       // Change accent colors
  bgPage: "#ffffff",            // Change backgrounds
  textDark: "#0f1a2b",         // Change text colors
  // ... other properties
};
```

### Add a New Theme

1. Create a new theme object in `src/themes/themes.js`:

```jsx
export const customTheme = {
  primary: "#ff6b6b",
  primaryHover: "#ff5252",
  primaryLight: "#ffe0e0",
  
  // ... copy other properties from existing theme
  
  accentGreen: "#51cf66",
  accentRed: "#ff6b6b",
  // ... etc
};
```

2. Add it to the themes export:

```jsx
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  neon: neonTheme,
  custom: customTheme,  // New theme
};
```

3. The ThemeSwitcher will automatically show the new theme option!

### Customize Theme Colors

Each color can be changed without affecting other components. For example, to make all primary buttons blue:

```jsx
// In src/themes/themes.js
export const lightTheme = {
  primary: "#3b82f6",  // Changed from #1477d2
  // All components using ${props => props.theme.primary} will update automatically!
};
```

## Persistent Theme Storage

The selected theme is saved to browser's localStorage as `portfolioTheme`. When users return to your site, their theme preference is remembered.

## Migrating Existing Components

### Before (Hardcoded Colors):
```jsx
<button style={{ backgroundColor: '#1477d2', color: '#ffffff' }}>
  Click Me
</button>
```

### After (Using Theme):
```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.textWhite};
`;

export function MyComponent() {
  return <StyledButton>Click Me</StyledButton>;
}
```

## Global Styles

The **GlobalStyles** component (imported in App.jsx) applies theme-aware global CSS:

```jsx
- Body background and text color
- Link colors and hover states
- Input and textarea styling
- Scrollbar colors
- Selection colors
- Focus states (outline, ring)
```

All global styles automatically update when the theme changes!

## Best Practices

1. **Always use theme colors** - Never hardcode colors in styled-components
2. **Use transitions** - Add `transition: color 0.3s ease` to allow smooth theme changes
3. **Consistent spacing** - Use theme shadows for consistency
4. **Test all themes** - Test your components with all three themes
5. **Follow naming conventions** - Use existing theme property names
6. **Group related colors** - Keep related colors together in the theme object

## Troubleshooting

**Theme not updating?**
- Make sure component is wrapped in `ThemeProvider` (in App.jsx)
- Verify `useTheme()` is called inside a component, not at module level
- Check that styled-components is imported

**Colors not changing on theme switch?**
- Ensure component uses `${props => props.theme.colorName}` syntax
- Add `transition: color 0.3s ease` to smooth color changes
- Check browser console for errors

**New component doesn't have theme?**
- Wrap component in `StyledThemeProvider` in App.jsx ✓ (already done)
- Use `useTheme()` hook or styled-components template literals

## File Locations to Update

When migrating components to the theme system, look for:

- ❌ Hardcoded color values: `#1477d2`, `#ffffff`, `rgb(0,0,0)`
- ❌ Tailwind color classes: `bg-blue-500`, `text-gray-800`
- ❌ Inline style objects: `style={{ color: '#...' }}`
- ✅ Replace with: `${props => props.theme.colorName}`

## Need Help?

Refer to the updated components:
- [Navbar.jsx](../components/Navbar/Navbar.jsx) - Full theme integration
- [About.jsx](../pages/About/About.jsx) - Styled-components with theme
- [App.jsx](../../App.jsx) - Theme setup

---

**Happy theming! 🎨**
