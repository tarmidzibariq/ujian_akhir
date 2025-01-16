//import Link from react router dom
import { Link, useLocation  } from "react-router-dom";

//import routes
import Routes from "./routes";

import React, { useState } from "react";


export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  return (
    <div>
      <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu closed */}
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Icon for menu open */}
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Dashboard Link */}
                <Link
                  to="/"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === '/' 
                      ? 'bg-gray-900 text-white' // Highlight untuk Dashboard
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>

                {/* Products Link */}
                <Link
                  to="/products"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === '/products'
                      ? 'bg-gray-900 text-white' // Highlight untuk Products
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Products
                </Link>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link to="/"
              href="#"
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === '/'
                      ? 'bg-gray-900 text-white' // Highlight untuk Products
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              aria-current="page"
            >
              Dashboard
            </Link>
            <Link to="/products"
              href="#"
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === '/products'
                      ? 'bg-gray-900 text-white' // Highlight untuk Products
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
            >
              Products
            </Link>
          </div>
        </div>
      )}
      </nav>

      <Routes/>
    </div>
  );
}

