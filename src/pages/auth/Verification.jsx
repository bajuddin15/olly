import React from "react";
import { useLocation } from "react-router-dom";
import { AUTH_IMG } from "../../assets";

const Verification = () => {
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:flex">
          <img
            className="w-full object-fill"
            src={AUTH_IMG}
            alt="auth-sidebar-img"
          />
        </div>
        <div className="px-5 flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4 w-full md:w-[300px]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
              Hi <span className="ml-1 text-yellow-500">{user?.fullName}</span>,
            </h2>
            <p className="text-xl text-center font-semibold">
              Thanks for Creating Your Account with Me
            </p>
            <p className="text-base text-center">
              Please check your email, you may have received a verification
              email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
