import React, { useState } from "react";
import { Search, Edit, Moon, Sun, MoreVertical, Check, Camera, Video, Phone } from "lucide-react";

const chatData = [
  {
    id: 1,
    name: "Husain_zaidi",
    message: "आपके मैसेज का 😊 रिप्लाइ दिया",
    time: "23h",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: false,
    online: true,
  }
];

export default function Chat() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);

  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const searchBg = isDark ? "#1F1F1F" : "#FFF0F7";
  const hoverBg = isDark ? "#1A1A1A" : "#FFF5F9";
  const selectedBg = isDark ? "#252525" : "#FFE5F0";
  const accentColor = "#FF0087";

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex h-[calc(100vh-80px)] overflow-y-scroll w-full justify-center items-center transition-colors duration-500 relative overflow-hidden"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #0A0A0A 0%, #1a0a14 50%, #0A0A0A 100%)"
          : "linear-gradient(135deg, #FFF5F9 0%, #FFE5F0 50%, #FFF5F9 100%)",
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>
        <div 
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-15 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        ></div>
      </div>

      <div
        className="w-full max-w-md h-[calc(100vh-40px)] flex flex-col shadow-2xl overflow-hidden relative z-10 backdrop-blur-xl border-2 transition-all duration-500"
        style={{ 
          backgroundColor: isDark ? `${cardBg}E6` : `${cardBg}F2`,
          borderColor: border,
          borderRadius: "28px",
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-5 pb-4"
          style={{ 
            background: isDark 
              ? `linear-gradient(180deg, ${cardBg} 0%, ${cardBg}E6 100%)`
              : `linear-gradient(180deg, ${cardBg} 0%, #FFF5F9 100%)`,
            borderBottom: `1px solid ${border}`,
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <h1
                className="text-2xl font-black tracking-tight bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: isDark 
                    ? `linear-gradient(135deg, ${textMain} 0%, ${accentColor} 100%)`
                    : `linear-gradient(135deg, ${textMain} 0%, ${accentColor} 100%)`,
                }}
              >
                Messages
              </h1>
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              ></div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
                style={{
                  backgroundColor: isDark ? "#252525" : "#FFE5F0",
                  color: textMain,
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${accentColor}20 0%, transparent 70%)`,
                  }}
                ></div>
                {isDark ? (
                  <Sun className="w-4.5 h-4.5 relative z-10" />
                ) : (
                  <Moon className="w-4.5 h-4.5 relative z-10" />
                )}
              </button>
              <button
                aria-label="New message"
                className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                  color: "#FFFFFF",
                  boxShadow: `0 4px 15px ${accentColor}40`,
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                  }}
                ></div>
                <Edit className="w-4.5 h-4.5 relative z-10" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 border-2 hover:border-opacity-60"
            style={{ 
              backgroundColor: searchBg,
              borderColor: isDark ? "#2A2A2A" : "#FFD6E8",
            }}
          >
            <Search 
              className="w-5 h-5 transition-all duration-300" 
              style={{ color: searchQuery ? accentColor : textSub }} 
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:font-normal"
              style={{ color: textMain }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold transition-all duration-200 hover:scale-110"
                style={{ color: accentColor }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Chat List */}
        <div 
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full"
          style={{ 
            backgroundColor: isDark ? "#0A0A0A" : "#FFF5F9",
            scrollbarColor: `${accentColor}60 transparent`,
          }}
        >
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: searchBg }}
              >
                <Search className="w-10 h-10" style={{ color: textSub }} />
              </div>
              <p className="text-base font-semibold" style={{ color: textSub }}>
                No conversations found
              </p>
            </div>
          ) : (
            filteredChats.map((chat, index) => (
              <div
                key={`${chat.id}-${index}`}
                onClick={() => setSelectedChat(chat.id)}
                className="relative cursor-pointer transition-all duration-300 group"
                style={{
                  backgroundColor:
                    selectedChat === chat.id ? selectedBg : "transparent",
                  borderBottom: `1px solid ${border}`,
                }}
                onMouseEnter={(e) => {
                  if (selectedChat !== chat.id) {
                    e.currentTarget.style.backgroundColor = hoverBg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedChat !== chat.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {/* Hover Gradient Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
                  }}
                ></div>

                <div className="flex items-center gap-4 px-6 py-4 relative z-10">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="relative">
                      <img
                        src={chat.avatar}
                        alt={`${chat.name} avatar`}
                        className="w-14 h-14 rounded-full object-cover ring-3 transition-all duration-300 group-hover:scale-105"
                        style={{
                          ringColor: chat.online ? accentColor : (isDark ? "#252525" : "#FFE5F0"),
                        }}
                      />
                      {chat.online && (
                        <div
                          className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-3 animate-pulse"
                          style={{
                            backgroundColor: "#10B981",
                            borderColor: cardBg,
                          }}
                        ></div>
                      )}
                    </div>
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className="font-bold truncate text-base transition-colors duration-200"
                        style={{
                          color: chat.unread ? textMain : textMain,
                          fontWeight: chat.unread ? "800" : "700",
                        }}
                      >
                        {chat.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-semibold flex-shrink-0 tracking-tight"
                          style={{ color: chat.unread ? accentColor : textSub }}
                        >
                          {chat.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        {chat.message.startsWith("You") && (
                          <Check
                            className="w-4 h-4 flex-shrink-0"
                            style={{ color: accentColor }}
                            strokeWidth={2.5}
                          />
                        )}
                        <p
                          className="text-sm truncate transition-colors duration-200"
                          style={{
                            color: chat.unread ? textMain : textSub,
                            fontWeight: chat.unread ? "600" : "400",
                          }}
                        >
                          {chat.message}
                        </p>
                      </div>
                      {chat.unread && (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-pulse shadow-lg"
                          style={{ 
                            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                            boxShadow: `0 4px 12px ${accentColor}60`,
                          }}
                        >
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Navigation */}
        <div 
          className="flex items-center justify-around py-3 border-t-2"
          style={{ 
            backgroundColor: cardBg,
            borderColor: border,
          }}
        >
          {[
            { icon: Camera, label: "Camera" },
            { icon: Phone, label: "Calls" },
            { icon: Video, label: "Video" },
          ].map((item, idx) => (
            <button
              key={idx}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group"
              style={{ color: textSub }}
            >
              <item.icon 
                className="w-5 h-5 transition-colors duration-300 group-hover:text-current" 
                style={{ 
                  color: textSub,
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                onMouseLeave={(e) => e.currentTarget.style.color = textSub}
              />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: ${accentColor}60;
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: ${accentColor};
        }
      `}</style>
    </div>
  );
}