"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../organisms/users/Sidebar";
import Header from "../organisms/users/Header";

export default function DefaultLayoutUsers({
  children,
  hasKTA,
}: {
  children: React.ReactNode;
  hasKTA: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(hasKTA);

  return (
    <>
      <div className="flex">
        {hasKTA && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div
          className={`relative flex flex-1 flex-col ${
            hasKTA ? "lg:ml-72" : ""
          }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
