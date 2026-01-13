import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const User = useSelector((state) => state.user);


 

  return (
      <>
      {User ? 
      (
      <div className="drawer lg:drawer-open fixed  ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* Overlay for mobile */}
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

      {/* Sidebar */}
      <aside className="menu  h-[calc(100vh-80px)] w-64 bg-[#FFF6EA] px-5 py-6 shadow-md">
        
        {/* User / Brand */}
        {/* <div className="mb-10 text-center">
          <p className="text-xl font-semibold text-[#BF2EF0]">
            {User?.firstName ? User.firstName : "Welcome"}
          </p>
        </div> */}

        {/* Navigation */}
        <li>
          <Link
            to="/Home"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/Profile"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/Search"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            Search
          </Link>
        </li>

        <li>
          <Link
            to="/Messages"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            Messages
          </Link>
        </li>

        <li>
          <Link
            to="/Friends"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            Friends
          </Link>
        </li>

        <li>
          <Link
            to="/CreatePost"
            className="rounded-xl px-4 py-3 text-lg text-[#ED3EF7] hover:bg-[#FEEEC8] transition font-medium"
          >
            Create a Post
          </Link>
        </li>

        <li>
          <Link
            to="/About"
            className="rounded-xl px-4 py-3 text-lg text-gray-700 hover:bg-[#FEEEC8] transition"
          >
            About Us
          </Link>
        </li>

        {/* Logo */}
        <div className="mt-auto pt-10 pb-20 flex justify-center">
          <img
            src="/src/assets/DevCircleLogo.jpg"
            alt="DevCircle Logo"
            className="w-44 opacity-90"
          />
        </div>
      </aside>
    </div>)
     :  <h1>hii</h1>
      }
    </>
  )
      
 
};
