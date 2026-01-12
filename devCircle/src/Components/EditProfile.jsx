import axios from "axios";
import React, { useState } from "react";

export default function UserProfileForm() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      formData.append("firstName", username);
      formData.append("about", about);
      if (photo) {
        formData.append("photoURL", photo);
      }

      const res = await axios.post(
        "http://localhost:2100/profile/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log("Profile Updated:", res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEEEC8]">
      <div className="w-full max-w-md p-6 bg-[#FFF6EA] text-slate-900 rounded-lg shadow-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-[#BF2EF0]">
          User Profile Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block font-medium mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-slate-700"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-[#BF2EF0]"
              />
            </div>
          )}

          {/* About */}
          <div>
            <label className="block font-medium mb-1">
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]"
              placeholder="Tell us about yourself"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ED3EF7] text-white font-semibold py-2 rounded-md hover:bg-[#BF2EF0] transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}
