import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

import { NavLink, Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo4 from "../../../assets/images/logo4.png";
import useTheme from "../../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-yellow-500 dark:text-yellow-400"
        : "hover:text-yellow-400"
    }`;
  const mobileLinkClass = ({ isActive }) =>
    `px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 ${
      isActive
        ? "text-yellow-500 dark:text-yellow-400 bg-neutral-50 dark:bg-gray-700"
        : ""
    }`;
  return (
    <div className="fixed w-full bg-white dark:bg-gray-900 z-10 shadow-md transition-colors duration-300 ">
      <div className="py-4 ">
        <Container>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
            {/* LEFT — Logo */}
            <NavLink to="/">
              <img src={logo4} alt="logo" width="100" height="100" />
            </NavLink>

            {/* CENTER — Routes (desktop only) */}
            <div className="hidden md:flex gap-6 text-sm font-semibold">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/all-contests" className={linkClass}>
                All Contests
              </NavLink>
              <NavLink to="/leaderboard" className={linkClass}>
                Leaderboard
              </NavLink>
              <NavLink to="/aboutUs" className={linkClass}>
                About Us
              </NavLink>
              <NavLink to="/contactUs" className={linkClass}>
                Contact Us
              </NavLink>
            </div>

            {/* RIGHT — Theme Toggle + Avatar + Dropdown */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Theme"
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 transition-colors duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {theme === "dark" ? (
                  <FaSun className="text-xl" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
              </button>

              <div className="relative">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 dark:border-gray-700 dark:bg-gray-800 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>

                {isOpen && (
                  <div className="absolute rounded-xl shadow-md w-max min-w-[200px] md:w-[12vw] bg-white dark:bg-gray-800 dark:text-gray-200 overflow-hidden right-0 top-12 text-sm z-50">
                    <div className="flex flex-col cursor-pointer">
                      <div className="px-4 py-3 md:hidden flex justify-between items-center border-b dark:border-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-700">
                        <span className="font-medium">Theme:</span>
                        <button
                          onClick={toggleTheme}
                          aria-label="Toggle Dark/Light Theme"
                          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300"
                        >
                          {theme === "dark" ? (
                            <FaSun className="text-lg" />
                          ) : (
                            <FaMoon className="text-lg" />
                          )}
                        </button>
                      </div>

                      {/* Mobile routes */}
                      <div className="md:hidden flex flex-col cursor-pointer">
                        <NavLink to="/" className={mobileLinkClass}>
                          Home
                        </NavLink>
                        <NavLink to="/all-contests" className={mobileLinkClass}>
                          All Contests
                        </NavLink>
                        <NavLink to="/leaderboard" className={mobileLinkClass}>
                          Leaderboard
                        </NavLink>
                        <NavLink to="/aboutUs" className={mobileLinkClass}>
                          About Us
                        </NavLink>
                        <NavLink to="/contactUs" className={mobileLinkClass}>
                          Contact Us
                        </NavLink>
                      </div>

                      {user ? (
                        <>
                          <Link
                            to="/"
                            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700"
                          >
                            {user?.displayName}
                          </Link>
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700"
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700"
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-gray-700"
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
