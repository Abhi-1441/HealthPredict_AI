import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ToggleTheme from "./ToggleTheme";
import HP_AI_Logo from "/HP_AI_favicon.png";
import { useNavigate } from "react-router-dom";
import { LogOutButton } from "./LogOutButton";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleHomeRouting = () => {
    navigate("/");
  };
  const handleDashboardRouting = () => {
    navigate("/dashboard");
  };

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border-b border-gray-200 border-opacity-20 shadow-lg">
      <div
        onClick={handleHomeRouting}
        className="flex items-center cursor-pointer"
      >
        <img
          src={HP_AI_Logo}
          alt="HealthPredict AI Logo"
          className="h-10 w-10 mr-2"
        />
        <h1 className="text-4xl font-bold text-purple-400">HealthPredict AI</h1>
      </div>

      <div className="flex items-center cursor-pointer">
        {userInfo ? (
          <div onClick={handleDashboardRouting} className="flex mx-2 items-center">
            <div className="relative w-6 h-6 mx-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-8 h-8 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="text-white dark:text-black mr-2">
              {userInfo.username}
            </div>
            <LogOutButton />
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignIn}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Sign In
            </button>
            <button
              onClick={handleSignUp}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mx-2"
            >
              Sign Up
            </button>
          </div>
        )}

        <ToggleTheme />
      </div>
    </header>
  );
};

export default Navbar;
