import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Import ikon dari react-icons

const Navbar = ({ user, onLogout }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 shadow-md p-4">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4 text-white">Welcome, {user?.name}</span>
        <FaUserCircle className="text-2xl text-white mr-2" />
        <button onClick={onLogout} className="flex items-center text-white hover:bg-gray-700 p-2 rounded transition-colors">
          <FaSignOutAlt className="mr-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
