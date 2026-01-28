  import React from "react";
  import { useSelector } from "react-redux";
  import { Link } from "react-router-dom";

  export const SideBar = () => {
    const User = useSelector((state) => state.user);


  

    return (
        <>
        {User ? 
        (
        <div className="drawer lg:drawer-open   ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

        {/* Overlay for mobile */}
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        {/* Sidebar */}
        <aside className="hidden lg:block menu h-[calc(100vh-80px)] w-64 bg-[#FFFFE0] px-5 py-6 shadow-md">
          
          {/* User / Brand */}
          <div className="mb-10 text-center">
            <p className="text-xl font-semibold text-[#BF2EF0]">
              {User?.firstName ? User.firstName : "Welcome"}
            </p>
          </div>

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
              to="/ConnectionRequest"
              className="rounded-xl px-4 py-3 text-lg  text-gray-700 hover:bg-[#FEEEC8] transition "
            >
              Connection Requests
            </Link>
          </li>
          <li>
            <Link
              to="/Posts"
              className="rounded-xl px-4 py-3 text-lg  text-gray-700 hover:bg-[#FEEEC8] transition "
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
          <li className="mt-auto  flex ">
            <img
              src="/src/assets/DevCircleLogo.png"
              alt="DevCircle Logo"
              className="w-38 opacity-90"
            />
          </li>

          {/* Logo */}
          
        </aside>
      </div>)
      :  <h1>hii</h1>
        }
      </>
    )
        
  
  };
