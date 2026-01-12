import React from "react"; 
import { SideBar } from "../MainSection/LeftSection/SideBar"; 
// import { LoggedInUser } from "../../Store/UserSlice";
import axios from "axios";
import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Navbar from "../Components/Navbar" 
import { Outlet } from "react-router-dom"; 
import { MessageSection } from "../MainSection/RightSection/MessageSection"; 
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../Store/UserSlice"; 
import Login from "./LoginAndSignup/Login"; 
import { SuggestPeople } from "../MainSection/RightSection/SuggestedPeople";

export const MainSection = () => {
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2100/Profile/view",
        { withCredentials: true }
      );
      dispatch(LoggedInUser(res.data));
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!User) {
      fetchLoggedInUser();
    }
  }, []);

  // 🔴 If user not logged in → show ONLY login
  if (!User) {
    return <Login />;
  }

  return (
    <div className="h-[calc(100vh-80px)]  bg-[#FFF6EA]">
      <Navbar />

      {/* main layout */}
      <div className="pt-20 flex  bg-[#FFF6EA]">

        {/* Sidebar */}
        <div className="hidden lg:block w-[15%]">
          <SideBar />
        </div>

        {/* Main content */}
        <main className="flex-1 px-6 h-[calc(100vh-80px)]">
          <Outlet />
        </main>

        {/* Right section */}
        <div className="hidden xl:block w-[30%] px-4">
          <SuggestPeople />
        </div>

      </div>
    </div>
  );
};
