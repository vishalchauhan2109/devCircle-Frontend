import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendsCard from "./FriendsCard";
import { baseUrl } from "../../Constants";

const Friends = () => {
  const [friend, setFriend] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${baseUrl}/friends`, {
        withCredentials: true,
      });
      if (res.data.length > 0) {
        setFriend(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-80px)] overflow-y-scroll bg-[#001D3D] py-8 px-4">

      <h2 className="text-3xl font-bold text-[#FFC300] mb-6">
        Your Friends
      </h2>

      {friend.length === 0 ? (
        <p className="text-[#FFD60A] text-lg mt-10">No friends found!</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
          {friend.map((items, idx) => (
            items ? <FriendsCard key={idx} data={items} /> : null
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
