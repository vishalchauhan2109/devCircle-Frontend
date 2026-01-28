import React from "react";

const FriendsCard = (props) => {
  const { firstName, lastName, photoURL, about } = props?.data || {};

  return (
    <div className="flex w-full max-w-xl bg-[#fff6ea] dark:bg-gray-900  p-5 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition mb-4">
      
      {/* Image */}
      <img
        src={photoURL || "/default-avatar.png"}
        alt={firstName + " " + lastName}
        className="w-32 h-32 object-cover rounded-l-xl"
      />

      {/* Content */}
      <div className="flex-1 p-4 pl-30 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
            {firstName + " " + lastName}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-gray-400 mt-1">
            {about || "No bio available"}
          </p>
        </div>

        <button
          className="mt-2 self-start px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FriendsCard;
