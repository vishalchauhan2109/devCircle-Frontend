import React, { useEffect, useState, useRef } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { baseUrl } from "../../Constants";

export const SuggestPeople = () => {
  const [people, setPeople] = useState([]);
  const [requestData, setRequestData] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const User = useSelector((state) => state.UserStore.user);
  const scrollRef = useRef(null);
  const requestRef = useRef(null);
  const isHovering = useRef(false);

  const fetchPeople = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/feed`, {
        withCredentials: true,
      });
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async (status, idx) => {
    try {
      const id = people[idx]._id;
      setLoadingIndex(idx);

      const { data } = await axios.post(
        `${baseUrl}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      setRequestData(data);
      setLoadingIndex(null);
    } catch (error) {
      console.log(error);
      setLoadingIndex(null);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, [requestData]);

  useEffect(() => {
    if (!scrollRef.current || people.length === 0) return;

    const container = scrollRef.current;

    const step = () => {
      if (container.scrollTop >= container.scrollHeight / 2) {
        container.scrollTop = 1;
      }
      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(requestRef.current);
  }, [people]);

  if (!User) return null;

  return (
    <div
      className="relative flex flex-col items-center
      h-[calc(100vh-80px)]
      bg-[#001D3D]
      p-4 overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-[#FFC300] mb-6">
        Suggested People
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        className="relative w-full h-full overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col gap-5 px-1">
          {[...people, ...people].map((user, idx) => (
            <div
              key={idx}
              className="bg-[#003566] rounded-2xl shadow-md
              p-4 transition-all duration-300
              hover:scale-[1.03] hover:shadow-xl"
            >
              <img
                src={user?.photoURL}
                alt={user?.firstName}
                className="w-full h-44 object-cover rounded-xl mb-3 border-2 border-[#FFC300]"
              />

              <h3 className="text-lg font-semibold text-[#FFD60A] leading-tight">
                {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}
              </h3>

              <p className="text-sm text-[#FFD60A] line-clamp-2 mt-1 opacity-80">
                {user?.about}
              </p>

              <div className="flex gap-2 mt-4">
                {/* SEND BUTTON */}
                <button
                  onClick={() => fetchRequests("interested", idx)}
                  className="flex-1  from-[#FFC300] to-[#FFD60A]
                  text-[#001D3D] text-sm py-2 rounded-xl
                  flex items-center justify-center gap-1
                  hover:opacity-90 transition font-semibold"
                >
                  {loadingIndex === idx ? (
                    <span className="loading loading-spinner text-[#001D3D]"></span>
                  ) : (
                    <>
                      SEND <IoPersonAddSharp />
                    </>
                  )}
                </button>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => fetchRequests("ignored", idx)}
                  className="flex-1 bg-[#FFD60A]/20 text-[#FFD60A]
                  text-sm py-2 rounded-xl
                  hover:bg-[#FFC300] hover:text-[#001D3D] transition font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
