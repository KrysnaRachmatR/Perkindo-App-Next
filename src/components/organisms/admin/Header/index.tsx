"use client";

import Link from "next/link";
import Image from "next/image";
import DropdownUser from "./DropdownUser";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8" style={{height:"72px"}}>
        {/* Sidebar Toggle & Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="lg:hidden focus:outline-none group"
            aria-label="Toggle Sidebar"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 rounded bg-gray-800 dark:bg-white transform transition-all duration-300 origin-center ${
                  sidebarOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded bg-gray-800 dark:bg-white transition-all duration-300 ${
                  sidebarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded bg-gray-800 dark:bg-white transform transition-all duration-300 origin-center ${
                  sidebarOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div></div>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
