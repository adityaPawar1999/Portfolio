import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: ${props => props.theme.bgPage};
    color: ${props => props.theme.textDark};
    transition: background-color 0.3s ease, color 0.3s ease;
    line-height: 1.6;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.primaryHover};
    }
  }

  button {
    cursor: pointer;
    border: none;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  input, textarea, select {
    font-family: inherit;
    color: ${props => props.theme.textDark};
    background-color: ${props => props.theme.bgCard};
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 3px ${props => props.theme.primaryLight};
    }
  }

  ::placeholder {
    color: ${props => props.theme.textMuted};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.bgCard};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.primaryHover};
    }
  }

  /* Selection */
  ::selection {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.textWhite};
  }

  ::-moz-selection {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.textWhite};
  }
`;
