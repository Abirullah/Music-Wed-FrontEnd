import { NavLink } from "react-router-dom";
import { createElement } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  XCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { clearSession } from "../../../../src/utils/session";


const menuItems = [
  { name: "Home", path: "/owner/dashboard", icon: HomeIcon },
  { name: "Statement", path: "/owner/statement", icon: DocumentTextIcon },
  { name: "Upload list", path: "/owner/upload", icon: ArrowUpTrayIcon },
  { name: "Piracy complaints", path: "/owner/piracy", icon: XCircleIcon },
  { name: "Account settings", path: "/owner/settings", icon: UserCircleIcon },
];



export default function Sidebar() {
  const handleLogout = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-[#2b2b2b] to-black px-6 py-8 flex flex-col">
      <nav className="flex flex-col gap-3 flex-1 overflow-y-auto">
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

      <div className="pt-6 mt-6 border-t border-white/10">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15 transition"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
