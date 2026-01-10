import axios from "axios";
import React, { useState } from "react";
import { About } from "../MainSection/LeftSection/About";

export default function UserProfileForm() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = async()=>{
    const res = await axios.post("http://localhost:2100/profile/edit",
            {
                firstName : username,
                photoURl : photo,
                about : about
            }
        )
        console.log(res)
    }
    sendData()
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-sky-200 text-slate-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
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
            className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Profile Photo Upload */}
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
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border border-slate-500"
            />
          </div>
        )}

        {/* About Field */}
        <div>
          <label className="block font-medium mb-1">
            About
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-slate-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tell us about yourself"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
