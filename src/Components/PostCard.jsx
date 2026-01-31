import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { API_URL } from "../Var";

const PostCard = (props) => {
    const {idx} = props
    const{firstName,lastName} = props?.UserProfile[idx];
    
    // console.log(user)
    //   console.log(idx)

    const {post} = props
    console.log(post.image)
    // console.log(post)
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        {/* <img
          src=""
          alt="user"
          className="w-11 h-11 rounded-full object-cover border"
        /> */}

        <div>
          <h4 className="font-semibold text-gray-800 text-sm">
            {/* {UserProfile.data[idx]} */}
          </h4>
          <p className="text-2xl  text-gray-500">
            @{firstName +" "+ lastName }
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
          src={`${API_URL}${post.image}`}
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
