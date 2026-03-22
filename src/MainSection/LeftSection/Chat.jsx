import React, { useEffect, useState } from "react";
import { Search, Edit, Moon, Sun, MoreVertical, Check, Camera, Video, Phone
} from "lucide-react";
import { Chatsocket } from "../../Constants/Chatsocket";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
// import { data } from "react-router-dom";
import { CurrChat } from "../../Store/CurrChatSlice";

export default function Chat() {
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatData , setChatData] = useState([]);

  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const searchBg = isDark ? "#1F1F1F" : "#FFF0F7";
  const hoverBg = isDark ? "#1A1A1A" : "#FFF5F9";
  const selectedBg = isDark ? "#252525" : "#FFE5F0";
  const accentColor = "#FF0087";
  const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX///+ZmZmXl5eUlJSenp6bm5v8/PySkpL5+fn29vahoaHY2NjV1dXr6+unp6f09PTHx8fe3t6xsbG4uLi3t7fo6OjNzc3BwcGqqqrExMTp6eni4uLQ0NBKbyQ4AAAJq0lEQVR4nO2dDZPiKBCGQ0NDjJqYRI2u8/9/54U47jqaD5o0iVPHc3VVu7NTwVcI3TTdkCSRSCQSiUQikUgkEolEIpFIJBKJRCKRSCSyEPrn3yyD//ob6RSkxW13bqo8QxQdqPKqOWxvhe5+5VfL1Ptdc1HSAgDiW6AAARLan6lLvd3/SoH3D70/V8JIaSWJe+/hoxfh+wdWJlbn/cqf14e0rLHtN+EAgjRYl+naH5lCejsK23fgohBtdwJIPN5+h0id7K/KwGNcOnXi/ZfBqGs3XH9Ot59F+8nKyvaeJ9JUpX3MByvcZd27595/b90ps91n6uss2049T5yeEoVUX7p74McpLZURMEPcP6Tari2mh1tu7LToZB8maI2lzE9rC3qhqN1sn7tKWW8+aZzuBK8+ixS7tWV9o5PiIgMobF2iy2ZtcfdhtHVyXXwAufsA26hrfwM/RWsd69UF7rMQI/SfRpkVK6prv94t8xT6DsjteotknRzkHP/FEXlI1rIbujYLCBTCrPUy6kouoa9FVqt4qZt8KYECTb6Cg7PJZq0hiBIXn1K17cGl5HWAWrgXFxyiD4nZoi5cmgMuN0bvyDxdsBMvS/dgJ7FaapzqJKArOiqxXkRfy8HQh+g9egOPv6BXNKf1bsJ3YruY2Xr2IEgJqJTq/iC8bI1cIH6jdSF9wk3SqHq7L9LWiU6L065WxucpIBfY4UgzQPJnM3h9/Wg2Mt79G+lhkIUdpvbp9FkGpfrq25FIv5QUtG8LIfRs076EhioQ4NpryNo3Wh+AFmFtvw8ZND6lkwKoK3qZD7w6nWgbIkCSSBBhPdQLdUnfjqrxN8euMUkPhSqkwB11jMrr+E6SttaV+syA43RDneG7AMSUle5CIYQHAwbywbWdR2mDFBonH6QhRnvgGEZhktyIhkK6vTE6qYAmUYbatslJE2k78jaJ22pgQ3Uh8jACqabQlM6PLomrMRPEP9WK6H64z+rtOCW+AEGcN6qlMO5Osk72lDmsHf+G32JondEECtqEdyQ+XfF34s7Q3hXKfNf6BCfiakp+sSvMSM4Vioy4HM+IvlvGLbCkTQUI1IDDgTRE2jXGjTmiURFdbkM1yidDMxhw4Y28FVT3GKlZeJpq9ZkDGlfqyv5CboK6MJMNnzydpMTwIQI92NAQFQKjwdB2niG+JWdyK2fqMJHuXuE0R3LrVHOlky9iG8i5iErJEW6P0C050Izk2WwYojFcSKEdplyvYk3dakIPp4o6SlnX+uQ9BvSZaeiZOcgl8A85CoxAN1ZUayEYjT55Hm8VUi2+Ti5kgULSR0o/FVCjiICKOs+R52tx90050PSmBZDDYSePBDkQPHPpnr4jinYAUVdPdIVIiJSMsfNQiEBfAfso5AjXaBuS9sCcSApPxieNk2l9Qd5v6iCuLjzTO1imGq282kaSsdp7JqqyrKAK39SLyvlNpEeEH8iCwTU9+aYHmZtzGyUxSPMADUc8ir5z/w04W/1UeWaLA0uCDS3M94x0Gqftrxy9s6nJZrcPD4/4b/tXp/YPBukpOnc8PPx3qJHSf6Cba3yW/tnGLGkL+ZyKCruRP5qpoD1WLs9w7JVS95xeJDYT43RmJifH9sXMXNnBjKGOIp9ZdIPzZxpytP1d47nv8As7dvVhdtkbzq9t81kd/vwMQma9VktvFUOuccqhcF4v2l6SeHjLvjyj4ajYmB8znd2Hd6TMm/LPphubaVE2+YxzCZ5hiAozKbR5k0YKleWZuh94wvRcFoVclQd4TzgC4e3C9MAQ2aelfy4NR1D4k/XxKPRb4ovvkgoQYKQZwJ6t1B035D9MFINCT7/U1o+gNJDXX6WtQngjTYtT+dXkaCT4vwkcfqnv2gKlzJrbdFJ2emv8XTeWtUVNbR27/yQ2T0Z+yPH4/vmpEX72A6bSyF2g73rZM2ay3hKLYfQu84mWsFRC0XefAajnBHWOuY+byhKnocXa7IwhD3QzbL+R9NDOObT0NpbcL2K8FMYXhOPsc1pkGDnipTqlGUQ4+DfV/n81pE7kiHlryr5Fa9fKmQl1pSA4wkxbpIRICuD8Db29cpbok1z2jibsH3JUlOtkk7kOGmTK2XfdF0LJVDK/yV0TB5j2gLXrak5x1c0VzgOVqUG3M0y6DUOmLKy9W62xY9nRNOdphe0CiDUZsnTyxdnyafYOe+wo/e1gH1cXhUyvYWLz2ibhSt55oF2WpWx5bUk93RhzXrmtE5oslIMjW/bldOEh8xi1TKcQMb756WQXktPYJtDTW9/IEkl8cBxtLFCR/G5CIWux7G1i/c0R8XpFT+xcIiHXw6G18RVUoPrx8bxoeoLnKKPpCpxJ88/o0dmUs2YmsXVPI24Nc1v/GM0ZNMwH8lcjjmKwQ2P+jCgkJJU5oQdLLpBlL32AkYgGY7FFx/DEhuB4coIPg8MU2WtIR1b6KDln7Z8MO1N2+mbuw3TYOoU7DK8YHKUhCvIHO5G95vgvw+8Gfz2+PfJIDUQWQp7cNLQtlOkQJngg0TRAZfyDoaQ3n9I4J/J+hZzRi1cGjFQeaPbu36MJdljMYJMYrsne6LcMefZWz7YQ8C6bfrLpc4WXVth+hnDnRPWd4IIQ8mzYzdtXGvpMusu7Ax5a4WuD3FG99xZXVxj4POHt20JxSYUY6oioZ94OH1hSIWD4k3a1ft3dg5B3iaWvfRjg9KQX9PsEHrQPX7fZiiXOg35NsMlUQH6s8rn2fCchn1Y5i799iGj49w560T9PkQh+SclDYPATdp8U6lXOZIdqwZsD0oVvRrDIfDGBtqLAPSOEBwTIF77hclmJ7Yy67OUPliJbbqCigGyFO0o3swoTaSw+RDu09i0xp4EC5WWtu8mWuecCTb3eTYgHSTzjmKyuXXEHyIIgsHW8t3mGRFjzTlJtD8YPq3Ddu/PuKuuAt8vhB9x/mAS7w7J9A+0I/QCF3T2kITSCuRTJp9wnu7MLVZa7gB/YerZuivkMgTrZdAEqvvextRHHD7hI9kH3Nd9YF1Sfd6dzd2tuV5s1ux9tTLS/gH997nerzxUIH3t/fBfe+MpmTqt3fZ+qsON2sY6cx7yKXcn+JeSOMhf7RknpUXEPRjULXDo2GzvEdHlE6pU0Eo+39PsJv4LUipQO1T22pFYaPJZrrOJnok/nCo0dsDDwWlrPUxpRnX/D4HzjPtb0ftdclDS2O59Vtn+TLerSbDt1698RPwtd3Lbnpsqz75srEVVe1YftrfjduvpIO9b+FAGw1RNvP/ktc2YkEolEIpFIJBKJRCKRSCQSiUQikUgk8v/hP/vLcMVCWNlbAAAAAElFTkSuQmCC"

  // console.log("user", user)
      const user = useSelector((state) => state.UserStore.user)

  const userId = user?._id

  // const filteredChats = chatData.filter((chat) =>
  //   chat?.data?.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const dispatch = useDispatch()


  const fetchData = async()=>{
    try {
      const data  = await axiosInstance.get(`/friends`)
      if(data){
        setChatData(data.data)
      }

    }
    catch(error){
      console.log("Error",error)
    }
  }

  useEffect(()=>{
    fetchData();

  },[])

  


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
          {
          chatData?.data?.length === 0 ? (
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
            chatData?.map((chat, index) => (
              <Link key={index} to="/chat">
              <div
                
                onClick={()=>dispatch(CurrChat(chatData[index]))}
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
                        src={(chatData[index]?.photoURL)? chatData[index]?.photoURL :img }
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
                        {chatData[index]?.firstName+" "+chatData[index]?.lastName }
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
             </Link>
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