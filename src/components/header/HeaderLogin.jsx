import React from "react";
import { LOGO } from "../../assets";

const HeaderLogin = () => {
  return (
    <div className="flex bg-white flex-row w-full md:py-0 px-3 h-[70px] border-b border-b-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row w-full h-full">
          <a href="/" className="flex flex-row items-center -mt-1 md:mt-1">
            <img src={LOGO} alt="logo" className="w-[90px] h-[90px]" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogin;
