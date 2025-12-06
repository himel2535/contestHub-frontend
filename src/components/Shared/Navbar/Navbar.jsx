import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo4 from "../../../assets/images/logo4.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">

            {/* LEFT — Logo */}
            <Link to="/">
              <img src={logo4} alt="logo" width="100" height="100" />
            </Link>

            {/* CENTER — Routes (desktop only) */}
            <div className="hidden md:flex gap-6 text-sm font-semibold">
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              <Link to="/all-contests" className="hover:text-blue-600 transition">All Contests</Link>
              <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
              <Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
            </div>

            {/* RIGHT — Avatar + Dropdown */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
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

              {/* DROPDOWN MENU */}
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[60vw] md:w-[12vw] bg-white overflow-hidden right-0 top-12 text-sm">

                  <div className="flex flex-col cursor-pointer">

                    {/* Mobile routes */}
                    <div className="md:hidden flex flex-col cursor-pointer">
                      <Link to="/" className="px-4 py-3 hover:bg-neutral-100">Home</Link>
                      <Link to="/all-contests" className="px-4 py-3 hover:bg-neutral-100">All Contests</Link>
                      <Link to="/about" className="px-4 py-3 hover:bg-neutral-100">About Us</Link>
                      <Link to="/contact" className="px-4 py-3 hover:bg-neutral-100">Contact Us</Link>
                    </div>

                    {user ? (
                      <>
                        <Link to="/" className="px-4 py-3 hover:bg-neutral-100">
                          {user?.displayName}
                        </Link>
                        <Link to="/dashboard" className="px-4 py-3 hover:bg-neutral-100">
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="px-4 py-3 hover:bg-neutral-100">Login</Link>
                        <Link to="/signup" className="px-4 py-3 hover:bg-neutral-100">Sign Up</Link>
                      </>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
