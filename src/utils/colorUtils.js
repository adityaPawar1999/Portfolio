/**
 * Get hover color based on platform and background
 * @param {string} name - Social platform name (GitHub, LinkedIn, Instagram)
 * @param {boolean} lightBg - Is background light or dark
 * @returns {string} - Tailwind hover color class
 */
export const getHoverColor = (name, lightBg = false) => {
  const colorMap = {
    GitHub: {
      light: 'hover:text-gray-500',
      dark: 'hover:text-gray-400',
    },
    LinkedIn: {
      light: 'hover:text-blue-600',
      dark: 'hover:text-blue-400',
    },
    Instagram: {
      light: 'hover:text-pink-500',
      dark: 'hover:text-pink-400',
    },
  };

  const colors = colorMap[name] || {};
  return lightBg ? colors.light : colors.dark;
};
