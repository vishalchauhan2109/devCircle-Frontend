import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const User = useSelector((state) => state.user);

  return (
    <div className="flex justify-center w-full h-[calc(100vh-80px)] min-h-[calc(100vh-80px)]
 bg-[#FEEEC8] overflow-y-auto">
      <div className="w-full max-w-xl text-neutral-900 bg-[#FFF6EA] rounded-2xl p-6 sm:p-8 shadow-lg my-6">

        <div className="flex justify-center mt-4">
          <img
            src={User?.photoURL || "https://via.placeholder.com/300"}
            alt="profile"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-neutral-700"
          />
        </div>

        <h1 className="text-center text-2xl sm:text-3xl font-bold mt-4">
          {User?.firstName} {User?.lastName}
        </h1>

        <p className="text-neutral-400 text-sm sm:text-base mt-3 text-center">
          {User?.about || "No bio available"}
        </p>

        <div className="flex justify-center gap-10 mt-6">
          <div className="text-center">
            <span className="text-xl font-bold">120</span>
            <p className="text-neutral-400 text-sm">Posts</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">10.5k</span>
            <p className="text-neutral-400 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">890</span>
            <p className="text-neutral-400 text-sm">Following</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link to="/EditProfile">
<button
  className="relative z-50 px-6 py-2 bg-blue-600 hover:bg-[#BF2EF0] transition rounded-lg sm:text-base"
>
              Edit Profile
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Profile;
