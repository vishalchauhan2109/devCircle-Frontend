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

  // ================= IMAGE PREVIEW =================
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // return () => URL.revokeObjectURL(revokeObjectURL);
  }, [image]);

  // ================= CREATE POST =================
  const handlePost = async () => {
    if (!caption && !image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);

      if (image) {
        formData.append("image", image);
      }
      //       for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

      console.log(formData);
      const res = await axios.post(
        `${API_URL}/posts/createpost/${id}`,
        formData,
        { withCredentials: true },
      );
      console.log(image);
      console.log(caption);
      console.log(formData);
      console.log("hii");

      console.log("POST CREATED:", res.data);

      // reset after success
      setCaption("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className=" flex-col overflow-y-scroll overflow-x-hidden text-neutral-600 bg-[#fff6ea] px-4 ">
      <div className="w-ful flex-col max-h-[calc(100vh)] overflow-y-scroll scrollbar-hide overflow-x-hidden scroll-smooth ml-35 flex items-center justify-center">
        <div className="text-neutral-800 text-2xl underline mb-10">
          Create Post
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xl">
        
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#bf2ef0] flex items-center justify-center text-white font-bold">
              <img className="w-10 h-10 rounded-full" src={User.photoURL} alt="image" />
            </div>
            <div>
              <p className="font-medium">{User.firstName +" " + User.lastName}</p>
              <span className="text-sm text-gray-500">Public</span>
            </div>
          </div>

          {/* CAPTION */}
          <textarea
            placeholder="What's on your mind?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full resize-none outline-none text-lg placeholder-gray-400 min-h-[90px] mb-3"
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="rounded-xl max-h-72 object-cover w-full mb-3"
            />
          )}

          {/* ACTION BAR */}
          <div className="flex justify-between items-center border rounded-xl px-4 py-2 mb-3">
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
            )}
          </div>

          {/* POST BUTTON */}
          <button
            onClick={handlePost}
            disabled={loading}
            className="w-full bg-[#bf2ef0] hover:bg-[#ed3ef7] transition text-white py-2.5 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostSection;
