import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_URL } from "../../Var";

const PostSection = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const User = useSelector((state) => state.user);
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
    <div className="flex flex-col items-center w-full min-h-[calc(100vh-80px)] bg-[#001D3D] py-8 px-4">
      
      <h2 className="text-3xl font-bold text-[#FFC300] mb-6 underline">
        Create a Post
      </h2>

      <div className="bg-[#003566] rounded-2xl shadow-lg p-6 w-full max-w-xl flex flex-col gap-4">
        
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <img
            src={User.photoURL || "/default-avatar.png"}
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-[#FFD60A] object-cover"
          />
          <div>
            <p className="text-[#FFC300] font-semibold">
              {User.firstName + " " + User.lastName}
            </p>
            <span className="text-[#FFD60A] text-sm">Public</span>
          </div>
        </div>

        {/* CAPTION */}
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full resize-none outline-none text-[#FFC300] placeholder-[#FFD60A] bg-[#001D3D] rounded-xl p-3 min-h-[90px]"
        />

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="rounded-2xl max-h-72 object-cover w-full border-2 border-[#FFD60A]"
          />
        )}

        {/* ACTIONS */}
        <div className="flex justify-between items-center">
          {preview ? (
            <button
              onClick={() => {
                setPreview(null);
                setImage(null);
              }}
              className="text-red-500 font-semibold"
            >
              Remove
            </button>
          ) : (
            <label className="cursor-pointer text-[#FFC300] font-semibold">
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

        {/* POST BUTTON */}
        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#FFC300] to-[#FFD60A] text-[#001D3D] font-bold py-2.5 rounded-xl hover:scale-105 transition-transform disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostSection;
