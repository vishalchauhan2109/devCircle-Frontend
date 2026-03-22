import axiosInstance from "../api/axiosInstance";
import React, { useState } from "react";
import { LoggedInUser } from "../Store/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { User, Mail, FileText, Camera, Upload, Check, Moon, Sun, Edit3, Sparkles } from "lucide-react";

export default function UserProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const dispatch = useDispatch();

  const accentColor = "#FF0087";
  const bg = isDark ? "#0A0A0A" : "#FFF5F9";
  const cardBg = isDark ? "#151515" : "#FFFFFF";
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub = isDark ? "#A0A0A0" : "#666666";
  const border = isDark ? "#252525" : "#FFE5F0";
  const inputBg = isDark ? "#1F1F1F" : "#FFF0F7";

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("about", about);
      if (photo) formData.append("photo", photo);

      const response = await axiosInstance.patch(`/profile/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(LoggedInUser(response.data.data));
      toast.success("Profile updated successfully!");
      setFirstName("");
      setLastName("");
      setAbout("");
      setPhoto(null);
      setPreview(null);
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-[calc(100vh-80px)] overflow-y-scroll w-full py-8 px-4 transition-colors duration-500 relative overflow-hidden" style={{ backgroundColor: bg }}>
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        ></div>
      </div>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3" style={{ color: textMain }}>
              <Edit3 className="w-8 h-8" style={{ color: accentColor }} />
              Edit Profile
            </h1>
            <p className="text-sm font-medium" style={{ color: textSub }}>
              Update your personal information
            </p>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
            style={{
              backgroundColor: isDark ? "#252525" : "#FFE5F0",
              color: textMain,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${accentColor}20` }}
            ></div>
            {isDark ? (
              <Sun className="w-6 h-6 relative z-10" />
            ) : (
              <Moon className="w-6 h-6 relative z-10" />
            )}
          </button>
        </div>

        {/* Form Card */}
        <div
          className="rounded-3xl shadow-2xl p-8 border-2 transition-all duration-500"
          style={{
            backgroundColor: cardBg,
            borderColor: border,
            boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.5)" : "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden border-4 transition-all duration-300 group-hover:scale-105"
                  style={{
                    borderColor: accentColor,
                    boxShadow: `0 8px 24px ${accentColor}40`,
                  }}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: inputBg }}
                    >
                      <User className="w-12 h-12" style={{ color: textSub }} />
                    </div>
                  )}
                </div>

                {/* Upload Button Overlay */}
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 p-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                  style={{
                    backgroundColor: accentColor,
                    boxShadow: `0 4px 12px ${accentColor}60`,
                  }}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-3 text-xs font-medium" style={{ color: textSub }}>
                Click the camera icon to upload
              </p>
            </div>

            {/* First Name Input */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: textMain }}>
                First Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: textSub }}
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-sm"
                  style={{
                    backgroundColor: inputBg,
                    borderColor: border,
                    color: textMain,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: textMain }}>
                Last Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  style={{ color: textSub }}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-sm"
                  style={{
                    backgroundColor: inputBg,
                    borderColor: border,
                    color: textMain,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            {/* About Textarea */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: textMain }}>
                About You
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-4 top-4 w-5 h-5"
                  style={{ color: textSub }}
                />
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="4"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 outline-none transition-all duration-300 font-medium text-sm resize-none"
                  style={{
                    backgroundColor: inputBg,
                    borderColor: border,
                    color: textMain,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = accentColor)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
                  placeholder="Tell us about yourself..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group text-base mt-6"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 8px 32px ${accentColor}60`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
                }}
              ></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Info Footer */}
          <div
            className="mt-8 p-4 rounded-2xl border-2 text-center"
            style={{
              backgroundColor: isDark ? "#1F1F1F" : "#FFF0F7",
              borderColor: border,
            }}
          >
            <p className="text-xs font-medium flex items-center justify-center gap-2" style={{ color: textSub }}>
              <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
              Your profile will be updated instantly
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        input::placeholder, textarea::placeholder {
          color: ${isDark ? "#666666" : "#999999"};
        }
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        textarea::-webkit-scrollbar-thumb {
          background: ${accentColor}60;
          border-radius: 10px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
          background: ${accentColor};
        }
      `}</style>
    </div>
  );
}