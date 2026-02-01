import React, { useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { API_URL } from "../Var";
import { baseUrl } from "../Constants";
import axios from "axios";

const PostCard = (props) => {
  const [userProfile,setUserProfile] = useState("")
  const {post} = props 
  // const {idx} = props

  const id = post.userId
      console.log(post.image)

  const profile = async ()=>{
    const user = await axios.get(`${baseUrl}/user/${id}`,{withCredentials:true},{})
     if(user){
    setUserProfile(user?.data)
    }
  }

  useEffect(()=>{
    profile()
    
  },[id])


  //shimmar ui to be add
  return (
    <div className="bg-white border border-gray-200 mb-2 rounded-xl shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={userProfile?.photoURL}
          alt="user"
          className="w-11 h-11 rounded-full object-cover border"
        />

        <div>
          <h4 className="font-semibold text-gray-800 text-sm">
            {/* {UserProfile.data[idx]} */}
          </h4>
          <p className="text-[18px] text-gray-900">
            @{userProfile.firstName +" "+ userProfile.lastName } 
          </p>
        </div>
      </div>

      {/* Caption */}
      {post?.caption && (
        <p className="px-4 pb-3 text-gray-800 text-sm leading-relaxed">
          {post.caption}
        </p>
      )}

      {/* Image */}
      {post?.image && (
        <img
          src={`${baseUrl}/${post.image}`}
          alt="post"
          className="w-full max-h-[500px] object-cover"
        />
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-t">
        <button className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition">
          <Heart size={20} />
          <span className="text-sm">{post?.likes?.length || 0}</span>
        </button>

        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition">
          <MessageCircle size={20} />
          <span className="text-sm">{post?.comments?.length || 0}</span>
        </button>
      </div>

    </div>
  );
};

export default PostCard;
