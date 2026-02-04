import { NavLink } from "react-router-dom";
import { createElement } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";


const menuItems = [
  { name: "Home", path: "/owner/dashboard", icon: HomeIcon },
  { name: "Statement", path: "/owner/statement", icon: DocumentTextIcon },
  { name: "Upload list", path: "/owner/upload", icon: ArrowUpTrayIcon },
  { name: "Piracy complaints", path: "/owner/piracy", icon: XCircleIcon },
];



export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#2b2b2b] to-black px-6 py-8">
      <nav className="flex flex-col gap-3">
        {menuItems.map(({ name, path, icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-medium
              transition-all duration-300 ease-out
              ${
                isActive
                  ? "bg-gradient-to-r from-[#FFD43B] to-[#E6AF2E] text-black shadow-lg"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            {createElement(icon, {
              className:
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
              "aria-hidden": true,
            })}
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
