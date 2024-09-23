import React from "react";

const Navbar = ({ user }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, {user?.name}</span>
      </div>
    </div>
  );
};

export default Navbar;
