import React from "react";
import SearchBar from "./SearchBar";
import { Instagram, x, Email } from "../../assets/Icons/IconExporter";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white h-auto ">
      <div className="w-full flex flex-col md:flex-row justify-between items-center h-[30%] px-8 pt-6 pb-10 border-b border-gray-700 gap-6 lg:px-[10%] ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold">ECHOTUNE</h1>
          <p className="">Your Sound Your World</p>
        </div>

        <ul className="flex flex-wrap justify-center gap-12 text-sm md:text-base">
          {["Register", "Request", "Login", "About", "Contact", "Others"].map(
            (link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {link}
                </a>
              </li>
            ),
          )}
        </ul>

        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <img src={Instagram} alt="" />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <img src={x} alt="" />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <img src={Email} alt="" />
          </a>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="w-full  md:flex-row items-center h-[60%] px-8 py-6 gap-16 justify-center ">
        <div className="flex justify-center items-center my-10">
          <SearchBar
            classess="w-[25%] rounded-full bg-white h-12  placeholder-gray-300 px-4 h-12"
            placeholder="Check Lisence Number"
            ButtonInfo ="w-12 h-11 rounded-full "
          />
        </div>

        <div className="flex justify-between lg:px-[10%] pt-5">
          <ul className="flex gap-12 text-xs md:text-sm ">
            {[
              "Purchase Flow",
              "Terms & Condition",
              "Privacy Policy",
              "Refund and cancellaction",
            ].map((item, i) => (
              <li key={i}>
                <a href="#" className="hover:text-yellow-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="text-xs md:text-sm text-gray-400">
            Copyright © 2024. All Rights Reserved. Design And Developed by
            webnox.in.
          </div>
        </div>
      </div>
    </footer>
  );
}
