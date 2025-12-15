// Sidebar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/Screen_Shot_2025-12-15_at_3.48.31_PM-removebg-preview.png";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { FaSun, FaMoon } from "react-icons/fa"; // 💡 থিম টগল আইকন

// Menu Components
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import CreatorMenu from "./Menu/CreatorMenu";
import ParticipantMenu from "./Menu/ParticipantMenu";

// Hooks and Shared Components
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import useTheme from "../../../hooks/useTheme";
const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [role, isRoleLoading] = useRole();
  const [mounted, setMounted] = useState(false);

  const { theme, toggleTheme } = useTheme();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (isRoleLoading) return <LoadingSpinner />;

  const handleToggle = () => setIsActive(!isActive);

  const resolvedTheme = theme;

  const baseBg =
    resolvedTheme === "dark"
      ? "bg-gray-900 text-gray-200"
      : "bg-gray-100 text-gray-800";

  return (
    <>
      {/* 🧭 Mobile Top Bar */}
      <div
        className={`flex justify-between items-center md:hidden ${baseBg} shadow-md`}
      >
        <Link to="/" className="p-4">
          <img
            src={logo}
            alt="logo"
            width="120"
            height="100"
            className="filter dark:brightness-100"
          />
        </Link>
        <button onClick={handleToggle} className="p-4 focus:outline-none">
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Main Sidebar */}
      <div
        className={`z-40 md:fixed flex flex-col justify-between ${baseBg} w-64 h-full px-2 py-4 space-y-6
        absolute inset-y-0 left-0 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        {/* Logo */}
        <div className="hidden md:flex justify-center items-center  bg-gray-600 dark:bg-gray-600 rounded-lg shadow">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width="180"
              height="180"
              className="filter dark:brightness-100"
            />
          </Link>
        </div>

        {/* Menu (Role-based navigation) */}
        <nav className="flex-1 mt-6 space-y-1">
          <MenuItem
            icon={BsGraphUp}
            label="Statistics"
            address="/dashboard"
            resolvedTheme={resolvedTheme}
          />
          {role === "participant" && (
            <ParticipantMenu resolvedTheme={resolvedTheme} />
          )}
          {role === "contestCreator" && (
            <CreatorMenu resolvedTheme={resolvedTheme} />
          )}
          {role === "admin" && <AdminMenu resolvedTheme={resolvedTheme} />}
        </nav>

        {/* Bottom Section (Profile, Theme Toggle, and Logout) */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
          {/* 💡 Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Theme"
            className={`flex items-center justify-start w-full px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm cursor-pointer
              ${
                resolvedTheme === "dark"
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
          >
            {theme === "dark" ? (
              <FaSun className="w-5 h-5 mr-3 text-yellow-400" />
            ) : (
              <FaMoon className="w-5 h-5 mr-3 text-gray-600" />
            )}
            <span className="font-medium">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
          {/* ------------------------------------- */}

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
            resolvedTheme={resolvedTheme}
          />
          <button
            onClick={logOut}
            className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200
              ${
                resolvedTheme === "dark"
                  ? "text-gray-200 hover:bg-gray-700 hover:text-white"
                  : "text-gray-800 hover:bg-gray-200 hover:text-gray-900"
              }`}
          >
            <GrLogout className="w-5 h-5" />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
