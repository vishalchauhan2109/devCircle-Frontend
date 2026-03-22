// src/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../../Store/UserSlice";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
// import { LoggedInUser } from "../../Store/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("rana@gmail.com");
  const [password, setPassword] = useState("Rana@kkr123");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const User = useSelector((state) => state.UserStore.user);

  console.log("User from Redux:", User);

  const accentColor = "#FF0087";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(
        `/Login`,
        { emailId: email, password }
      );
      console.log("Login response:", res.data.user);
      dispatch(LoggedInUser(res.data.user));
      navigate("/Home");
    } catch (err) {
      setError(err?.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    navigate("/Signup");
  };

  useEffect(() => {
    if (User) 
      {
        navigate("/Home")
      };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden transition-all duration-500"
      style={{
        background:
          "linear-gradient(135deg, #0A0A0A 0%, #1a0a14 50%, #0A0A0A 100%)",
      }}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor}60 0%, transparent 70%)`,
            animation: "float 15s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite reverse",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "pulse 8s ease-in-out infinite",
          }}
        ></div>
      </div>

      <div
        className="w-full max-w-md relative z-10 backdrop-blur-xl border-2 shadow-2xl transition-all duration-500"
        style={{
          backgroundColor: "#151515E6",
          borderColor: "#252525",
          borderRadius: "32px",
        }}
      >
        {/* Decorative Header */}
        <div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            boxShadow: `0 8px 32px ${accentColor}60`,
          }}
        >
          <Sparkles className="w-12 h-12 text-white animate-pulse" />
        </div>

        <div className="px-8 sm:px-10 py-10 sm:py-12 pt-16">
          {/* Title */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl sm:text-4xl font-black tracking-tight mb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, #FFFFFF 0%, ${accentColor} 100%)`,
              }}
            >
              Welcome Back
            </h2>
            <p className="text-sm font-medium" style={{ color: "#A0A0A0" }}>
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#A0A0A0" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-sm"
                  style={{
                    backgroundColor: "#1F1F1F",
                    borderColor: "#2A2A2A",
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#FFFFFF" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: "#A0A0A0" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-sm"
                  style={{
                    backgroundColor: "#1F1F1F",
                    borderColor: "#2A2A2A",
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 hover:scale-110"
                  style={{ color: "#A0A0A0" }}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm font-semibold hover:underline transition-colors duration-200"
                style={{ color: accentColor }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-4 rounded-2xl border-2 animate-shake"
                style={{
                  backgroundColor: "#2A1515",
                  borderColor: "#FF4444",
                }}
              >
                <p
                  className="text-sm font-semibold text-center"
                  style={{ color: "#FF6666" }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group text-base"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 8px 32px ${accentColor}60`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                }}
              ></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm font-medium" style={{ color: "#A0A0A0" }}>
              Don't have an account?{" "}
              <span
                onClick={handleClick}
                className="font-bold cursor-pointer hover:underline transition-all duration-200 inline-flex items-center gap-1"
                style={{ color: accentColor }}
              >
                Create Account
                <ArrowRight className="w-4 h-4" />
              </span>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#252525" }}
            ></div>
            <span
              className="text-xs font-semibold"
              style={{ color: "#666666" }}
            >
              OR CONTINUE WITH
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#252525" }}
            ></div>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="py-3 rounded-2xl border-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#1F1F1F",
                borderColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="py-3 rounded-2xl border-2 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#1F1F1F",
                borderColor: "#2A2A2A",
                color: "#FFFFFF",
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        input::placeholder {
          color: #666666;
        }
      `}</style>
    </div>
  );
};

export default Login;
