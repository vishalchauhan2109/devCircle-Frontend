import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { baseUrl } from "../Constants";
import axiosInstance from "../api/axiosInstance";

const PostCard = ({ post }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!post?.userId) return;
      
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(
          `/user/${post.userId}`
        );
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [post?.userId]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Add your like API call here
  };

  // Shimmer/Loading UI
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 mb-4 rounded-xl shadow-sm overflow-hidden animate-pulse">
        <div className="flex items-center gap-3 p-4">
          <div className="w-11 h-11 rounded-full bg-gray-200" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
        </div>
        <div className="h-64 bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="bg-white border  border-gray-200 mb-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={userProfile?.photoURL || "/default-avatar.png"}
            alt={`${userProfile?.firstName || "User"}'s avatar`}
            className="w-11 h-11 rounded-full object-cover border-2 border-gray-100"
            onError={(e) => {
              e.target.src = "/default-avatar.png";
            }}
          />
          
          <div>
            <h4 className="font-semibold text-gray-900 text-sm hover:underline cursor-pointer">
              {userProfile?.firstName} {userProfile?.lastName}
            </h4>
            <p className="text-xs text-gray-500">
              @{userProfile?.username || 
                `${userProfile?.firstName?.toLowerCase()}${userProfile?.lastName?.toLowerCase()}`}
            </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Caption */}
      {post?.caption && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
            {post.caption}
          </p>
        </div>
      )}

      {/* Image */}
      {post?.image && (
        <div className="w-full bg-gray-50">
          <img
            src={`${baseUrl}/${post.image}`}
            alt="Post content"
            className="w-full max-h-[600px] object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-all duration-200 group ${
              isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <Heart
              size={22}
              className={`${
                isLiked ? "fill-red-500" : "group-hover:scale-110"
              } transition-transform`}
            />
            <span className="text-sm font-medium">
              {post?.likes?.length || 0}
            </span>
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-all duration-200 group">
            <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">
              {post?.comments?.length || 0}
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default PostCard;