// src/SearchPage.jsx
import React, { useState } from 'react';
import { Search, Sun, Moon, Sparkles } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar & all other components

  // ─── Color scheme matching SideBar & all other components ────────────────
  const accentColor = "#FF0087";
  const pageBg   = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg   = isDark ? "#0F0F0F" : "#FFFFFF";  // matches sidebarBg
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub  = isDark ? "#A0A0A0" : "#666666";
  const border   = isDark ? "#252525" : "#FFE5F0";
  const hoverBg  = isDark ? "#1F1F1F" : "#FFF0F7";
  // ─────────────────────────────────────────────────────────────────────────

  const handleInput = (e) => setQuery(e.target.value);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <div
      className="flex flex-col h-[calc(100vh-80px)] relative"
      style={{ backgroundColor: pageBg, color: textMain }}
    >
      {/* Ambient background blobs — same as all other components */}
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

      {/* ── TOP HEADER — search bar + theme toggle ── */}
      <div
        className="relative z-10 w-full px-4 pt-4 pb-4 border-b-2"
        style={{ borderColor: border, backgroundColor: cardBg }}
      >
        <form onSubmit={handleSearch} className="flex items-center gap-3 w-full max-w-3xl mx-auto">

          {/* Search input row */}
          <div
            className="flex flex-1 rounded-2xl border-2 overflow-hidden transition-all duration-300"
            style={{ borderColor: border, backgroundColor: hoverBg }}
          >
            <div className="flex items-center pl-4" style={{ color: textSub }}>
              <Search className="w-4 h-4" style={{ color: accentColor }} />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Type to search..."
              className="grow px-3 py-3 text-sm outline-none bg-transparent"
              style={{ color: textMain, caretColor: accentColor }}
              onFocus={(e) => {
                e.target.closest('div').style.borderColor = accentColor;
                e.target.closest('div').style.boxShadow = `0 0 0 3px ${accentColor}20`;
              }}
              onBlur={(e) => {
                e.target.closest('div').style.borderColor = border;
                e.target.closest('div').style.boxShadow = 'none';
              }}
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-3 font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 active:scale-95 relative overflow-hidden group/btn"
              style={{ background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
              />
              <span className="relative z-10">Search</span>
            </button>
          </div>

          {/* Theme toggle — same as Feed, Friends, ConnectionRequest, PostSection */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group flex-shrink-0"
            style={{ backgroundColor: hoverBg, border: `2px solid ${border}` }}
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
        </form>
      </div>

      {/* ── Main content — empty state ── */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 relative z-10">
        <div className="flex flex-col items-center opacity-40">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            }}
          >
            <Search className="w-7 h-7 text-white" />
          </div>
          <p className="text-lg font-bold mb-1" style={{ color: textMain }}>
            Search DevCircle
          </p>
          <p className="text-sm flex items-center gap-1" style={{ color: textSub }}>
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            Find developers, posts & more
          </p>
        </div>
      </main>

      {/* ── Footer — same as sidebar branding footer ── */}
      <footer
        className="relative z-10 mt-auto py-5 text-center border-t-2"
        style={{ borderColor: border }}
      >
        <p className="text-lg font-black" style={{ color: accentColor }}>DevCircle</p>
        <p className="text-xs mt-0.5" style={{ color: textSub, opacity: 0.7 }}>Connect. Build. Grow.</p>
      </footer>
    </div>
  );
}