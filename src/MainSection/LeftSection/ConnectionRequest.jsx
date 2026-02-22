import React, { useEffect, useState } from "react";
import axios from "axios";
import ConnectionRequestCard from "./ConnectionRequestCard";
import { baseUrl } from "../../Constants";
import { UserPlus, Sun, Moon, Sparkles } from "lucide-react";

const ConnectionRequest = () => {
  const [requests, setRequests] = useState([]);
  const [reload, setReload] = useState(false);

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar, Feed, Profile, About, Friends

  // ─── Color scheme matching SideBar, Feed, Profile, About & Friends ────────
  const accentColor = "#FF0087";
  const pageBg   = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg   = isDark ? "#0F0F0F" : "#FFFFFF";  // matches sidebarBg
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub  = isDark ? "#A0A0A0" : "#666666";
  const border   = isDark ? "#252525" : "#FFE5F0";
  const hoverBg  = isDark ? "#1F1F1F" : "#FFF0F7";
  // ──────────────────────────────────────────────────────────────────────────

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${baseUrl}/incomingRequest`, {
        withCredentials: true,
      });

      if (res?.data && res.data !== "No request found") {
        setRequests(res.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [reload]);

  return (
    <div
      className="flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-hide items-center w-full h-[calc(100vh-80px)] relative"
      style={{ backgroundColor: pageBg }}
    >
      {/* Ambient background blobs — same as SideBar, Feed, Profile, About & Friends */}
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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── Page Header — same card style as Feed & Friends header ── */}
      <div className="relative z-10 w-full max-w-2xl px-4 pt-6 pb-4">
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
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: textMain }}>
                Connection Requests
              </p>
              <p className="text-xs flex items-center gap-1" style={{ color: textSub }}>
                <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                {requests.length > 0 ? `${requests.length} pending requests` : "People who want to connect"}
              </p>
            </div>
          </div>

          {/* Right — Theme toggle — exact same as SideBar, Feed, Profile, About & Friends */}
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

      {/* ── Content ── */}
      {requests.length === 0 ? (
        /* Empty state — same as Feed, Friends empty states */
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
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg font-bold mb-1" style={{ color: textMain }}>
            No requests yet
          </p>
          <p className="text-sm text-center" style={{ color: textSub }}>
            No connection requests found!
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col w-full max-w-2xl gap-4 px-4 pb-6">
          {requests.map((item, idx) =>
            item ? (
              <ConnectionRequestCard
                key={idx}
                request={item}
                setLoad={setReload}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;