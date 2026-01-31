import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendsCard from "./FriendsCard";
import { API_URL } from "../../Var";
import { baseUrl } from "../../Constants";
// import { User } from 'lucide-react'
// import { FriendsCard } from './FriendsCard'

const Friends = () => {
  const [friend, setFriend] = useState([]);

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${baseUrl}/friends`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.length > 0) {
        setFriend(res?.data);

      }
      } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  console.log(friend);
}, [friend]);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-6">
      
      {friend.map((items , idx) => {
       return items ? <FriendsCard  key={idx} data={items} /> : null;
      })}
    </div>
  );
};

export default Friends;
