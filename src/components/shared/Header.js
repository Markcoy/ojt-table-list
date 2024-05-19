import React from "react";
import NarutoRun from "../assets/naruto.gif";
const Header = () => {
  return (
    <div className="bg-stone-800 h-16 px-4 flex justify-between items-center border-b border-gray-900">
      <marquee>
        <div className="flex items-center">
          <img
            src={NarutoRun}
            style={{ width: "50px", height: "auto" }}
            alt="Naruto Run"
          />

          <p className="text-yellow-500 hover:scale-105 transition-all ease-in-out duration-300">
            Table Task by Mark Christian Velasco
          </p>
          <img
            src={NarutoRun}
            style={{ width: "50px", height: "auto" }}
            alt="Naruto Run"
          />
        </div>
      </marquee>

      <div className="relative"></div>
      <div className="flex items-center gap-2 mr-2"></div>
    </div>
  );
};

export default Header;
