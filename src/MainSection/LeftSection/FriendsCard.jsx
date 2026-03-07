import React from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FriendsCard = (props) => {  
  const { firstName, lastName,_id, photoURL, about } = props?.data || {};

  // ─── Color scheme matching SideBar, Feed, Profile, About & Friends ────────
  // bg-white base — clean on both light & dark parent backgrounds
  const accentColor = "#FF0087";
  // ──────────────────────────────────────────────────────────────────────────

  const  navigate = useNavigate()
  return (
    <div
      className="flex flex-col sm:flex-row w-full max-w-md p-5 rounded-2xl border-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group bg-white"
      style={{ borderColor: "#FFE5F0" }}
    >
      {/* Hover pink glow overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: `${accentColor}06` }}
      />

      {/* Left accent bar on hover */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
      />

      {/* ── Image ── */}
      <div className="relative flex-shrink-0 mb-4 sm:mb-0 sm:mr-5">
        <div
          className="rounded-2xl p-0.5"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            boxShadow: `0 4px 16px ${accentColor}40`,
          }}
        >
          <img
            src={photoURL || "/default-avatar.png"}
            alt={`${firstName} ${lastName}`}
            className="w-full sm:w-28 h-32 object-cover rounded-2xl border-4 border-white"
          />
        </div>

        {/* Active indicator dot */}
        <div
          className="absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* ── Content ── */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Name */}
          <h3 className="text-lg font-bold leading-tight text-gray-900">
            {firstName?.toUpperCase()} {lastName?.toUpperCase()}
          </h3>

          {/* Active badge */}
          <p className="text-xs flex items-center gap-1 mt-1 mb-2 text-gray-400">
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            Active now
          </p>

          {/* Bio */}
          <p className="text-sm line-clamp-3 leading-relaxed text-gray-500">
            {about || "No bio available"}
          </p>
        </div>

        {/* View Profile Button */}
        <button
        onClick={()=>{navigate(`/profile/${_id}`)}}
          className="mt-4 self-start flex items-center gap-2 px-5 py-2 font-semibold rounded-xl text-white text-sm transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            boxShadow: `0 4px 12px ${accentColor}40`,
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
          />
          <span className="relative z-10">View Profile</span>
          <ChevronRight className="w-4 h-4 relative z-10 animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;