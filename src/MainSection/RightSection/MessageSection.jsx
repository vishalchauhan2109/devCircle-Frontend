import React, { useState, useRef, useEffect } from "react";
import { Phone, Video, Send, Moon, Sun, Smile, Paperclip, MoreVertical, ArrowLeft, Info } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Chatsocket } from "../../Constants/Chatsocket";

const initialMessages = [];

export default function MessageSection() {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // const [friendsid,setFriendsid] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chat = useSelector((state) => state.CurrChatStore.currchat)
  const CID = chat?._id;
  console.log(CID)
  const loggedinUserId = useSelector((state) => state.UserStore.user)
  const LID = loggedinUserId._id
  const firstName = loggedinUserId?.firstName
  const img = "data:image/png;base64,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"
  const navigate = useNavigate();

  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const bubbleMe = "#FF0087";
  const bubbleOther = isDark ? "#1F1F1F" : "#FFF0F7";
  const inputBg = isDark ? "#1F1F1F" : "#FFF0F7";
  const accentColor = "#FF0087";
  console.log(firstName);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socket = Chatsocket();

  // console.log(loggedinUserId);
useEffect(() => {
  if (!loggedinUserId || !chat?._id) return;


  socket.emit("joinchat", LID, CID);

  socket.on("MessageReceived",({firstName,text }) => {
    console.log(firstName + " : " + text);

  const newMessage = {
    id: messages.length + 1, // or use timestamp for unique ID
    text:text ,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    sender: firstName === loggedinUserId.firstName ? "me" : "other", // mark sender
  };
  setMessages((prev) => [...prev, newMessage]);
  });
  return () => {
    socket.disconnect();
  };
}, [loggedinUserId, chat?._id]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    // const socket = Chatsocket();
    if (inputValue.trim()) {
      
      // setMessages([...messages, newMessage]);
      setInputValue("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);

          socket.emit("sendMessage",{firstName:loggedinUserId?.firstName ,LID ,CID,text : inputValue})  
    }
  };
  console.log(messages)

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
              <ArrowLeft
                onClick={() => navigate("/")}
                className="w-5 h-5" />
            </button>

            <div className="relative">
              <img
                src={chat?.photoURL || img}
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
                {chat?.firstName}
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
              className={`flex ${messages[index]?.sender === "me" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="max-w-[75%] md:max-w-[60%] lg:max-w-[50%] group">
                <div
                  className={`px-5 py-3 rounded-3xl text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${messages[index]?.sender === "me"
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
                  <p className="leading-relaxed font-medium">{messages[index]?.text}</p>
                </div>
                <div
                  className={`text-xs mt-1.5 font-semibold tracking-tight ${messages[index]?.sender === "me" ? "text-right" : "text-left"
                    }`}
                  style={{ color: textSub }}
                >
                  {messages?.time}
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