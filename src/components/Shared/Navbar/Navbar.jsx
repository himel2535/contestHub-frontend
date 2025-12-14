import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

import { NavLink, Link } from "react-router"; // NavLink, Link কে 'react-router-dom' থেকে আমদানি করতে হবে।
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo4 from "../../../assets/images/logo4.png";
import useTheme from "../../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ isDashboard }) => { // isDashboard prop is assumed to be passed
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-yellow-500 dark:text-yellow-400"
        : "text-gray-800 dark:text-gray-200 hover:text-yellow-400 dark:hover:text-yellow-400"
    }`;
  
  const mobileItemClass = (isActive) =>
    `px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-neutral-100 dark:hover:bg-gray-700 ${
      isActive
        ? "text-yellow-500 dark:text-yellow-400 bg-neutral-50 dark:bg-gray-700"
        : ""
    }`;

  const mobileLinkClass = ({ isActive }) => mobileItemClass(isActive);


  return (
    <div className="fixed w-full bg-white dark:bg-gray-900 z-50 shadow-md transition-colors duration-300 ">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
            {/* LEFT — Logo */}
            <NavLink to="/">
              <img 
                src={logo4} 
                alt="logo" 
                width="100" 
                height="100" 
                className="filter dark:brightness-100" 
              />
            </NavLink>

            {/* CENTER — Routes (desktop only) */}
            {!isDashboard && (
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
            )}

            {/* RIGHT — Theme Toggle + Avatar + Dropdown */}
            {/* 💡 ml-auto ক্লাসটি এখানে রাখা হলো */}
            <div className={`flex items-center gap-2 md:gap-4 ${isDashboard ? 'ml-auto' : ''}`}>
              
              {/* Theme Toggle (Always present and visible) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Theme"
                // 💡 flex-shrink-0 নিশ্চিত করবে যেন ছোট স্ক্রিনে এটি লুকিয়ে না যায়
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 transition-colors duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 flex-shrink-0"
              >
                {theme === "dark" ? (
                  <FaSun className="text-xl" />
                ) : (
                  <FaMoon className="text-xl" />
                )}
              </button>

              <div className="relative">
                {/* Dropdown Toggle Button (AiOutlineMenu + Avatar) */}
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
                      
                      {/* 💡 পূর্বের মোবাইল থিম টগল এখান থেকে সরানো হয়েছে। 
                          এখন শুধুমাত্র মূল বাটনটি ব্যবহার হবে। */}

                      {/* Mobile routes (hidden on MD+, only visible when NOT in Dashboard mode) */}
                      {!isDashboard && (
                        <div className="md:hidden flex flex-col cursor-pointer border-b dark:border-gray-700">
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
                      )}
                      

                      {user ? (
                        <>
                          <Link
                            to="/dashboard"
                            className={mobileItemClass(false)} 
                          >
                            {user?.displayName}
                          </Link>
                          <Link
                            to="/dashboard"
                            className={mobileItemClass(false)}
                          >
                            Dashboard
                          </Link>
                          <div
                            onClick={logOut}
                            className={mobileItemClass(false) + ' text-red-500 dark:text-red-400'}
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className={mobileItemClass(false)}
                          >
                            Login
                          </Link>
                          <Link
                            to="/signup"
                            className={mobileItemClass(false)}
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