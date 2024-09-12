"use client"; // Menandakan bahwa ini adalah Client Component

import React from "react";
import Image from "next/image"; // Pastikan untuk mengimpor Image jika Anda menggunakan Next.js

const LoginPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to purple-600">
      <div className="relative w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8 space-y-6">
        {/* Logo */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
          <Image
            src="/images/logo.png" // Ganti dengan path logo Anda
            alt="Logo"
            width={80} // Ukuran sesuai dengan w-24 dan h-24
            height={80} // Ukuran sesuai dengan w-24 dan h-24
            className="rounded-full"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
