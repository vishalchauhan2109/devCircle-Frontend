import React, { useEffect, useState } from "react";
import axios from "axios";

const PostSection = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // image preview
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handlePost = async () => {
    if (!caption && !image) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("image", image);

      await axios.post(
        "http://localhost:2100/posts/createpost",
        formData,
        { withCredentials: true }
      );

      setCaption("");
      setImage(null);
      setPreview(null);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[calc(100vh-80px)] bg-[#fff6ea] px-4 py-6">

      <div className="text-neutral-800 text-2xl underline mb-4">
        Create Post
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 max-w-xl">

        {/* User Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#bf2ef0] flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="font-medium">You</p>
            <span className="text-sm text-gray-500">Public</span>
          </div>
        </div>

        {/* Caption */}
        <textarea
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full resize-none outline-none text-lg placeholder-gray-400 min-h-[90px] mb-3"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="rounded-xl max-h-72 object-cover w-full mb-3"
          />
        )}

        {/* Actions */}
        <div className="flex justify-between items-center border rounded-xl px-4 py-2 mb-3">
          <span className="text-sm font-medium">Add to your post</span>

          <label className="cursor-pointer text-[#ed3ef7] font-semibold">
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
        </div>

        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full bg-[#bf2ef0] hover:bg-[#ed3ef7] transition text-white py-2.5 rounded-xl font-semibold disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostSection;