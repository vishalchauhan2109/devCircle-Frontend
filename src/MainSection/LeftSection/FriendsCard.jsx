import React from "react";

const FriendsCard = (props) => {
  const { firstName, lastName, photoURL, about } = props?.data || {};

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-md bg-[#003566] p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all mb-4">
      
      {/* Image */}
      <img
        src={photoURL || "/default-avatar.png"}
        alt={firstName + " " + lastName}
        className="w-full sm:w-32 h-32 object-cover rounded-2xl sm:rounded-l-2xl mb-4 sm:mb-0"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between sm:pl-5">
        <div>
          <h3 className="text-xl font-bold text-[#FFC300]">
            {firstName?.toUpperCase() + " " + lastName?.toUpperCase()}
          </h3>

          <p className="text-sm text-[#FFD60A] mt-2 line-clamp-3">
            {about || "No bio available"}
          </p>
        </div>

        <button
          className="mt-4 self-start px-5 py-2 bg-gradient-to-r from-[#FFC300] to-[#FFD60A] text-[#001D3D] font-semibold rounded-xl hover:scale-105 transition-transform"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
