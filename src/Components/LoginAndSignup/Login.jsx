// src/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../../Store/UserSlice";
import { baseUrl } from "../../Constants";
import { Link } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("rana@gmail.com");
  const [password, setPassword] = useState("Rana@kkr123");
  const [error, setError] = useState(null);
  const User = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(
        `${baseUrl}/Login`,
        { emailId: email, password },
        { withCredentials: true },
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
    if (User) navigate("/Home");
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center
                    bg-gradient-to-b from-[#0B2FD6] via-[#1E5BFF] to-[#FF8A3D]
                    px-4 sm:px-6"
    >
      <div
        className="w-full max-w-md sm:max-w-lg
                      bg-[#FFF6EA] rounded-3xl shadow-2xl
                      px-6 sm:px-10 py-8 sm:py-10"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold
                       text-center text-[#0B2FD6] mb-6"
        >
          Welcome Back User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border
                         focus:border-[#1E5BFF] text-neutral-700
                         focus:outline-none transition"
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
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl border
                         focus:border-[#1E5BFF] text-neutral-700
                         focus:outline-none transition"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r
                       from-[#0B2FD6] to-[#1E5BFF]
                       text-white font-semibold
                       py-2.5 sm:py-3 rounded-xl
                       hover:scale-[1.02]
                       transition-transform shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-neutral-600 text-sm">
          Don’t have an account?{" "}
          
          <span
            onClick={handleClick}
            className="cursor-pointer text-[#FF8A3D]
                       font-semibold hover:underline"
          >
            Sign up
          </span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
