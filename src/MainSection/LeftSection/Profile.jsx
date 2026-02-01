import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const User = useSelector((state) => state.user);

  return (
    <div className="flex justify-center w-full h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] bg-[#001D3D] overflow-y-auto px-4 py-6">
      <div className="w-full max-w-xl text-[#FFC300] bg-[#003566] rounded-2xl p-6 sm:p-8 shadow-lg my-6">
        
        {/* PROFILE IMAGE */}
        <div className="flex justify-center mt-4">
          <img
            src={User?.photoURL || "https://via.placeholder.com/300"}
            alt="profile"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#FFD60A]"
          />
        </div>

        {/* NAME */}
        <h1 className="text-center text-2xl sm:text-3xl font-bold mt-4 text-[#FFC300]">
          {User?.firstName} {User?.lastName}
        </h1>

        {/* BIO */}
        <p className="text-[#FFD60A] text-sm sm:text-base mt-3 text-center">
          {User?.about || "No bio available"}
        </p>

        {/* STATS */}
        <div className="flex justify-center gap-10 mt-6 text-[#FFC300]">
          <div className="text-center">
            <span className="text-xl font-bold">120</span>
            <p className="text-[#FFD60A] text-sm">Posts</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">10.5k</span>
            <p className="text-[#FFD60A] text-sm">Followers</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">890</span>
            <p className="text-[#FFD60A] text-sm">Following</p>
          </div>
        </div>

        {/* EDIT PROFILE BUTTON */}
        <div className="flex justify-center mt-6">
          <Link to="/EditProfile">
            <button className="relative z-50 px-6 py-2 cursor-pointer bg-gradient-to-r from-[#FFC300] to-[#FFD60A] text-[#001D3D] font-bold rounded-lg sm:text-base hover:scale-105 transition-transform">
              Edit Profile
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Profile;
