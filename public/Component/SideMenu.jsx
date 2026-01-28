import { useState } from "react";
import Img from "../../assets/Images/884531c964349945a6416899b65cf3c56f245ba6.jpg";
import Button from "./Button";
import { Link } from "react-router-dom";

export function SideMenu({ openProfileMenu, setCurrentPart }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  function CurrentPage(value) {
    localStorage.setItem("CurrentPage", value); 
  }


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
        className={`fixed inset-0 bg-black  justify-end transition-opacity duration-300 z-40 ${
          isDrawerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <div
        className={`fixed flex flex-col top-0 right-0 h-full w-[40%] bg-white  shadow-lg transform transition-transform duration-300 z-50
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 p-4">
          <img src={Img} alt="Logo" className="h-15 w-15 rounded-4xl" />
          <span className="text-xl font-semibold"> Your Profile</span>
          <button
            className=" p-2 hover:bg-gray-300 hover:text-white rounded-md"
            onClick={toggleDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
        <div className="p-10 flex flex-col pr-10">
          <p className="text-2xl font-bold">Hello</p>
          <p className="text-2xl font-bold">Micheal Jordean</p>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto flex-1 px-2 ">
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
              className="mb-2 px-10"
              onClick={() => {
                CurrentPage(section.id);
              }}
            >
              <Link
                to={section.path}
                onClick={() => handleMenuClick(section.id)}
                className="w-full flex text-xl items-center justify-between p-3 rounded-md hover:bg-gray-200 hover:scale-101 hover:shadow-md shadow-black/30 border-b-black/30 border-b no-underline text-black"
              >
                <span>{section.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform rotate-270`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute bottom-30 right-[30%]">
          <Button
            text="Log Out"
            bg="bg-white px-30 py-3 mt-10 "
            textColor="text-black"
            textSize="text-lg font-bold border-2"
          />
        </div>
      </div>
    </>
  );
}
