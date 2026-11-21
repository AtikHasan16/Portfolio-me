import React, { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { RiCodeSSlashLine } from "react-icons/ri";
import { Link, useLocation } from "react-router";
import { useLanguage } from "../Contexts/useLanguage";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t, availableLanguages } = useLanguage();

  const navLinks = [
    { name: t("nav.home") || "Home", path: "/" },
    { name: t("nav.projects") || "Projects", path: "/projects" },
    { name: t("nav.experience") || "Experience", path: "/experience" },
    { name: t("nav.community") || "Community", path: "/community" },
    { name: t("nav.education") || "Education", path: "/education" },
    { name: t("nav.references") || "References", path: "/references" },
    { name: t("nav.contacts") || "Contacts", path: "/contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const currentLangObj =
    availableLanguages.find((l) => l.code === language) ||
    availableLanguages[0];

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled
          ? "bg-base-300/90 shadow-xl border-b border-primary/20 py-4"
          : "bg-transparent py-5"
      }`}
    >
      <div className="navbar w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 mx-auto bg-transparent text-white px-0">
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl md:text-2xl font-extrabold hover:text-primary transition-colors pl-0"
          >
            <RiCodeSSlashLine className="text-primary text-2xl md:text-3xl" />
            <span className="tracking-tight">Atik Hasan</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex-none hidden xl:flex items-center gap-5">
          <ul className="flex items-center gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`hover:text-primary transition-all py-2 px-1 ${
                    isActive(link.path)
                      ? "text-primary border-b-2 border-primary font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="text-primary mr-1">#</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Universal Language Switcher */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-label="Select Language"
              className="btn btn-ghost btn-sm border border-gray-700 hover:border-primary text-sm text-gray-200 hover:text-primary px-3 py-1.5 font-bold"
            >
              <span>{currentLangObj.label}</span>
              <IoChevronDown className="text-xs ml-1" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2.5 shadow-2xl bg-gray-950 border border-gray-700 rounded-md w-44 text-gray-200 mt-2"
            >
              {availableLanguages.map((lang) => (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center justify-between py-2 text-sm ${
                      language === lang.code
                        ? "text-primary font-bold bg-primary/10"
                        : "hover:text-primary"
                    }`}
                  >
                    <span>{lang.full}</span>
                    <span className="text-xs text-gray-400 uppercase">
                      {lang.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile / Tablet Menu */}
        <div className="flex-none xl:hidden flex items-center gap-3">
          {/* Mobile Language Switcher */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Select Language"
              className="btn btn-ghost btn-sm border border-gray-700 text-sm text-primary px-2.5 font-bold"
            >
              {currentLangObj.label}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-50 menu p-2 shadow-2xl bg-gray-950 border border-gray-700 rounded-md w-40 text-gray-200 mt-2"
            >
              {availableLanguages.map((lang) => (
                <li key={lang.code}>
                  <button
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`py-2 text-sm ${language === lang.code ? "text-primary font-bold" : ""}`}
                  >
                    {lang.full}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hamburger Drawer */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open Navigation Menu"
              className="btn btn-ghost btn-circle text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
              className="menu dropdown-content mt-3 z-50 p-4 shadow-2xl bg-gray-950 border border-gray-700 rounded-box w-64 text-base space-y-1"
            >
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`py-2.5 text-base ${isActive(link.path) ? "text-primary font-bold" : "text-gray-300"}`}
                  >
                    <span className="text-primary mr-1">#</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
