import React, { useState } from "react";
import { FaTachometerAlt, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

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

  const toggleSubMenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name);
  };

  return (
    <aside className="w-64 bg-gray-50 min-h-screen p-4">
      <ul>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link ?? "#"}>
            <li key={index} className="mb-2">
              <div
                className="flex items-center cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
                onClick={() => item.subMenu && toggleSubMenu(item.name)}
              >
                <div className="text-gray-600">{item.icon}</div>
                <span className="ml-4 text-gray-700">{item.name}</span>
                {item.subMenu && item.subMenu.length > 0 && (
                  <span className="ml-auto text-gray-500 text-[0.7rem]">
                    {activeMenu === item.name ? "▲" : "▼"}
                  </span>
                )}
              </div>
              {item.subMenu && activeMenu === item.name && (
                <ul className="pl-8 mt-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <Link key={subIndex} to={subItem.link ?? "#"}>
                      <li
                        key={subIndex}
                        className="mb-2 p-2 rounded-lg hover:bg-gray-200 text-gray-600"
                      >
                        {subItem.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}
