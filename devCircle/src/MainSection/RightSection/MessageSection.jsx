import React, { useState } from "react";
import { IoSend, IoHappyOutline, IoPersonCircle, IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";


export const MessageSection = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  console.log(message)
  const handleSend = () => {
    if (message.trim() === "") return;
    setChat([...chat, { text: message, type: "sent" }]);
    setMessage("");
  }
  const User = useSelector((state) => state.user)
  console.log(User)



  // if(!User) 
    return (
    
    <div className="flex flex-col h-auto mt-6 mb-2 w-[30%]
     bg-base-100 text-white  rounded-2xl"></div>
  ) 
  
  // return (
  //   <div className="flex flex-col  h-auto mt-6 mb-2 w-[30%]
  //    bg-base-100 text-white  rounded-2xl">
      

  //     <div className="flex items-center gap-3 p-4 border-b border-gray-700">
  //       <IoChevronBack size={24} className="cursor-pointer" />
  //       <IoPersonCircle size={36} />
  //       <div>
  //         <p className="font-semibold">John Doe</p>
  //         <p className="text-xs text-gray-300">Active now</p>
  //       </div>
  //     </div>

   

  //     <div className="flex-1  .no-scrollbar no-scrollbar p-4 ">
  //       {chat.map((msg, index) => (
  //         <div
  //           key={index}
  //           className={`max-w-[70%] px-4 py-2 rounded-lg ${
  //             msg.type === "sent"
  //               ? "self-end w-full bg-blue-500 text-white"
  //               : "self-start bg-gray-700 text-white"
  //           }`}
  //         >
  //           {msg.text}
  //         </div>
  //       ))}
  //     </div>

     
  //     <div className="flex items-center gap-3 p-3 border-t border-gray-700">

  //       <input
  //         type="text"
  //         className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none"
  //         placeholder="Message..."
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //         onKeyDown={(e) => e.key === "Enter" && handleSend()}
  //       />

  //       < IoSend
  //         size={24}
  //         className="cursor-pointer text-blue-400"
  //         onClick={handleSend}
  //       />
  //     </div>
  //   </div>
  // );
};

