// src/components/Shared/SidebarThemeToggle.jsx


import { FaSun, FaMoon } from "react-icons/fa"; 
import useTheme from "../../hooks/useTheme";

const SidebarThemeToggle = () => {
  // ✅ থিমের স্টেট এবং টগল ফাংশন এখানেই হ্যান্ডেল করা হচ্ছে
  // (Sidebar কে থিমের মান জানানোর দরকার নেই)
  const { theme, toggleTheme } = useTheme(); 

  const resolvedTheme = theme;

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Theme"
      // 💡 Sidebar এর স্টাইল এখানে যোগ করা হয়েছে
      className={`flex items-center justify-start w-full px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer
              ${
                resolvedTheme === "dark"
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
    >
      {/* 💡 আইকন এবং লেবেল */}
      {theme === "dark" ? (
        <FaSun className="w-5 h-5 mr-3 text-yellow-400" />
      ) : (
        <FaMoon className="w-5 h-5 mr-3 text-gray-600" />
      )}
      <span className="ml-3 font-medium">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default SidebarThemeToggle;