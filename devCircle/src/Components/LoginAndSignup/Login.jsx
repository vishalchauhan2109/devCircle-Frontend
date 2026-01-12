// src/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../../Store/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("rishabh@gmail.com");
  const [password, setPassword] = useState("Rishabh@171717");
  const [error, setError] = useState(null);
  const User = useSelector((state) => state.user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:2100/Login",
        {
          emailId: email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(LoggedInUser(res.data));
      navigate("/Home");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    }

  };

  useEffect(()=>{
    if(User){
    navigate("/Home")
  }
  },[])
  


return (


  <div className="h-screen flex items-center justify-center text-[#ED3EF7] bg-[#FFF6EA] px-4">
    <div className="w-full max-w-xl h-100 bg-white rounded-3xl shadow-xl px-10 py-5">

      <h2 className="text-2xl font-bold text-[#BF2EF0] text-center mb-3">
        Welcome Back 🌸
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]/40"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]/40"
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#ED3EF7] hover:bg-[#BF2EF0] text-white font-semibold py-2.5 rounded-xl transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center text-gray-600 text-sm">
        Don’t have an account?{" "}
        <Link
          to="/Signup"
          className="text-[#BF2EF0] font-medium hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  </div>
);

}
export default Login;
