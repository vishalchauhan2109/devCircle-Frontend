import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../Var";
import { PenSquare, Sun, Moon, Sparkles, ImagePlus, X, Send } from "lucide-react";

const PostSection = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isDark, setIsDark] = useState(true); // Theme toggle — same default as SideBar, Feed, Profile, About, Friends, ConnectionRequest

  // ─── Color scheme matching SideBar & all other components ────────────────
  const accentColor = "#FF0087";
  const pageBg   = isDark ? "#0A0A0A" : "#F9F0F5";
  const cardBg   = isDark ? "#0F0F0F" : "#FFFFFF";  // matches sidebarBg
  const textMain = isDark ? "#FFFFFF" : "#0A0A0A";
  const textSub  = isDark ? "#A0A0A0" : "#666666";
  const border   = isDark ? "#252525" : "#FFE5F0";
  const hoverBg  = isDark ? "#1F1F1F" : "#FFF0F7";
  const inputBg  = isDark ? "#151515" : "#F9F0F5";  // textarea background
  // ─────────────────────────────────────────────────────────────────────────

  const User = useSelector((state) => state.UserStore.user);
  const id = User?._id;

  // IMAGE PREVIEW
  useEffect(() => {
    if (!image) return setPreview(null);
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  // CREATE POST
  const handlePost = async () => {
    if (!caption && !image) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (image) formData.append("image", image);

      const res = await axios.post(
        `${API_URL}/posts/createpost/${id}`,
        formData,
        { withCredentials: true }
      );
      console.log("POST CREATED:", res.data);

      // reset
      setCaption("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center w-full min-h-[calc(100vh-80px)] py-8 px-4 relative"
      style={{ backgroundColor: pageBg }}
    >
      {/* Ambient background blobs — same as all other components */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10 z-0">
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Float keyframes — same as SideBar */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%       { transform: translate(20px, -20px) rotate(3deg); }
          66%       { transform: translate(-15px, 15px) rotate(-3deg); }
        }
      `}</style>

      {/* ── Page Header — same card style as Feed, Friends, ConnectionRequest ── */}
      <div className="relative z-10 w-full max-w-xl mb-6">
        <div
          className="flex items-center justify-between px-5 py-4 rounded-2xl border-2"
          style={{ backgroundColor: hoverBg, borderColor: border }}
        >
          {/* Left — Title */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
                boxShadow: `0 4px 12px ${accentColor}60`,
              }}
            >
              <PenSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: textMain }}>
                Create a Post
              </p>
              <p className="text-xs flex items-center gap-1" style={{ color: textSub }}>
                <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
                Share with your network
              </p>
            </div>
          </div>

          {/* Right — Theme toggle — exact same as all other components */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="p-2.5 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden group"
            style={{
              backgroundColor: cardBg,
              border: `2px solid ${border}`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: `${accentColor}20` }}
            />
            {isDark ? (
              <Sun className="w-5 h-5 relative z-10" style={{ color: textMain }} />
            ) : (
              <Moon className="w-5 h-5 relative z-10" style={{ color: textMain }} />
            )}
          </button>
        </div>
      </div>

      {/* ── Post Card ── */}
      <div
        className="relative z-10 rounded-2xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-5 border-2"
        style={{ backgroundColor: cardBg, borderColor: border }}
      >
        {/* ── USER INFO ── */}
        <div className="flex items-center gap-3">
          <div
            className="rounded-full p-0.5 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
              boxShadow: `0 4px 12px ${accentColor}40`,
            }}
          >
            <img
              src={User.photoURL || "/default-avatar.png"}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: cardBg }}
            />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: textMain }}>
              {User.firstName + " " + User.lastName}
            </p>
            <span className="text-xs flex items-center gap-1" style={{ color: textSub }}>
              <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
              Public
            </span>
          </div>
        </div>

        {/* ── CAPTION textarea ── */}
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full resize-none outline-none rounded-xl p-4 min-h-[100px] text-sm border-2 transition-all duration-300"
          style={{
            backgroundColor: inputBg,
            color: textMain,
            borderColor: border,
            caretColor: accentColor,
          }}
          onFocus={(e) => (e.target.style.borderColor = accentColor)}
          onBlur={(e) => (e.target.style.borderColor = border)}
        />

        {/* ── IMAGE PREVIEW ── */}
        {preview && (
          <div className="relative rounded-2xl overflow-hidden border-2" style={{ borderColor: border }}>
            <img
              src={preview}
              alt="preview"
              className="max-h-72 object-cover w-full"
            />
            {/* Remove button overlaid on image */}
            <button
              onClick={() => { setPreview(null); setImage(null); }}
              className="absolute top-2 right-2 p-1.5 rounded-xl text-white transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: `${accentColor}CC` }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── ACTIONS — Photo upload ── */}
        <div className="flex justify-between items-center">
          {!preview && (
            <label
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: hoverBg,
                borderColor: border,
                color: textMain,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
            >
              <ImagePlus className="w-4 h-4" style={{ color: accentColor }} />
              Photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setImage(file);
                  e.target.value = null;
                }}
              />
            </label>
          )}
        </div>

        {/* ── POST BUTTON ── */}
        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group/btn"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #CC006D 100%)`,
            boxShadow: `0 4px 20px ${accentColor}50`,
          }}
        >
          {/* Shimmer hover — same as Profile, About, FriendsCard, ConnectionRequestCard */}
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-30 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
          />
          <Send className="w-4 h-4 relative z-10" />
          <span className="relative z-10">{loading ? "Posting..." : "Post"}</span>
        </button>
      </div>
    </div>
  );
};

export default PostSection;