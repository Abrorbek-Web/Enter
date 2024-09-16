import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "../components";
import { FaTachometerAlt, FaClipboardList } from "react-icons/fa";

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const dashboardStyle = {
    color: isActive("/admin") ? "black" : "#777",
    backgroundColor: isActive("/admin") ? "#ddd" : "transparent",
  };

  const projectStyle = {
    color: isActive("/admin/project") ? "black" : "#777",
    backgroundColor: isActive("/admin/project") ? "#ddd" : "transparent",
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex">
        <aside className="w-64 bg-[#f6f6f6] p-4 text-white">
          <nav>
            <ul>
              <li className="p-4 hover:bg-gray-300" style={dashboardStyle}>
                <Link to={"/admin"}>
                  <div className="flex items-center gap-2 rounded-lg">
                    {" "}
                    <span>
                      <FaTachometerAlt />
                    </span>{" "}
                    <span>Dashboard</span>
                  </div>
                </Link>
              </li>
              <li className="p-4 hover:bg-gray-300" style={projectStyle}>
                <Link to={"/admin/project"}>
                  <div className="flex items-center gap-2 rounded-lg">
                    {" "}
                    <span>
                      <FaClipboardList />
                    </span>{" "}
                    <span>Projects</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 ">{children}</main>
      </div>
    </>
  );
};

export { LayoutAdmin };
