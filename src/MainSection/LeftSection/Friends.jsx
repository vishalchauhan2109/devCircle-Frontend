import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendsCard from "./FriendsCard";
import { baseUrl } from "../../Constants";
import { Users, Sun, Moon, Sparkles } from "lucide-react";

const Friends = () => {
  const [friend, setFriend] = useState([]);

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar, Feed, Profile, About

  // ─── Color scheme matching SideBar, Feed, Profile & About components ──────
  const accentColor = "#FF0087";
  const pageBg   = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg   = isDark ? "#0F0F0F" : "#FFFFFF";  // matches sidebarBg
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub  = isDark ? "#A0A0A0" : "#666666";
  const border   = isDark ? "#252525" : "#FFE5F0";
  const hoverBg  = isDark ? "#1F1F1F" : "#FFF0F7";
  // ──────────────────────────────────────────────────────────────────────────

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${baseUrl}/friends`, {
        withCredentials: true,
      });
      if (res.data.length > 0) {
        setFriend(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div
      className="flex flex-col items-center w-full h-[calc(100vh-80px)] overflow-y-scroll py-8 px-4 relative"
      style={{ backgroundColor: pageBg }}
    >
      {/* Ambient background blobs — same as SideBar, Feed, Profile & About */}
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

      {/* ── Page Header — same card style as Feed header ── */}
      <div className="relative z-10 w-full max-w-6xl mb-8">
        <div
          className="flex items-center justify-between px-5 py-4 rounded-2xl border-2"
          style={{ backgroundColor: hoverBg, borderColor: border }}
        >
          {/* Left — Title */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 4px 12px ${accentColor}60`,
              }}
            >
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: textMain }}>
                Your Friends
              </p>
              <p className="text-xs flex items-center gap-1" style={{ color: textSub }}>
                <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                {friend.length > 0 ? `${friend.length} connections` : "People you've connected with"}
              </p>
            </div>
          </div>

          {/* Right — Theme toggle button — exact same as SideBar, Feed, Profile & About */}
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
              <Sun className="w-5 h-5 relative z-10" style={{ color: textMain }} />
            ) : (
              <Moon className="w-5 h-5 relative z-10" style={{ color: textMain }} />
            )}
          </button>
        </div>
      </div>

      {/* ── Friends List / Empty State ── */}
      {friend.length === 0 ? (
        /* Empty state — same card style as Feed & Profile empty states */
        <div
          className="relative z-10 flex flex-col items-center justify-center mt-20 mx-4 px-10 py-12 rounded-2xl border-2"
          style={{ backgroundColor: hoverBg, borderColor: border, maxWidth: "36rem", width: "100%" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
              boxShadow: `0 4px 20px ${accentColor}50`,
            }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg font-bold mb-1" style={{ color: textMain }}>
            No friends yet
          </p>
          <p className="text-sm text-center" style={{ color: textSub }}>
            Connect with developers to see them here.
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-wrap justify-center gap-6 w-full max-w-6xl">
          {friend.map((items, idx) =>
            items ? <FriendsCard key={idx} data={items} /> : null
          )}
        </div>
      )}
    </div>
  );
};

export default Friends;