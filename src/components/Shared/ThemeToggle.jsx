

import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";


const ThemeToggle = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Theme"
 
      className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
    >
      {theme === "dark" ? (
        <FaSun className="text-xl" />
      ) : (
        <FaMoon className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
