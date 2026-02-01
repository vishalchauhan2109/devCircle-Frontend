// src/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Email:", email, "Age:", age, "Password:", password);
    navigate("/devcircle/MainSection");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-b from-[#0B2FD6] via-[#1E5BFF] to-[#FF8A3D]
                    px-4 sm:px-6">

      <div className="w-full max-w-md sm:max-w-lg
                      bg-[#FFF6EA] rounded-3xl shadow-2xl
                      p-6 sm:p-10">

        <h2 className="text-2xl sm:text-3xl font-bold
                       text-[#0B2FD6] text-center mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3
                         text-neutral-800 border border-neutral-300
                         rounded-2xl focus:outline-none
                         focus:border-[#1E5BFF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3
                         text-neutral-800 border border-neutral-300
                         rounded-2xl focus:outline-none
                         focus:border-[#1E5BFF]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3
                         text-neutral-800 border border-neutral-300
                         rounded-2xl focus:outline-none
                         focus:border-[#1E5BFF]"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3
                         text-neutral-800 border border-neutral-300
                         rounded-2xl focus:outline-none
                         focus:border-[#1E5BFF]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r
                       from-[#0B2FD6] to-[#1E5BFF]
                       hover:from-[#0A26B8] hover:to-[#164AE0]
                       text-white font-semibold
                       py-2.5 sm:py-3 rounded-2xl
                       transition-all shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <Link to="/">
          <div className="mt-6 text-center text-neutral-600 text-sm">
            Already have an account?{" "}
            <p className="text-[#FF8A3D] font-semibold hover:underline">
              Login
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Signup;
