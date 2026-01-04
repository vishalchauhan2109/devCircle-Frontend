import React from "react";
import { useState } from "react";


export const Feed =()=>{
   const [posts, setPosts] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=10",
      image: "https://www.hindustantimes.com/ht-img/img/2025/12/03/550x309/CRICKET-IND-RSA-ODI-66_1764765000720_1764765073102.jpg",
      like: null,
      dislike: null,
    },
    {
      id: 2,
      user: "Alex Carter",
      avatar: "https://m.media-amazon.com/images/I/61Ko4M1uOJL._AC_UF894,1000_QL80_.jpg",
      image: "https://m.media-amazon.com/images/I/61Ko4M1uOJL._AC_UF894,1000_QL80_.jpg",
      like: null,
      dislike: null,
    },
  ]);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              disliked: post.liked ? post.disliked : false, // remove dislike if liked
            }
          : post
      )
    );
  };

  const toggleDislike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              disliked: !post.disliked,
              liked: post.disliked ? post.liked : false, // remove like if disliked
            }
          : post
      )
    );
  };

  return (
    <div className=" no-scrollbar overflow-y-scroll bg-neutral-900 text-white p-4 flex flex-col items-center gap-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-neutral-800 w-full max-w-lg rounded-xl shadow-md p-4"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.avatar}
              alt="user"
              className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">{post.user}</h3>
          </div>

          {/* Post Image */}
          <img
            src={post.image}
            alt="post"
            className="w-full rounded-lg object-cover"
          />

          {/* Like / Dislike */}
          <div className="flex items-center gap-6 mt-4">
            {/* Like Button */}
            <button
              onClick={() => toggleLike(post.id)}
              className={`text-xl ${
                post.liked ? "text-blue-500" : "text-neutral-400"
              }`}
            >
              👍 {post.like}
            </button>

            {/* Dislike Button */}
            <button
              onClick={() => toggleDislike(post.id)}
              className={`text-xl ${
                post.disliked ? "text-red-500" : "text-neutral-400"
              }`}
            >
              👎129k
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 