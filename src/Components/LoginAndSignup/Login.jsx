// src/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../../Store/UserSlice";
// import { API_URL } from "../../Var";
import { baseUrl } from "../../Constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const User = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(`${baseUrl}/Login`,
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

  const handleClick = () => {
    navigate("/Signup");
  };

  useEffect(() => {
    if (User) {
      navigate("/Home");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-[#BF2EF0] via-[#ED3EF7] to-[#FEECB3] px-4">

      <div className="w-full max-w-md bg-[#FFF6EA] rounded-3xl shadow-2xl
                      px-10 py-8 animate-[fadeIn_0.8s_ease-in-out]">

        <h2 className="text-3xl font-bold text-center text-[#BF2EF0] mb-6">
          Welcome Back User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border
                         focus:border-[#BF2EF0] text-neutral-500 focus:outline-none
                         transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border
                         focus:border-[#BF2EF0] text-neutral-500 focus:outline-none
                         transition"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            // onClick={()=>console.log("hii")}  
            className="w-full bg-gradient-to-r from-[#BF2EF0] to-[#ED3EF7]
                       text-white font-semibold py-3 rounded-xl
                       hover:scale-105 transition-transform shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-neutral-600 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={handleClick}
            className="cursor-pointer text-[#BF2EF0] font-semibold hover:underline"
          >
            Sign up
          </span>
        </div>
      </div>

    </div>
  );
};

export default Login;
