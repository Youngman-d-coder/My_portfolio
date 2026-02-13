import React from "react";
import { Link, useLocation } from "react-router-dom";

// Define the props for the Navbar component
interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const logo = ["{ . /NC }"];
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
    { path: "/skills", label: "Skills" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-blue-800 text-white shadow-lg z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0 group">
              <h1 className="text-2xl font-bold transition-transform group-hover:scale-110 duration-300">
                {logo}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(path)
                      ? "bg-white text-blue-800 shadow-md"
                      : "hover:bg-white hover:text-blue-800 hover:shadow-md"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Hamburger for mobile */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white hover:bg-blue-700 transition-colors duration-200"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <svg
                  className={`h-6 w-6 transition-transform duration-300 ${
                    isSidebarOpen ? "rotate-90" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isSidebarOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown menu for mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-blue-900 px-4 py-2 space-y-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(path)
                    ? "bg-white text-blue-800 shadow-md"
                    : "hover:bg-blue-800 hover:pl-6"
                }`}
                onClick={toggleSidebar}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 top-16"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Navbar;
