
import { sidebarOpen, sidebarClose } from "../../Store/SidebarSlice";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const SideBar = () => {
  const User = useSelector((state) => state.user);
  const location = useLocation();
  const side = useSelector((state)=>state.sidebar)
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  // Auto open on laptop, close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
        dispatch(sidebarOpen("close"))
    
      } else {
        setIsOpen(false);
        dispatch(sidebarClose())
        
        // dispatch(SidebarOpen())
      }
    };

    handleResize();

    console.log(side)
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { name: "Home", path: "/Home" },
    { name: "Profile", path: "/Profile" },
    { name: "Search", path: "/Search" },
    { name: "Messages", path: "/Messages" },
    { name: "Friends", path: "/Friends" },
    { name: "Connection Requests", path: "/ConnectionRequest" },
    { name: "Create a Post", path: "/Posts" },
    { name: "About Us", path: "/About" },
  ];

  if (!User) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#001D3D] text-[#FFC300] px-3 py-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      {isOpen && (
        <aside
          className="fixed lg:static top-0 left-0 z-40
                     h-screen lg:h-[calc(100vh-80px)]
                     w-64 bg-[#001D3D]
                     px-6 py-6 shadow-xl rounded-r-2xl"
        >
          {/* User Name */}
          <div className="mb-8 text-center">
            <p className="text-xl font-bold text-[#FFC300]">
              {User?.firstName
                ? User.firstName.toUpperCase()
                : "WELCOME"}
            </p>
          </div>

          {/* Links */}
          <ul className="flex-1 space-y-3">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() =>
                    window.innerWidth < 1024 && setIsOpen(false)
                  }
                  className={`block px-4 py-3 rounded-xl font-medium transition
                    ${
                      location.pathname === link.path
                        ? "bg-[#FFC300] text-[#001D3D]"
                        : "text-[#FFD60A] hover:bg-[#003566] hover:text-[#FFC300]"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo */}
          {
            

          <div className="pt-6 sm:hidden flex justify-center border-t border-[#003566] mt-auto">
            <img
              src="/src/assets/DevCircleLogo.png"
              alt="DevCircle Logo"
              className="w-32 opacity-95"
            />
          </div>
}
        </aside>
      )}
    </>
  );
};
