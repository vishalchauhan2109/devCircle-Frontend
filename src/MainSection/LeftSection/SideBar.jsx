import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Search,
  MessageCircle,
  Users,
  UserPlus,
  PenSquare,
  Info,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";

export const SideBar = () => {
  const user = useSelector((state) => state.UserStore.user);
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);
  const [dark, setDark] = useState(true);

  console.log(user?._id)
  // 🎨 Theme palette
  const accent = "#FF0087";

  const theme = {
    bg: dark ? "#0F0F0F" : "#FFFFFF",
    card: dark ? "#151515" : "#FFF5FA",
    hover: dark ? "#1F1F1F" : "#FFEAF3",
    text: dark ? "#FFFFFF" : "#0A0A0A",
    subText: dark ? "#A0A0A0" : "#666666",
    border: dark ? "#252525" : "#FFD6E8",
  };

  const items = [
    { label: "Home", path: "/Home", icon: Home },
    { label: "Profile", path: `/Profile`, icon: User },
    { label: "Search", path: "/Search", icon: Search },
    { label: "Messages", path: "/chat", icon: MessageCircle },
    { label: "Friends", path: "/Friends", icon: Users },
    { label: "Requests", path: "/ConnectionRequest", icon: UserPlus },
    { label: "Create Post", path: "/Posts", icon: PenSquare },
    { label: "About", path: "/About", icon: Info },
  ];

  if (!user) return null;

  return (
    <>


      {/* 🧭 Sidebar */}
      <aside
        className={`
          fixed lg:static top-[80px] left-0
          h-[calc(100vh-80px)]
          w-[290px] lg:w-[320px]
          z-[50]
          flex flex-col
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        style={{
          background: theme.bg,
          borderRight: `1px solid ${theme.border}`,
        }}
      >
        {/* ❌ Close (mobile) */}
        <div className="lg:hidden flex justify-end px-6 pt-5 pb-2">
          <X
            size={100}
            color={theme.text}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* 👤 User Card */}
        <div className="px-6 py-5 border-b" style={{ borderColor: theme.border }}>
          <div
            className="flex items-center gap-4 p-4 rounded-2xl"
            style={{ background: theme.card }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg"
              style={{ background: accent }}
            >
              {user.firstName?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p
                className="font-semibold text-base truncate"
                style={{ color: theme.text }}
              >
                {user.firstName} {user.lastName}
              </p>
              <p
                className="text-xs flex items-center gap-1"
                style={{ color: theme.subText }}
              >
                <Sparkles size={12} color={accent} /> Active now
              </p>
            </div>
          </div>
        </div>

        {/* 🔗 Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all"
                style={{
                  background: active ? accent : "transparent",
                  color: active ? "#fff" : theme.text,
                }}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    size={20}
                    color={active ? "#fff" : accent}
                  />
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                </div>
                {active && <ChevronRight size={18} />}
              </Link>
            );
          })}
        </nav>

        {/* 🌗 Theme Toggle */}
        <div className="px-6 py-5 border-t" style={{ borderColor: theme.border }}>
          <button
            onClick={() => setDark(!dark)}
            className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl font-medium"
            style={{ background: theme.hover, color: theme.text }}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>
      </aside>
    </>
  );
};