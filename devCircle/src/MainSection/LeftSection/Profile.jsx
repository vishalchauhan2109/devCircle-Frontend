
import React from "react";
import {  useSelector } from "react-redux";
import { LoggedInUser } from "../../Store/UserSlice";


const Profile = () => {



  const User = useSelector((state) => state.user)
  console.log(User)


  return (
    <div className="w-[50%] flex flex-col items-center text-white bg-neutral-900  p-4">

      {/* Profile Picture */}
      <div className="mt-8">
        <img
          src={User?.photoURL}
          alt="profile"
          className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-neutral-700"
        />
      </div>

      {/* Name */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4">
        {User?.firstName + " " + User?.lastName}
      </h1>

      {/* Bio */}
      <p className="text-neutral-400 text-sm sm:text-base md:text-lg mt-2 text-center px-4 max-w-md">{User?.about}</p>

      {/* Stats */}
      <div className="flex gap-8 sm:gap-12 mt-6">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold">120</span>
          <span className="text-neutral-400 text-sm sm:text-base">Posts</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold">10.5k</span>
          <span className="text-neutral-400 text-sm sm:text-base">
            Followers
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold">890</span>
          <span className="text-neutral-400 text-sm sm:text-base">
            Following
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-sm sm:text-base">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
