import axios from "axios";
import React, { useState } from "react";
import { LoggedInUser } from "../Store/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { API_URL } from "../Var";
import { baseUrl } from "../Constants";

export default function UserProfileForm() {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

      if (photo) ("photoURL", photo);

      let response = await axios.patch(`${baseUrl}/profile/edit`, {
        "firstName": username,
        "about": about,
        // "photoURL": photo,
      }, {
        headers: {
          "firstName": username,
          "about": about,
          // "photoURL":photoURL
        },
        withCredentials: true,
      });

      let user = response?.data?.data;

      console.log(user);
      

      dispatch(LoggedInUser(user));
      setUsername("");
      setAbout("")
      // alert(response);
      toast.success("Useer Updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("error" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-[#FEEEC8] relative">

      {/* IMPORTANT FIX */}
      <div className="w-full max-w-md p-6 bg-[#FFF6EA] text-slate-900
                      rounded-lg shadow-lg
                      relative z-10 pointer-events-auto">

        <h2 className="text-2xl font-bold text-center mb-6 text-[#BF2EF0]">
          User Profile Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-400 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]
                         pointer-events-auto"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-slate-700 pointer-events-auto"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-full
                           border-2 border-[#BF2EF0]"
              />
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-slate-400 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-[#ED3EF7]
                         pointer-events-auto"
              placeholder="Tell us about yourself"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ED3EF7] text-white font-semibold py-2
                       rounded-md hover:bg-[#BF2EF0] transition
                       disabled:opacity-60 pointer-events-auto"
          >
            {loading ? "Saving..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}
