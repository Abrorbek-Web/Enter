import React, { useState } from "react";
import { FaTachometerAlt, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

type MenuItem = {
  name: string;
  icon: React.ReactNode | null;
  link?: string;
  subMenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: <FaTachometerAlt />, link: "/" },
  {
    name: "Reports",
    icon: <FaClipboardList />,
    subMenu: [
      { name: "Engineering", icon: null, link: "/list/1" },
      { name: "Procurement", icon: null, link: "/list/2" },
      { name: "Bulk", icon: null, link: "/list/3" },
      { name: "Construction", icon: null, link: "/list/4" },
      { name: "Subcontracts", icon: null, link: "/list/5" },
      { name: "Manpower", icon: null, link: "/list/6" },
      { name: "Machinery", icon: null, link: "/list/7" },
      { name: "Budget", icon: null, link: "/list/8" },
    ],
  },
];

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null); // Active state for the main item
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null); // Active state for sub-item
  const navigate = useNavigate();

  const toggleSubMenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  const handleItemClick = (name: string) => {
    setActiveItem(name);
    setActiveSubItem(null);
    navigate("/");
  };

  const handleSubItemClick = (subName: string) => {
    setActiveSubItem(subName);
  };

  return (
    <aside className="w-64 bg-[#f6f6f6] min-h-screen p-4">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2">
            <div
              className={`flex items-center cursor-pointer p-2 rounded-lg ${
                activeItem === item.name
                  ? "bg-gray-300 text-black"
                  : "hover:bg-gray-200 text-gray-700"
              }`}
              onClick={() => {
                handleItemClick(item.name);
                if (item.subMenu) {
                  toggleSubMenu(item.name);
                }
              }}
            >
              <div className="text-gray-600">{item.icon}</div>
              <span className="ml-4">{item.name}</span>
              {item.subMenu && (
                <span className="ml-auto text-gray-500 text-[0.7rem]">
                  {activeMenu === item.name ? "▲" : "▼"}
                </span>
              )}
            </div>
            {item.subMenu && activeMenu === item.name && (
              <ul className="pl-8 mt-2">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`mb-2 p-2 rounded-lg cursor-pointer ${
                      activeSubItem === subItem.name
                        ? "bg-gray-300 text-black"
                        : "hover:bg-gray-200 text-gray-600"
                    }`}
                    onClick={() => handleSubItemClick(subItem.name)}
                  >
                    <Link to={subItem.link ?? "#"}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
