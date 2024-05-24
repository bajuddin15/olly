import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { BiMenu } from "react-icons/bi";
import { LOGO } from "../../assets";
import supabase from "../../Supabase";

const Header = () => {
  const [user, setUser] = React.useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    //clear local storage
    localStorage.clear();
    window.location.href = "/";
  };
  const getUserSession = async () => {
    const user = await supabase.auth.getSession();
    setUser(user?.data?.session?.user?.user_metadata);
    console.log("----", user?.data?.session?.user?.user_metadata);
    console.log(user?.data?.session?.user?.email);
  };

  React.useMemo(() => {
    getUserSession();
  }, []);

  // Function to handle click outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex bg-white flex-row w-full md:py-0 px-3 h-[70px] border-b border-b-gray-300 md:pr-5">
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full h-full">
          <a href="/" className="flex flex-row items-center ">
            <img
              src={LOGO}
              alt="logo"
              className="w-[70px] h-[70px] md:w-[90px] md:h-[90px]"
            />
          </a>

          {/* action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="bg-gray-700 hover:bg-gray-800 text-white text-base py-[7px] px-4 rounded-md">
              Marketing Support
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-700 text-base py-[7px] px-4 rounded-md">
              Upgrade
            </button>

            <button className="mx-3">
              <MdNotifications size={32} />
            </button>

            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaUserCircle size={32} />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-50 space-y-3"
                >
                  <div className="space-y-3 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="border border-gray-300 w-10 h-10 flex items-center justify-center rounded-full">
                        <FaUser size={20} color="gray" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-semibold tracking-wide">
                          {user?.fullName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {user?.email}
                        </span>
                      </div>
                    </div>

                    <p className="text-[15px] tracking-wide text-gray-500">
                      Account Settings
                    </p>
                    <div className="block  text-gray-700 cursor-pointer">
                      Personal Information
                    </div>
                    <div className="block  text-gray-700 cursor-pointer">
                      Login Info & Security
                    </div>
                  </div>

                  {/* signout */}
                  <div
                    onClick={logout}
                    className="border-t border-t-gray-200 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <button className="text-gray-500 font-medium">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* for mobile screen */}
          <button className="flex md:hidden">
            <BiMenu size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
