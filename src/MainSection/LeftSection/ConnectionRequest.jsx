import React, { useEffect, useState } from "react";
import axios from "axios";
import ConnectionRequestCard from "./ConnectionRequestCard";
import { baseUrl } from "../../Constants";

const ConnectionRequest = () => {
  const [requests, setRequests] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${baseUrl}/incomingRequest`, {
        withCredentials: true,
      });

      if (res?.data && res.data !== "No request found") {
        setRequests(res.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [reload]);

  return (
    <div className="flex flex-col overflow-y-scroll overflow-x-hidden scrollbar-hide items-center w-full h-[calc(100vh-80px)] bg-[#001D3D]">

      {/* Heading */}
      <h2 className="text-[#FFD60A] text-2xl font-semibold my-6">
        Connection Requests
      </h2>

      {/* Content */}
      {requests.length === 0 ? (
        <p className="text-[#FFD60A] text-lg mt-10">
          No connection requests found!
        </p>
      ) : (
        <div className="flex flex-col w-full max-w-2xl gap-4 px-2 pb-6">
          {requests.map((item, idx) =>
            item ? (
              <ConnectionRequestCard
                key={idx}
                request={item}
                setLoad={setReload}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;
