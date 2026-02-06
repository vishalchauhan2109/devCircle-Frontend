import axios from "axios";
import React from "react";
import { baseUrl } from "../../Constants";

const ConnectionRequestCard = ({ request, setLoad }) => {
  const { firstName, lastName, photoURL, _id } = request;

  const Resrequest = async (status, fromUserId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/request/review/${status}/${fromUserId}`,
        {},
        { withCredentials: true }
      );
      setLoad(res); // trigger reload
    } catch (error) {
      console.log("Error responding to request:", error);
    }
  };

  return (
    <div className="w-full bg-[#002855]  rounded-xl p-4 shadow-md border border-[#003566]">

      {/* top */}
      <div className="flex items-center gap-4">

        {/* avatar */}
        <img
          src={
            photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="profile"
          className="w-14 h-14 rounded-full border-2 border-[#FFD60A] object-cover"
        />

        {/* info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#FFD60A]">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-[#E0E0E0]/70">
            wants to connect with you
          </p>
        </div>
      </div>

      {/* buttons */}
      <div className="flex gap-3 mt-4">

        {/* reject */}
        <button
          onClick={() => Resrequest("rejected", _id)}
          className="flex-1 py-2 rounded-lg border border-red-400
          text-red-400 font-medium
          hover:bg-red-400/10 transition"
        >
          Reject
        </button>

        {/* accept */}
        <button
          onClick={() => Resrequest("accepted", _id)}
          className="flex-1 py-2 rounded-lg
          bg-[#FFD60A]
          text-[#001D3D] font-semibold
          hover:opacity-90 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;
