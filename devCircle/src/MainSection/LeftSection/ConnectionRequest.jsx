import React, { useEffect, useState } from "react";
import axios from "axios";
import ConnectionRequestCard from "./ConnectionRequestCard";
import { API_URL } from "../../Var";
// import { VITE_API_URL } from "../../Var";
// import { useParams } from "react-router-dom";

const ConnectionRequest = () => {

  const [request, setRequest] = useState([]);
  const [load, setLoad] = useState("")


  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/incomingRequest`,
        { withCredentials: true }
      );

      if (res?.data) {
        setRequest(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [load]);

  useEffect(() => {
    console.log(request);
  }, [request]);

  return (
    <div className="max-h-[calc(100vh-80px) flex-col items-center justify-center   bg-[#fff6ea] px-4 py-6">

      <div className="text-neutral-800 text-2xl  underline mb-4  ">
        Connection Requests
      </div>

      <div className="max-h-[calc(100vh-180px)] relative overflow-y-auto">

        {
          (request === "No request found")?
          "":
          request.map((item, idx) => (
            item?
            <ConnectionRequestCard key={idx}  setLoad={setLoad} request={item} />
            : null
          ))
        }
      </div>
    </div>
  );
};

export default ConnectionRequest;
