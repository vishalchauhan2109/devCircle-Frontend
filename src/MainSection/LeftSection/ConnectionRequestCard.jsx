import axiosInstance from "../../api/axiosInstance";
import React from "react";
import { Sparkles, Check, X } from "lucide-react";

const ConnectionRequestCard = ({ request, setLoad }) => {
  const { firstName, lastName, photoURL, _id } = request;

  // ─── Color scheme matching SideBar, Feed, Profile, About, Friends ─────────
  // bg-white base — same as FriendsCard, clean on both light & dark parents
  const accentColor = "#FF0087";
  // ──────────────────────────────────────────────────────────────────────────

  const Resrequest = async (status, fromUserId) => {
    try {
      const res = await axiosInstance.post(
        `/request/review/${status}/${fromUserId}`,
        {}
      );
      setLoad(res); // trigger reload
    } catch (error) {
      console.log("Error responding to request:", error);
    }
  };

  return (
    <div
      className="w-full bg-white rounded-2xl p-5 shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group"
      style={{ borderColor: "#FFE5F0" }}
    >
      {/* Hover pink glow overlay — same as FriendsCard */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: `${accentColor}06` }}
      />

      {/* Left accent bar on hover — same as FriendsCard & About feature cards */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
      />

      {/* ── Top — Avatar + Info ── */}
      <div className="flex items-center gap-4 relative z-10">

        {/* Avatar with pink gradient ring — same as FriendsCard */}
        <div className="relative flex-shrink-0">
          <div
            className="rounded-full p-0.5"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
              boxShadow: `0 4px 12px ${accentColor}40`,
            }}
          >
            <img
              src={photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-white"
            />
          </div>

          {/* Active dot — same as FriendsCard */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">
            {firstName} {lastName}
          </h2>

          {/* "wants to connect" badge — same sparkle pattern as sidebar user card */}
          <p className="text-xs flex items-center gap-1 mt-0.5 text-gray-400">
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            wants to connect with you
          </p>
        </div>
      </div>

      {/* ── Buttons ── */}
      <div className="flex gap-3 mt-5 relative z-10">

        {/* Reject button */}
        <button
          onClick={() => Resrequest("rejected", _id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ borderColor: "#FFE5F0", color: "#CC006D", backgroundColor: "#FFF0F7" }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#FFE5F0";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#FFF0F7";
          }}
        >
          <X className="w-4 h-4" />
          Reject
        </button>

        {/* Accept button — same gradient as sidebar active links & profile button */}
        <button
          onClick={() => Resrequest("accepted", _id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            boxShadow: `0 4px 12px ${accentColor}40`,
          }}
        >
          {/* Shimmer on hover — same as Profile, About, FriendsCard buttons */}
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
          />
          <Check className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Accept</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;