import { NavLink } from "react-router-dom";
import { createElement } from "react";
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  HomeIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const items = [
  { label: "Home", to: "/owner/dashboard", Icon: HomeIcon },
  { label: "Statement", to: "/owner/statement", Icon: DocumentTextIcon },
  { label: "Upload list", to: "/owner/upload", Icon: ArrowUpTrayIcon },
  { label: "Complaint", to: "/owner/piracy", Icon: XCircleIcon },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-end justify-between px-6 py-3">
        {items.map(({ label, to, Icon: icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex w-16 flex-col items-center gap-1 text-[11px] font-medium ${
                isActive ? "text-[#E6AF2E]" : "text-gray-400"
              }`
            }
          >
            {createElement(icon, { className: "h-6 w-6", "aria-hidden": true })}
            <span className="leading-none">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
