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
    // TODO: signup / validation logic
    console.log("Username:", username, "Email:", email, "Age:", age, "Password:", password);
    // agar signup successful ho:
    navigate("/devcircle/MainSection"); // apna route adjust karein
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-500 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-neutral-600 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full text-neutral-800 px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full text-neutral-800 px-4 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full px-4 text-neutral-800 py-3 border border-neutral-300 rounded-2xl focus:outline-none focus:border-amber-500"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-neutral-800 border border-neutral-300 rounded-2xl focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-2xl transition-colors"
          >
            Sign Up
          </button>
        </form>
        <Link to="/">
        <div className="mt-6 text-center text-neutral-600 text-sm">
          Already have an account?{" "}
          <p href="#" className="text-amber-700 hover:underline">Login</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
