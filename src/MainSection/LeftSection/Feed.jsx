import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard";
import axios from "axios";
import { baseUrl } from "../../Constants";
import { useSelector } from "react-redux";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const User = useSelector((state) => state.user);

  const fetchApi = async () => {
    if (!User) return;
    try {
      const { _id } = User;
      console.log(_id);
      const res = await axios.get(`${baseUrl}/HomeFeed/${_id}`, {
        withCredentials: true,
      });
            console.log(res);

      setPosts(res.data);
    } catch (error) {
      console.log("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [User]);

  return (
    <div className="flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-hide items-center w-full  h-[calc(100vh-80px)] bg-[#001D3D]">
      {posts.length === 0 ? (
        <p className="text-[#FFD60A] text-lg mt-10">No posts found!</p>
      ) : (
        <div className="flex flex-col w-full max-w-2xl">
          {posts.map((post, idx) => (
            <PostCard key={idx} idx={idx} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
