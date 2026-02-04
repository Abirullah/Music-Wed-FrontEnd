import { useState } from "react";
import Img from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import Button from "./Button";
import { Link } from "react-router-dom";

export function SideMenu({ openProfileMenu, setCurrentPart }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  function CurrentPage(value) {
    localStorage.setItem("CurrentPage", value);
  }

  function Logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser"));
    } catch {
      return null;
    }
  })();

  const profileName = currentUser?.fullName || "Micheal Jordean";

  const handleMenuClick = (id) => {
    if (setCurrentPart) {
      setCurrentPart(id);
    }
    setIsDrawerOpen(false);
    setTimeout(() => openProfileMenu(false), 300);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isDrawerOpen) {
      setTimeout(() => openProfileMenu(false), 300);
    }
  };

  const handleOverlayClick = () => {
    setIsDrawerOpen(false);
    setTimeout(() => openProfileMenu(false), 300);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-[200] ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Profile menu"
        className={`fixed inset-x-0 bottom-0 flex flex-col w-full h-[50vh]
          md:inset-y-0 md:left-auto md:right-0 md:w-[30%] md:h-full
          bg-white/95 backdrop-blur-xl shadow-2xl rounded-t-3xl md:rounded-none border border-black/10 overflow-hidden
          pb-4 md:pb-6
          transform transition-transform duration-300 z-[210] ${
            isDrawerOpen
              ? "translate-y-0 md:translate-x-0 md:translate-y-0"
              : "translate-y-full md:translate-x-full md:translate-y-0"
          }`}
      >
        {/* Header (sm and down) */}
        <div className="md:hidden relative flex items-center justify-center px-5 py-4 bg-white">
          <span className="text-base font-semibold text-gray-900">
            User Profile
          </span>
          <button
            type="button"
            aria-label="Close menu"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-black/5 transition-colors"
            onClick={toggleDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Header (md+) */}
        <div className="hidden md:flex items-center justify-between gap-4 px-5 py-4 ">
          
           <p className="text-lg truncate text-center font-bold self-center mx-auto">User Profile</p>
          
          <button
            type="button"
            aria-label="Close menu"
            className="p-2 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={toggleDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-6 pt-5 pb-4">
          <p className="font-bold text-2xl text-black">Hello</p>
          <p className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
            {profileName}
          </p>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto flex-1 px-4">
          {[
            {
              id: 0,
              title: "Purchase",
              path: "/Profile",
            },
            {
              id: 1,
              title: "Favourite",
              path: "/Profile",
            },
            {
              id: 2,
              title: "User Info",
              path: "/Profile",
            },
          ].map((section) => (
            <div
              key={section.id}
              className="mb-2"
              onClick={() => {
                CurrentPage(section.id);
              }}
            >
              <Link
                to={section.path}
                onClick={() => handleMenuClick(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-black/5 bg-white hover:bg-black/5 transition-colors no-underline text-black group"
              >
                <span className="text-base md:text-lg font-semibold">
                  {section.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-gray-900 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <div className="p-4  bg-white/80 md:mb-15 cursor-pointer"
        onClick={()=> Logout()}
        >

          <Button
            text="Log Out"
            bg="w-[80%] max-w-3xl py-3 border rounded-full mx-auto"
            textColor="text-black"
            textSize="text-base font-semibold"
            rounded="rounded-2xl"
          />
        </div>
      </aside>
    </>
  );
}
