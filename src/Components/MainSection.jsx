import React, { useEffect, useState } from "react";
import { SideBar } from "../MainSection/LeftSection/SideBar";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../Store/UserSlice";
import { useNavigate } from "react-router-dom";
import Login from "./LoginAndSignup/Login";
import { SuggestPeople } from "../MainSection/RightSection/SuggestedPeople";
import axios from "axios";
import { baseUrl } from "../Constants";

export const MainSection = () => {
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/Profile/view`, {
        withCredentials: true,
      });
      dispatch(LoggedInUser(res.data));
    } catch (error) {
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!User) {
      fetchLoggedInUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-[#FFF6EA] text-[#001D3D]">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!User) return <Login />;

  return (
    <div className="h-[calc(100vh-80px)] bg-[#FFF6EA]">
      <Navbar />

      <div className="pt-20 flex min-h-[calc(100vh-80px)]">

        {/* Sidebar */}
        <div className="hidden lg:block w-[15%] min-h-[calc(100vh-80px)] bg-[#FFF6EA] border-r border-[#FFD60A]">
          <SideBar />
        </div>

        {/* Main content */}
        <main className="flex-1  min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>

        {/* Right section */}
        <div className="hidden xl:block w-[30%]  min-h-[calc(100vh-80px)] bg-[#FFF6EA] ">
          <SuggestPeople />
        </div>

      </div>
    </div>
  );
};
