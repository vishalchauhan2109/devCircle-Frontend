import axios from "axios";
import React, { useState } from "react";
import { LoggedInUser } from "../Store/UserSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "../Constants";

export default function UserProfileForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("about", about);
      if (photo) formData.append("photo", photo);

      const response = await axios.patch(`${baseUrl}/profile/edit`, formData, {
        withCredentials: true,
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#001D3D] px-4 py-6">
      <div className="w-full max-w-md bg-[#003566] text-[#FFC300] rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 underline">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* FIRST NAME */}
          <div>
            <label className="block mb-1 font-medium text-[#FFD60A]">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#001D3D] text-[#FFC300] border border-[#FFD60A] focus:outline-none focus:ring-2 focus:ring-[#FFC300]"
            />
          </div>

          {/* LAST NAME */}
          <div>
            <label className="block mb-1 font-medium text-[#FFD60A]">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#001D3D] text-[#FFC300] border border-[#FFD60A] focus:outline-none focus:ring-2 focus:ring-[#FFC300]"
            />
          </div>

          {/* PROFILE PHOTO */}
          <div>
            <label className="block mb-1 font-medium text-[#FFD60A]">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-[#FFC300]"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-[#FFD60A] my-2"
              />
            </div>
          )}

          {/* ABOUT */}
          <div>
            <label className="block mb-1 font-medium text-[#FFD60A]">
              About
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
              placeholder="Tell us about yourself"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-[#001D3D] text-[#FFC300] border border-[#FFD60A] focus:outline-none focus:ring-2 focus:ring-[#FFC300]"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FFC300] to-[#FFD60A] text-[#001D3D] font-bold py-2.5 rounded-xl hover:scale-105 transition-transform disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
