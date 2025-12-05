import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { RiCodeSSlashLine } from "react-icons/ri";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "About-me", path: "/about" },
    { name: "Contacts", path: "/contacts" },
  ];

  // Detect scroll for enhanced blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div
      className={`fixed  top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "bg-primary/10 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="navbar w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto bg-transparent text-white py-4">
        <div className="flex-1">
          <Link
            to="/"
            className="btn bg-transparent border-0 shadow-none text-3xl pl-0 hover:bg-transparent"
          >
            <RiCodeSSlashLine className="text-primary text-3xl" />
            <span className="font-bold">Atik Hasan</span>
          </Link>
        </div>
        <div className="flex-none hidden md:flex items-center gap-8">
          <ul className="menu menu-horizontal px-1 gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`hover:text-primary text-lg transition-colors p-0 hover:bg-transparent ${
                    isActive(link.path) ? "text-primary" : "text-white"
                  }`}
                >
                  <span className="text-primary">#</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm text-lg m-1 hover:bg-transparent text-white hover:text-white font-normal"
            >
              EN <IoChevronDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
            >
              <li>
                <a>EN</a>
              </li>
              <li>
                <a>BN</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Mobile Menu Button (Hamburger) - Optional but good for responsiveness */}
        <div className="flex-none md:hidden">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 text-base-content"
            >
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={isActive(link.path) ? "text-primary" : ""}
                  >
                    <span className="text-primary">#</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
