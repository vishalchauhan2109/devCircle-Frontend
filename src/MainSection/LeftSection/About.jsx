import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const About = () => {
  const User = useSelector((state) => state.user);
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const requestRef = useRef(null);
  const isHovering = useRef(false);
  const scrollSpeed = 0.6;

  const words = ["Build", "Connect", "Grow", "Collaborate", "Innovate"];
  const [activeWord, setActiveWord] = useState(words[0]);

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
    <div className="h-[calc(100vh-80px)] bg-[#003566] overflow-hidden text-[#FFC300]">
      <div
        ref={scrollRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        className="h-full overflow-y-auto about-no-scrollbar"
      >
        <div className="flex flex-col">

          {/* ================= HERO ================= */}
          <section className="px-6 py-24 text-center bg-[#001D3D] text-[#FFC300]">
            <h1 className="text-5xl font-extrabold mb-6">
              A Place to <span className="text-[#FFD60A]">{activeWord}</span>
            </h1>

            <p className="text-xl max-w-3xl mx-auto mb-8 text-[#FFD60A]">
              Dev-Circle is a developer-first social platform where ideas turn
              into impact and growth happens together.
            </p>

            <p className="italic text-lg mb-10 text-[#FFC300]">
              “You don’t grow alone — you grow with the people you surround yourself with.”
            </p>

            <button
              onClick={() => navigate("/Home")}
              className="px-10 py-4 bg-[#FFC300] text-[#001D3D] font-bold rounded-full hover:scale-105 transition-all"
            >
              Join Dev-Circle 🚀
            </button>
          </section>

          {/* ================= FEATURES ================= */}
          <section className="py-20 px-6 lg:px-24">
            <h2 className="text-4xl font-bold text-center mb-14 text-[#FFD60A]">
              What You Can Do Here
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                ["💬 Share Ideas", "Post your thoughts and creative concepts."],
                ["🤝 Meet Seniors", "Learn from experienced developers."],
                ["📚 Learn Together", "Collaborate and grow skills faster."],
                ["🌐 Opportunities", "Discover jobs and internships."],
                ["👥 Make Friends", "Build developer friendships."],
                ["🚀 Grow Together", "Push limits and innovate."]
              ].map(([title, desc], i) => (
                <div
                  key={i}
                  className="bg-[#003566] p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-all border-2 border-[#FFD60A]"
                >
                  <h3 className="text-2xl font-semibold mb-3 text-[#FFC300]">{title}</h3>
                  <p className="text-[#FFD60A]">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className="bg-[#001D3D] py-16 text-center text-[#FFC300] px-6">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Developer Journey?
            </h2>

            <Link
              to={User ? "/Home" : "/"}
              className="inline-block bg-[#FFD60A] text-[#001D3D] px-8 py-4 font-semibold rounded-full hover:scale-105 transition"
            >
              Start Your Journey ✨
            </Link>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="bg-[#003566] text-center py-6 text-[#FFC300]">
            <p className="text-sm">Developed with ❤️ for the Dev-Circle Community</p>
            <p className="text-xs mt-1 opacity-80">© {new Date().getFullYear()} Dev-Circle</p>
          </footer>

        </div>
      </div>

      {/* hide scrollbar */}
      <style>{`
        .about-no-scrollbar::-webkit-scrollbar { display: none; }
        .about-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
};
