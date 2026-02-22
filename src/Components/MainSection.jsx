import React, { useEffect, useState } from "react";
import { SideBar } from "../MainSection/LeftSection/SideBar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import Login from "./LoginAndSignup/Login";
import { SuggestPeople } from "../MainSection/RightSection/SuggestedPeople";
import axios from "axios";
import { baseUrl } from "../Constants";
import MessageSection from "../MainSection/RightSection/MessageSection";
import Chat from "../MainSection/LeftSection/Chat";
import { Loader2 } from "lucide-react";

export const MainSection = () => {
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  // Theme colors
  const accentColor = "#FF0087";
  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Profile/view`, {
        withCredentials: true,
      });
      dispatch(LoggedInUser(res.data));
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!User) {
      fetchLoggedInUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen transition-colors duration-500 relative overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full  overflow-hidden pointer-events-none opacity-30">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
              animation: "float 20s ease-in-out infinite",
            }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
              animation: "float 25s ease-in-out infinite reverse",
            }}
          ></div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{ 
              borderColor: accentColor,
              borderTopColor: 'transparent'
            }}
          ></div>
          <p 
            className="text-lg font-bold"
            style={{ color: textMain }}
          >
            Loading...
          </p>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(5deg); }
            66% { transform: translate(-20px, 20px) rotate(-5deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!User) return <Login />;

  return (
    <div 
      className=" h-[calc(100vh-80px)] transition-colors duration-500 relative"
      style={{ backgroundColor: bg }}
    >
      {/* Animated Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
            animation: "float 30s ease-in-out infinite",
          }}
        ></div>
      </div>

      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="pt-20 flex min-h-[calc(100vh-80px)] relative z-10">
        {/* Sidebar */}
        <div 
          className="hidden lg:block w-[15%] min-h-[calc(100vh-80px)] border-r-2 transition-all duration-500"
          style={{ 
            backgroundColor: bg,
            borderColor: border 
          }}
        >
          <div className=" overflow-x-hidden">
            <SideBar isDark={isDark} accentColor={accentColor} />
          </div>
        </div>

        {/* Main content */}
        <main 
          className="flex-1 min-h-[calc(100vh-80px)] overflow-y-auto"
          style={{ backgroundColor: bg }}
        >
          <div className="h-full">
            <Outlet context={{ isDark, accentColor, bg, cardBg, textMain, textSub, border }} />
          </div>
        </main>

        {/* Right section */}
        <div 
          className="hidden xl:block w-[30%] min-h-[calc(100vh-80px)] border-l-2 transition-all duration-500"
          style={{ 
            backgroundColor: bg,
            borderColor: border 
          }}
        >
          <div className="overflow-y-auto h-full">
            <Chat isDark={isDark} accentColor={accentColor} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${accentColor}40;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${accentColor};
        }
      `}</style>
    </div>
  );
};