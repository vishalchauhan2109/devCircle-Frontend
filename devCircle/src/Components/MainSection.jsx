import React from "react";
import { SideBar } from "../MainSection/LeftSection/SideBar";
// import { LoggedInUser } from "../../Store/UserSlice";

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"
import { Outlet } from "react-router-dom";
import { MessageSection } from "../MainSection/RightSection/MessageSection"
// import { MessageSection } from "../MainSection/RightSection/MessageSection";
import { useDispatch, useSelector } from "react-redux";
import { LoggedInUser } from "../Store/UserSlice";
import Login from "./LoginAndSignup/Login";
import { SuggestPeople } from "../MainSection/RightSection/SuggestedPeople";

export const MainSection = () => {

  const User = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const nevigate = useNavigate()
  const Loggedin = async () => {

    if (!User) {
      try {
        const newRes = await axios.get("http://localhost:2100/Profile/view",
          { withCredentials: true }
        )
        console.log(newRes)
        dispatch(LoggedInUser(newRes.data));
      } catch (Error) {
        nevigate("/")
        console.log(Error)
      }

    }
  }
  useEffect(() => {
    if (!User) {
      Loggedin();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-around pt-10 h-screen">
        <SideBar />
        {
          (!User) ?
            <Login />
            :
            <Outlet />
        }

        <SuggestPeople/>
      </div>
    </>
  )
}