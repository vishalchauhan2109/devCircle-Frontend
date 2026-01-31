import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard";
import axios from "axios";
import { User } from "lucide-react";
// import PostCard from "";

const Feed = () => {
  const [posts,setPosts] = useState([]);

const fetchApi = async()=>{
  try{

    // const data = await axios.get(,{withCredentials:true},{})
    // console.log(data.data)
    // setPosts(data.data)
  }catch{
    console.log("error found")
  }
}

useEffect(()=>{
  fetchApi()
},[])
  return (
    <div className="w-full text-neutral-300 scrollbar-hide   h-[calc(100vh-80px)] max-w-2xl overflow-y-scroll mx-auto flex flex-col gap-4">
      {posts?.newposts?.map((post,idx) => (
        <PostCard key={idx} user={posts} idx ={idx}  post={post} />
      ))}
    </div>
  );
};

export default Feed;
