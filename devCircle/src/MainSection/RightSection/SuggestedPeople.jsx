import React, { useEffect, useState, useRef } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

export const SuggestPeople = () => {
  const [people, setPeople] = useState([]);
  const User = useSelector((state) => state.user);
  const scrollRef = useRef(null);
  const scrollSpeed = 4; 
  const requestRef = useRef();
  const isHovering = useRef(false); // Track hover state without re-rendering

  const UserUrl = "data:image/png;base64,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";

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data } = await axios.get("http://localhost:2100/feed", {
          withCredentials: true,
        });
        setPeople(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPeople();
  }, []);

  useEffect(() => {
    if (!scrollRef.current || people.length === 0) return;
    const container = scrollRef.current;

    const step = () => {
      if (!isHovering.current) {
        container.scrollTop += scrollSpeed;
      }

      // Seamless Jump Logic
      // scrollHeight / 2 represents the end of the first 'people' set.
      if (container.scrollTop >= container.scrollHeight / 2) {
        container.scrollTop = 1; // Reset to top
      } else if (container.scrollTop <= 0) {
        container.scrollTop = container.scrollHeight / 2 - 1; // Reset to middle if scrolling up manually
      }

      requestRef.current = requestAnimationFrame(step);
    };

    requestRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(requestRef.current);
  }, [people]);

  if (!User) return null;

  return (
    <div className="relative flex flex-col items-center  h-[calc(100vh-80px)]  bg-emerald-50 p-6 overflow-hidden">
      <h2 className="text-3xl text-emerald-900 font-semibold mb-8 underline">
        Suggested People
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={() => { isHovering.current = true; }}
        onMouseLeave={() => { isHovering.current = false; }}
        className="relative h-full w-full overflow-y-auto scrollbar-hide"
      >
        <div className="flex flex-col space-y-6">
          {/* Duplicate list for the loop */}
          {[...people, ...people].map((user, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white rounded-2xl shadow-lg p-6 space-y-3 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="w-full h-60 object-cover rounded-xl"
                src={user?.photoURL || UserUrl}
                alt={user.firstName}
              />
              <h3 className="text-xl font-bold text-emerald-900">
                {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
              </h3>
              <p className="text-gray-700 text-sm">{user?.about}</p>
              <div className="flex space-x-3 mt-2">
                <button className="flex-1 btn btn-primary flex items-center justify-center gap-1">
                  SEND REQUEST <IoPersonAddSharp />
                </button>
                <button className="flex-1 btn btn-secondary">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};