import React, { useState, useRef, useEffect } from "react";
import { Phone, Video, Send, Moon, Sun, Smile, Paperclip, MoreVertical, ArrowLeft, Info } from "lucide-react";

const initialMessages = [
  { id: 1, text: "Hey, where are you?", time: "10:12 PM", sender: "other" },
  { id: 2, text: "On my way, 5 mins", time: "10:13 PM", sender: "me" },
  { id: 3, text: "Okay 👍", time: "10:14 PM", sender: "other" },
  { id: 4, text: "Running a bit late, sorry!", time: "10:15 PM", sender: "other" },
  { id: 5, text: "No worries, take your time 😊", time: "10:16 PM", sender: "me" },
  { id: 6, text: "Thanks! See you soon", time: "10:17 PM", sender: "other" },
  { id: 7, text: "Almost there!", time: "10:20 PM", sender: "other" },
  { id: 8, text: "Great! I'm at the entrance", time: "10:21 PM", sender: "me" },
  { id: 9, text: "Perfect, I can see you 👋", time: "10:22 PM", sender: "other" },
];

export default function MessageSection() {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const bubbleMe = "#FF0087";
  const bubbleOther = isDark ? "#1F1F1F" : "#FFF0F7";
  const inputBg = isDark ? "#1F1F1F" : "#FFF0F7";
  const accentColor = "#FF0087";

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        sender: "me",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="flex h-[calc(100vh-80px)] w-full transition-colors duration-500 relative "
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
        className="w-full h-full flex flex-col shadow-2xl relative z-10 backdrop-blur-xl"
        style={{ 
          backgroundColor: isDark ? `${cardBg}E6` : `${cardBg}F2`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b-2 backdrop-blur-lg"
          style={{ 
            background: isDark 
              ? `linear-gradient(180deg, ${cardBg} 0%, ${cardBg}E6 100%)`
              : `linear-gradient(180deg, ${cardBg} 0%, #FFF5F9 100%)`,
            borderColor: border,
          }}
        >
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="p-2 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{ 
                backgroundColor: isDark ? "#252525" : "#FFE5F0",
                color: textMain,
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <img
                src="https://i.pravatar.cc/100?img=45"
                alt="Hachimitsu profile picture"
                className="w-12 h-12 rounded-full object-cover ring-3 transition-all duration-300"
                style={{
                  ringColor: accentColor,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-3 animate-pulse"
                style={{
                  backgroundColor: "#10B981",
                  borderColor: cardBg,
                }}
              ></div>
            </div>
            
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-bold text-base tracking-tight truncate" style={{ color: textMain }}>
                Hachimitsu
              </span>
              <span className="text-xs font-semibold tracking-tight" style={{ 
                color: isTyping ? accentColor : "#10B981" 
              }}>
                {isTyping ? "typing..." : "online"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Voice call"
              className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: isDark ? "#252525" : "#FFE5F0",
                color: textMain,
              }}
            >
              <Phone className="w-4.5 h-4.5" />
            </button>
            <button
              aria-label="Video call"
              className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: isDark ? "#252525" : "#FFE5F0",
                color: textMain,
              }}
            >
              <Video className="w-4.5 h-4.5" />
            </button>
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
          </div>
        </div>

        {/* Chat area */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-rounded-full"
          style={{ 
            backgroundColor: isDark ? "#0A0A0A" : "#FFF5F9",
            scrollbarColor: `${accentColor}60 transparent`,
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              } animate-fadeIn`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="max-w-[75%] md:max-w-[60%] lg:max-w-[50%] group">
                <div
                  className={`px-5 py-3 rounded-3xl text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                    msg.sender === "me" 
                      ? "rounded-br-md" 
                      : "rounded-bl-md"
                  }`}
                  style={{
                    backgroundColor: msg.sender === "me" ? bubbleMe : bubbleOther,
                    color: msg.sender === "me" ? "#FFFFFF" : textMain,
                    boxShadow: msg.sender === "me" 
                      ? `0 4px 20px ${accentColor}40` 
                      : isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                </div>
                <div
                  className={`text-xs mt-1.5 font-semibold tracking-tight ${
                    msg.sender === "me" ? "text-right" : "text-left"
                  }`}
                  style={{ color: textSub }}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="max-w-[75%] md:max-w-[60%] lg:max-w-[50%]">
                <div
                  className="px-6 py-4 rounded-3xl rounded-bl-md shadow-lg flex gap-1.5"
                  style={{ 
                    backgroundColor: bubbleOther,
                    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full animate-bounce" 
                    style={{ 
                      backgroundColor: accentColor,
                      animationDelay: "0ms",
                    }}
                  ></span>
                  <span 
                    className="w-2.5 h-2.5 rounded-full animate-bounce" 
                    style={{ 
                      backgroundColor: accentColor,
                      animationDelay: "150ms",
                    }}
                  ></span>
                  <span 
                    className="w-2.5 h-2.5 rounded-full animate-bounce" 
                    style={{ 
                      backgroundColor: accentColor,
                      animationDelay: "300ms",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="px-6 py-4 border-t-2 backdrop-blur-lg"
          style={{ 
            backgroundColor: isDark ? `${cardBg}E6` : `${cardBg}F2`,
            borderColor: border,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              aria-label="Attach file"
              className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden"
              style={{
                backgroundColor: isDark ? "#252525" : "#FFE5F0",
                color: textSub,
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor}20 0%, transparent 70%)`,
                }}
              ></div>
              <Paperclip className="w-5 h-5 relative z-10" />
            </button>
            
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                aria-label="Type a message"
                className="w-full px-5 py-3 rounded-3xl outline-none font-medium placeholder:font-normal text-sm border-2 transition-all duration-300 focus:scale-[1.02]"
                style={{ 
                  backgroundColor: inputBg,
                  color: textMain,
                  borderColor: inputValue ? accentColor : "transparent",
                }}
              />
            </div>
            
            <button
              aria-label="Insert emoji"
              className="p-2.5 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden"
              style={{
                backgroundColor: isDark ? "#252525" : "#FFE5F0",
                color: textSub,
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${accentColor}20 0%, transparent 70%)`,
                }}
              ></div>
              <Smile className="w-5 h-5 relative z-10" />
            </button>
            
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none relative overflow-hidden group"
              style={{
                background: inputValue.trim() 
                  ? `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`
                  : isDark ? "#252525" : "#FFE5F0",
                boxShadow: inputValue.trim() ? `0 4px 20px ${accentColor}60` : "none",
              }}
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                }}
              ></div>
              <Send 
                className="w-5 h-5 relative z-10" 
                style={{ 
                  color: inputValue.trim() ? "#FFFFFF" : textSub,
                }} 
              />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
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