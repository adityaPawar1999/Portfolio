// Theme definitions with multiple color schemes
export const lightTheme = {
  // Primary Colors
  primary: "#1477d2",
  primaryHover: "#1260b0",
  primaryLight: "#e3f2fd",
  
  // Accent Colors
  accentGreen: "#22c55e",
  accentGreenHover: "#16a34a",
  accentRed: "#ef4444",
  accentPink: "#ec4899",
  accentYellow: "#f59e0b",
  accentPurple: "#8b5cf6",

  // Text Colors
  textDark: "#0f1a2b",
  textMid: "#374151",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  textWhite: "#ffffff",

  // Background Colors
  bgPage: "#ffffff",
  bgCard: "#f9fbfd",
  bgHover: "#f3f4f6",
  bgSecondary: "#f8fafc",

  // Border Colors
  borderCard: "#e8edf3",
  borderLight: "#e5e7eb",
  borderMuted: "#d1d5db",

  // Social Colors
  github: "#333333",
  linkedin: "#0a66c2",
  instagram: "#e4405f",
  
  // Navigation
  navBg: "rgba(255, 255, 255, 0.9)",
  navText: "#1f2937",
  navBgDark: "#000000",
  navTextDark: "#ffffff",

  // Additional utilities
  shadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  shadowSm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  shadowLg: "0 10px 15px rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  // Primary Colors
  primary: "#3b82f6",
  primaryHover: "#2563eb",
  primaryLight: "#1e3a8a",
  
  // Accent Colors
  accentGreen: "#10b981",
  accentGreenHover: "#059669",
  accentRed: "#f87171",
  accentPink: "#f472b6",
  accentYellow: "#fbbf24",
  accentPurple: "#a78bfa",

  // Text Colors
  textDark: "#f3f4f6",
  textMid: "#e5e7eb",
  textMuted: "#9ca3af",
  textLight: "#6b7280",
  textWhite: "#1f2937",

  // Background Colors
  bgPage: "#0f172a",
  bgCard: "#1e293b",
  bgHover: "#334155",
  bgSecondary: "#0f172a",

  // Border Colors
  borderCard: "#334155",
  borderLight: "#475569",
  borderMuted: "#64748b",

  // Social Colors
  github: "#e5e7eb",
  linkedin: "#60a5fa",
  instagram: "#f472b6",
  
  // Navigation
  navBg: "rgba(15, 23, 42, 0.9)",
  navText: "#e5e7eb",
  navBgDark: "#000000",
  navTextDark: "#ffffff",

  // Additional utilities
  shadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
  shadowSm: "0 1px 2px rgba(0, 0, 0, 0.2)",
  shadowLg: "0 10px 15px rgba(0, 0, 0, 0.3)",
};

// Neon theme
export const neonTheme = {
  // Primary Colors
  primary: "#39ff14",
  primaryHover: "#2adb0a",
  primaryLight: "#1a6b0a",
  
  // Accent Colors
  accentGreen: "#39ff14",
  accentGreenHover: "#2adb0a",
  accentRed: "#ff6b35",
  accentPink: "#ff1493",
  accentYellow: "#ff8c00",
  accentPurple: "#8b00ff",

  // Text Colors
  textDark: "#ffffff",
  textMid: "#39ff14",
  textMuted: "#ff8c00",
  textLight: "#ff1493",
  textWhite: "#000000",

  // Background Colors
  bgPage: "#000000",
  bgCard: "#0a0a0a",
  bgHover: "#1a1a1a",
  bgSecondary: "#000000",

  // Border Colors
  borderCard: "#39ff14",
  borderLight: "#ff8c00",
  borderMuted: "#ff1493",

  // Social Colors
  github: "#39ff14",
  linkedin: "#8b00ff",
  instagram: "#ff1493",
  
  // Navigation
  navBg: "rgba(0, 0, 0, 0.95)",
  navText: "#39ff14",
  navBgDark: "#000000",
  navTextDark: "#39ff14",

  // Additional utilities - Enhanced glow effects
  shadow: "0 0 15px rgba(57, 255, 20, 0.4), 0 0 30px rgba(255, 140, 0, 0.2)",
  shadowSm: "0 0 8px rgba(57, 255, 20, 0.3)",
  shadowLg: "0 0 25px rgba(57, 255, 20, 0.5), 0 0 40px rgba(255, 20, 147, 0.3), inset 0 0 10px rgba(57, 255, 20, 0.1)",
  
  // Additional glow shadows for specific use
  glowGreen: "0 0 20px rgba(57, 255, 20, 0.6), 0 0 40px rgba(57, 255, 20, 0.3)",
  glowOrange: "0 0 20px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.3)",
  glowPink: "0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(255, 20, 147, 0.3)",
  glowMulti: "0 0 20px rgba(57, 255, 20, 0.4), 0 0 20px rgba(255, 140, 0, 0.3), 0 0 20px rgba(255, 20, 147, 0.2)",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  neon: neonTheme,
};

export const themeNames = Object.keys(themes);
