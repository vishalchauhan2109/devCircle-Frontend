import axiosInstance from "../api/axiosInstance";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../Store/UserSlice";

// ── FIX: User (lucide icon) ko UserIcon rename kiya — Redux ka User state se conflict tha ──
import { Menu, MessageCircle, User as UserIcon, Settings, LogOut, LogIn, Sun, Moon, Bell } from "lucide-react";

const Navbar = ({ isDark, setIsDark }) => {
  const User = useSelector((state) => state.UserStore.user); // Redux user — ab conflict nahi
  // const sidebar = useSelector((state) => state.sidebar);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // Theme colors
  const accentColor = "#FF0087";
  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const navBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";

  const handleShow = () => setShow(!show);

  const sidebar = useSelector((state)=>{state.SidebarStore.sidebar})
  console.log(sidebar)

  const handleLogout = async () => {
    try {
      await axiosInstance.post(`/logout`);
      dispatch(LoggedInUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500"
      style={{
        backgroundColor: `${navBg}dd`,
        borderColor: border,
        boxShadow: isDark
          ? `0 4px 24px ${accentColor}20`
          : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className="h-20 sm:h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <button
          onClick={()=>{}}
            className="lg:hidden p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
              color: textMain,
            }}
          >
            <Menu className="w-6 h-6" />
          </button >
          <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 4px 16px ${accentColor}40`,
              }}
            >
              D
            </div>
            <span
              className="hidden sm:block text-xl font-bold"
              style={{ color: textMain }}
            >
              DevCircle
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
            style={{
              backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
              color: textMain,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${accentColor}20` }}
            ></div>
            {isDark ? (
              <Sun className="w-5 h-5 relative z-10" />
            ) : (
              <Moon className="w-5 h-5 relative z-10" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
            style={{
              backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
              color: textMain,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${accentColor}20` }}
            ></div>
            <Bell className="w-5 h-5 relative z-10" />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 animate-pulse"
              style={{
                backgroundColor: accentColor,
                borderColor: navBg,
              }}
            >
              3
            </span>
          </button>

          {/* Message Icon */}
          <button
            onClick={() => navigate("/chat")}
            className="relative p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
            style={{
              backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
              color: textMain,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${accentColor}20` }}
            ></div>
            <MessageCircle className="w-5 h-5 relative z-10" />
            <span
              className="absolute -top-1 -right-1 w-5 h-5 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 animate-pulse"
              style={{
                backgroundColor: accentColor,
                borderColor: navBg,
              }}
            >
              5
            </span>
          </button>

          {/* Avatar Dropdown */}
          <div className="relative">
            <div
              onClick={() => handleShow()}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ring-2"
              style={{
                borderColor: accentColor,
                ringColor: `${accentColor}40`,
                boxShadow: `0 4px 16px ${accentColor}40`,
              }}
            >
              <img
                src={
                  User?.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTtLeSSHX-wbWFp_a_yKe3C4XAvY1NBmimNFV8akYRuIsaFGRufPr-QOT3BAHwH6m8KE&usqp=CAU"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            {show && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShow(false)}
                ></div>

                {/* Dropdown Menu */}
                <div
                  className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl border-2 p-3 z-50"
                  style={{
                    backgroundColor: navBg,
                    borderColor: border,
                    boxShadow: isDark
                      ? `0 20px 60px ${accentColor}30`
                      : "0 20px 60px rgba(0,0,0,0.15)",
                    animation: "slideDown 0.2s ease-out",
                  }}
                >
                  {/* User Info */}
                  <div
                    className="px-3 py-3 rounded-xl mb-2"
                    style={{
                      backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
                    }}
                  >
                    <p className="font-bold text-sm truncate" style={{ color: textMain }}>
                      {User?.firstName
                        ? `${User.firstName} ${User.lastName || ""}`.trim()
                        : "Guest User"}
                    </p>
                    <p className="text-xs truncate" style={{ color: textSub }}>
                      {User?.email || "guest@example.com"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/Profile");
                          setShow(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 font-medium text-sm"
                        style={{ color: textMain, backgroundColor: "transparent" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark ? "#1F1F1F" : "#FFF0F7";
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = textMain;
                        }}
                      >
                        <UserIcon className="w-4 h-4" /> {/* ── FIX: UserIcon (was User, conflicting with Redux User) ── */}
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/settings");
                          setShow(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 font-medium text-sm"
                        style={{ color: textMain, backgroundColor: "transparent" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDark ? "#1F1F1F" : "#FFF0F7";
                          e.currentTarget.style.color = accentColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = textMain;
                        }}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </li>
                    <li className="pt-1 mt-1" style={{ borderTop: `1px solid ${border}` }}>
                      <button
                        onClick={() => {
                          User ? handleLogout() : navigate("/");
                          setShow(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 font-medium text-sm text-white"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                          boxShadow: `0 4px 16px ${accentColor}40`,
                        }}
                      >
                        {User ? (
                          <>
                            <LogOut className="w-4 h-4" />
                            Logout
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4" />
                            Login
                          </>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;