import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Sparkles } from "lucide-react";

export const About = () => {
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const requestRef = useRef(null);
  const isHovering = useRef(false);
  const scrollSpeed = 0.6;

  const words = ["Build", "Connect", "Grow", "Collaborate", "Innovate"];
  const [activeWord, setActiveWord] = useState(words[0]);

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar, Feed, Profile

  // ─── Color scheme matching SideBar, Feed & Profile components ─────────────
  const accentColor = "#FF0087";
  const pageBg      = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg      = isDark ? "#0F0F0F" : "#FFFFFF";  // matches sidebarBg
  const sectionBg   = isDark ? "#080808" : "#FFF0F7";  // alternate section bg
  const textMain    = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub     = isDark ? "#A0A0A0" : "#666666";
  const border      = isDark ? "#252525" : "#FFE5F0";
  const hoverBg     = isDark ? "#1F1F1F" : "#FFF0F7";
  // ──────────────────────────────────────────────────────────────────────────

  // Rotating words
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setActiveWord(words[i]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Optional vertical auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const step = () => {
      if (!isHovering.current) {
        container.scrollTop += scrollSpeed;
      }
      if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
        container.scrollTop = 0;
      }
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div
      className="h-[calc(100vh-80px)] overflow-hidden relative"
      style={{ backgroundColor: pageBg, color: textMain }}
    >
      {/* Ambient background blobs — same as SideBar, Feed & Profile */}
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

      {/* Theme toggle button — top right, exact same as SideBar, Feed & Profile */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
          style={{
            backgroundColor: cardBg,
            border: `2px solid ${border}`,
            boxShadow: `0 4px 16px ${accentColor}30`,
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

      <div
        ref={scrollRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        className="h-full overflow-y-auto about-no-scrollbar relative z-10"
      >
        <div className="flex flex-col">

          {/* ================= HERO ================= */}
          <section
            className="px-6 py-24 text-center relative overflow-hidden"
            style={{ backgroundColor: sectionBg }}
          >
            {/* Hero inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${accentColor}15 0%, transparent 70%)`,
              }}
            />

            <h1 className="text-5xl font-extrabold mb-6 relative z-10" style={{ color: textMain }}>
              A Place to{" "}
              <span
                className="transition-all duration-500"
                style={{
                  color: accentColor,
                  textShadow: `0 0 30px ${accentColor}60`,
                }}
              >
                {activeWord}
              </span>
            </h1>

            <p className="text-xl max-w-3xl mx-auto mb-8 relative z-10" style={{ color: textSub }}>
              Dev-Circle is a developer-first social platform where ideas turn
              into impact and growth happens together.
            </p>

            <p className="italic text-lg mb-10 relative z-10" style={{ color: textSub }}>
              "You don't grow alone — you grow with the people you surround yourself with."
            </p>

            <button
              onClick={() => navigate("/Home")}
              className="relative px-10 py-4 font-bold rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group z-10"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 4px 24px ${accentColor}50`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
              />
              <span className="relative z-10">Join Dev-Circle 🚀</span>
            </button>
          </section>

          {/* ================= FEATURES ================= */}
          <section className="py-20 px-6 lg:px-24" style={{ backgroundColor: pageBg }}>
            <h2
              className="text-4xl font-bold text-center mb-14"
              style={{ color: textMain }}
            >
              What You Can Do{" "}
              <span style={{ color: accentColor }}>Here</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ["💬 Share Ideas", "Post your thoughts and creative concepts."],
                ["🤝 Meet Seniors", "Learn from experienced developers."],
                ["📚 Learn Together", "Collaborate and grow skills faster."],
                ["🌐 Opportunities", "Discover jobs and internships."],
                ["👥 Make Friends", "Build developer friendships."],
                ["🚀 Grow Together", "Push limits and innovate."],
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group"
                  style={{ backgroundColor: hoverBg, borderColor: border }}
                >
                  {/* Card hover pink glow — same pattern as sidebar nav links */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: `${accentColor}08` }}
                  />
                  <div
                    className="absolute top-0 left-0 w-1 h-full rounded-l-2xl transition-all duration-300 group-hover:opacity-100 opacity-0"
                    style={{ backgroundColor: accentColor }}
                  />
                  <h3 className="text-xl font-semibold mb-3 relative z-10" style={{ color: textMain }}>
                    {title}
                  </h3>
                  <p className="text-sm relative z-10" style={{ color: textSub }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section
            className="py-16 text-center px-6 relative overflow-hidden"
            style={{ backgroundColor: sectionBg }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${accentColor}10 0%, transparent 70%)`,
              }}
            />

            <h2 className="text-3xl font-bold mb-3 relative z-10" style={{ color: textMain }}>
              Ready to Start Your Developer Journey?
            </h2>

            <p className="mb-8 flex items-center justify-center gap-1 relative z-10" style={{ color: textSub }}>
              <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
              Join thousands of developers growing together
            </p>

            <Link
              to={User ? "/Home" : "/"}
              className="relative inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden group z-10"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 4px 24px ${accentColor}50`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
              />
              <span className="relative z-10">Start Your Journey ✨</span>
            </Link>
          </section>

          {/* ================= FOOTER ================= */}
          <footer
            className="text-center py-6 border-t-2"
            style={{ backgroundColor: cardBg, borderColor: border }}
          >
            <p
              className="text-2xl font-black mb-1"
              style={{ color: accentColor }}
            >
              DevCircle
            </p>
            <p className="text-sm" style={{ color: textSub }}>
              Developed with ❤️ for the Dev-Circle Community
            </p>
            <p className="text-xs mt-1" style={{ color: textSub, opacity: 0.6 }}>
              © {new Date().getFullYear()} Dev-Circle · Connect. Build. Grow.
            </p>
          </footer>

        </div>
      </div>

      {/* Float keyframes + scrollbar hide — same as SideBar */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%       { transform: translate(20px, -20px) rotate(3deg); }
          66%       { transform: translate(-15px, 15px) rotate(-3deg); }
        }
        .about-no-scrollbar::-webkit-scrollbar { display: none; }
        .about-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};