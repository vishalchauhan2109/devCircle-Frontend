import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const SideBar = () => {


  const User = useSelector((state) => state.user);
  return (
    <>
      <div className=" lg:drawer-open ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        {/* Page content here */}

        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
        </label>
        <ul className="menu bg-base-200 min-h-full w-60">
          {/* Sidebar content here  */}


          <li className="mt-10">
            <Link to="/Home">
              <p className="text-white text-xl" >Home</p>
            </Link>
          </li>


          <li >
            <Link to="/Profile">
              <p className="text-white text-xl" >Profile</p>
            </Link>
          </li>

          <li>
            <Link to="/Search">
              <p className="text-white text-xl" >Search</p>
            </Link>
          </li>
          <li>
            <a className="text-white text-xl">Message</a>
          </li>
          <li>
            <a className="text-white text-xl">Friends</a>
          </li>
          <li>
            <a className="text-white text-xl">Create a Post</a>
          </li>
          <li>
            <Link to="/About">
              <p className="text-white text-xl">About us</p>
            </Link>

          </li>
          <li className="h-20 mt-5">
            <img src="src\assets\DevCircleLogo.jpg" className="w-[200px]" alt="" />

          </li>
        </ul>
      </div>

    </>
  );
};
