import React from "react";
import SearchBar from "./SearchBar";
import { Instagram, x, Email } from "../../assets/Icons/IconExporter";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      {/* TOP SECTION */}
      <div
        className="
          w-full
          flex flex-col md:flex-row
          justify-between items-center
          px-6 sm:px-8 lg:px-[10%]
          pt-8 pb-10
          border-b border-gray-700
          gap-8
        "
      >
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            ECHOTUNE
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Your Sound Your World
          </p>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-sm sm:text-base">
          {["Register", "Request", "Login", "About", "Contact", "Others"].map(
            (link, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          {[Instagram, x, Email].map((icon, i) => (
            <a
              key={i}
              href="#"
              className="hover:scale-110 transition-transform"
            >
              <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        className="
          w-full
          px-6 sm:px-8 lg:px-[10%]
          py-8
          flex flex-col gap-10
        "
      >
        {/* Search */}
        <div className="flex justify-center">
          <SearchBar
            classess="w-full sm:w-[70%] md:w-[50%] lg:w-[35%] rounded-full bg-white h-11 sm:h-12 px-4 placeholder-gray-300"
            placeholder="Check License Number"
            ButtonInfo="w-10 h-10 sm:w-12 sm:h-11 rounded-full"
          />
        </div>

        {/* Bottom Links + Copyright */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs sm:text-sm">
            {[
              "Purchase Flow",
              "Terms & Condition",
              "Privacy Policy",
              "Refund and cancellation",
            ].map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="text-xs sm:text-sm text-gray-400 max-w-md">
            Copyright © 2024. All Rights Reserved. Design And Developed by
            webnox.in.
          </div>
        </div>
      </div>
    </footer>
  );
}
