import { sidebarOpen, sidebarClose } from "../../Store/SidebarSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User as UserIcon,
  Search,
  MessageCircle,
  Users,
  UserPlus,
  PenSquare,
  Info,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const SideBar = () => {
  const User = useSelector((state) => state.user);
  const location = useLocation();
  const side = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Color scheme matching the profile form
  const accentColor = "#FF0087";
  const sidebarBg = isDark ? "#0F0F0F" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const hoverBg = isDark ? "#1F1F1F" : "#FFF0F7";
  const cardBg = isDark ? "#151515" : "#FFFFFF";

  // Auto open on laptop, close on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
        dispatch(sidebarOpen("close"));
      } else {
        setIsOpen(false);
        dispatch(sidebarClose());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const links = [
    { name: "Home", path: "/Home", icon: Home },
    { name: "Profile", path: "/Profile", icon: UserIcon },
    { name: "Search", path: "/Search", icon: Search },
    { name: "Messages", path: "/Messages", icon: MessageCircle },
    { name: "Friends", path: "/Friends", icon: Users },
    { name: "Connection Requests", path: "/ConnectionRequest", icon: UserPlus },
    { name: "Create a Post", path: "/Posts", icon: PenSquare },
    { name: "About Us", path: "/About", icon: Info },
  ];

  if (!User) return null;

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(20px, -20px) rotate(3deg); }
            66% { transform: translate(-15px, 15px) rotate(-3deg); }
          }
          
          .sidebar-nav::-webkit-scrollbar {
            width: 6px;
          }
          .sidebar-nav::-webkit-scrollbar-track {
            background: transparent;
          }
          .sidebar-nav::-webkit-scrollbar-thumb {
            background: ${accentColor}60;
            border-radius: 10px;
          }
          .sidebar-nav::-webkit-scrollbar-thumb:hover {
            background: ${accentColor};
          }
        `}
      </style>

      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: cardBg,
          color: textMain,
          border: `2px solid ${border}`,
          boxShadow: `0 8px 24px ${accentColor}30`,
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      {isOpen && (
        <aside
          className="fixed lg:static top-0 left-0 z-40  lg:h-[calc(100vh-80px)] w-80 shadow-2xl transition-all duration-500 ease-out flex flex-col"
          style={{
            backgroundColor: sidebarBg,
            borderRight: `2px solid ${border}`,
          }}
        >
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-0 w-full h-[calc(100vh-80px)] overflow-hidden pointer-events-none opacity-20">
            <div
              className="absolute top-10 left-10 w-48 h-48 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                animation: "float 20s ease-in-out infinite",
              }}
            ></div>
            <div
              className="absolute bottom-20 right-10 w-56 h-56 rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
                animation: "float 25s ease-in-out infinite reverse",
              }}
            ></div>
          </div>

          {/* Header Section */}
          <div className="relative z-10 px-6 py-6 border-b-2" style={{ borderColor: border }}>
            {/* Theme Toggle */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
                style={{
                  backgroundColor: hoverBg,
                  border: `2px solid ${border}`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: `${accentColor}20` }}
                ></div>
                {isDark ? (
                  <Sun className="w-5 h-5 relative z-10" style={{ color: textMain }} />
                ) : (
                  <Moon className="w-5 h-5 relative z-10" style={{ color: textMain }} />
                )}
              </button>
            </div>

            {/* User Info Card */}
            <div
              className="rounded-2xl p-5 border-2 transition-all duration-300 relative overflow-hidden group"
              style={{
                backgroundColor: hoverBg,
                borderColor: border,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: `${accentColor}10` }}
              ></div>

              <div className="relative z-10 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                    boxShadow: `0 4px 12px ${accentColor}60`,
                  }}
                >
                  {User?.firstName ? User.firstName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold truncate" style={{ color: textMain }}>
                    {User?.firstName
                      ? `${User.firstName} ${User.lastName || ""}`.trim()
                      : "Welcome"}
                  </p>
                  <p className="text-xs font-medium flex items-center gap-1" style={{ color: textSub }}>
                    <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                    Active now
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="sidebar-nav flex-1 px-4 py-6 overflow-y-auto relative z-10">
            <ul className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;

                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                      className="group block px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 relative overflow-hidden"
                      style={{
                        backgroundColor: isActive ? accentColor : "transparent",
                        color: isActive ? "#FFFFFF" : textMain,
                        border: `2px solid ${isActive ? accentColor : "transparent"}`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = hoverBg;
                          e.currentTarget.style.borderColor = border;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                        }
                      }}
                    >
                      {/* Hover gradient overlay */}
                      {isActive && (
                        <div
                          className="absolute inset-0 opacity-30 pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                          }}
                        ></div>
                      )}

                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon
                            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: isActive ? "#FFFFFF" : accentColor }}
                          />
                          <span className="text-sm">{link.name}</span>
                        </div>
                        {isActive && (
                          <ChevronRight
                            className="w-4 h-4 animate-pulse"
                            style={{ color: "#FFFFFF" }}
                          />
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Logo/Branding */}
          <div
            className="relative z-10 px-6 py-4 border-t-2 mt-auto"
            style={{ borderColor: border }}
          >
            <div
              className="rounded-2xl p-4 text-center border-2"
              style={{
                backgroundColor: hoverBg,
                borderColor: border,
              }}
            >
              <p className="text-2xl font-black mb-1" style={{ color: accentColor }}>
                DevCircle
              </p>
              <p className="text-xs font-medium" style={{ color: textSub }}>
                Connect. Build. Grow.
              </p>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};