import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../components";

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const dashboardStyle = {
    color: isActive("/admin") ? "black" : "#333",
    backgroundColor: isActive("/admin") ? "#808081" : "transparent",
  };

  const projectStyle = {
    color: isActive("/admin/project") ? "black" : "#333",
    backgroundColor: isActive("/admin/project") ? "#808081" : "transparent",
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <aside className="w-64 bg-[#d6d6d6] p-4 text-white">
          <div className="p-4 text-[#333]">Admin Panel</div>
          <hr />
          <nav>
            <ul>
              <li
                className="p-4 hover:bg-gray-700 border-b-2"
                style={dashboardStyle}
              >
                <Link to={"/admin"}>Dashboard</Link>
              </li>
              <li
                className="p-4 hover:bg-gray-700 border-b-2"
                style={projectStyle}
              >
                <Link to={"/admin/project"}>Projects</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </>
  );
};

export { LayoutAdmin };
