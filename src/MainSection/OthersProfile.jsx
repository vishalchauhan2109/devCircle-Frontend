import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Sparkles,
  Sun,
  Moon,
  PenSquare,
  FileText,
  Users,
  UserCheck,
} from "lucide-react";
import axios from "axios";
import { baseUrl } from "../Constants";

const OthersProfile = () => {
  const User = useSelector((state) => state.UserStore.user);

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar & Feed
  const [data, setData] = useState("");
  const accentColor = "#FF0087";
  const pageBg = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg = isDark ? "#0F0F0F" : "#FFFFFF"; // matches sidebarBg
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const hoverBg = isDark ? "#1F1F1F" : "#FFF0F7";

  
  

  const {userID} = useParams();
  console.log(userID);

  const viewProfile = async() => {
    try {
      
      const data = await axios.get(baseUrl + "/user/"+ userID, { withCredentials: true });
      setData(data?.data)
    } catch (Error) {
      console.log(Error);
    }
  };

  useEffect(() => {
    viewProfile()
  },[]);

  console.log(data)
  return (
    <div
      className="flex justify-center w-full h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] overflow-y-auto px-4 py-6 relative"
      style={{ backgroundColor: pageBg }}
    >
      {/* Ambient background blobs — same as SideBar & Feed */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10 z-0">
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Float keyframes — same as SideBar */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%       { transform: translate(20px, -20px) rotate(3deg); }
          66%       { transform: translate(-15px, 15px) rotate(-3deg); }        
        }
      `}</style>

      {/* Main Profile Card */}
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl border-2 shadow-2xl my-6 overflow-hidden flex flex-col"
        style={{ backgroundColor: cardBg, borderColor: border }}
      >
        {/* ── Top accent banner with theme toggle ── */}
        <div
          className="relative h-28 shrink-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}CC 0%, #CC006D99 100%)`,
          }}
        >
          {/* Subtle shimmer overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)",
            }}
          />

          {/* Theme toggle — top right, exact same as SideBar */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
              style={{
                backgroundColor: cardBg,
                border: `2px solid ${border}`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: `${accentColor}20` }}
              />
              {isDark ? (
                <Sun
                  className="w-5 h-5 relative z-10"
                  style={{ color: textMain }}
                />
              ) : (
                <Moon
                  className="w-5 h-5 relative z-10"
                  style={{ color: textMain }}
                />
              )}
            </button>
          </div>
        </div>

        {/* ── Profile Image — overlapping the banner ── */}
        <div className="flex justify-center -mt-16 px-6 relative z-10">
          <div
            className="rounded-full p-1 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
              boxShadow: `0 8px 32px ${accentColor}60`,
            }}
          >
            <img
              src={data?.photoURL|| "https://via.placeholder.com/300"}
              alt="profile"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4"
              style={{ borderColor: cardBg }}
            />
          </div>
        </div>

        {/* ── Name & Bio ── */}
        <div className="px-6 sm:px-8 pt-4 pb-2 text-center">
          <h1
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: textMain }}
          >
            {data?.firstName} {data?.lastName}
          </h1>

          <p
            className="text-xs flex items-center justify-center gap-1 mt-1"
            style={{ color: textSub }}
          >
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            Active now
          </p>

          <p
            className="text-sm sm:text-base mt-3 leading-relaxed"
            style={{ color: textSub }}
          >
            {data?.about || "No bio available"}
          </p>
        </div>

        {/* ── Divider ── */}
        <div
          className="mx-6 sm:mx-8 my-4 h-px"
          style={{ backgroundColor: border }}
        />

        {/* ── STATS ── */}
        <div className="flex justify-center gap-4 sm:gap-10 px-6 sm:px-8">
          {[
            { icon: FileText, value: "120", label: "Posts" },
            { icon: Users, value: "10.5k", label: "Followers" },
            { icon: UserCheck, value: "890", label: "Following" },
          ].map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex-1 flex flex-col items-center py-4 px-2 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-default"
              style={{ backgroundColor: hoverBg, borderColor: border }}
            >
              <Icon className="w-4 h-4 mb-1" style={{ color: accentColor }} />
              <span className="text-xl font-bold" style={{ color: textMain }}>
                {value}
              </span>
              <p className="text-xs font-medium" style={{ color: textSub }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OthersProfile;
