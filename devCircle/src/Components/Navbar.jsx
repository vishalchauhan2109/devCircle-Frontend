import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../Store/UserSlice";

const Navbar = () => {
    const User = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);


    console.log(show)
    const handleShow = () => {
        setShow(!show)
    }
    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:2100/logout",
                {},
                { withCredentials: true }
            );
            dispatch(LoggedInUser(null));
            navigate("/");
        } catch (error) {
            console.log(error);
        }



    };

    return (
        <header 
            className="fixed top-0 left-0 right-0 z-50 bg-[#FFF6EA] text-neutral-800 shadow-sm">
            <div className="h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">

                {/* Greeting */}
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#BF2EF0]">
                    Hi {User?.firstName ? User.firstName.toUpperCase() : "User"} 👋
                </h1>
                {/* Avatar + Dropdown */}

               <div className="relative">
  <div
    onClick={handleShow}
    className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ED3EF7] cursor-pointer hover:scale-105 transition"
  >
    <img
      src={
        User?.photoURL ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTtLeSSHX-wbWFp_a_yKe3C4XAvY1NBmimNFV8akYRuIsaFGRufPr-QOT3BAHwH6m8KE&usqp=CAU"
      }
      alt="User Avatar"
      className="w-full h-full object-cover"
    />
  </div>

  {show && (
    <ul className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#FFF6EA] shadow-lg border border-[#FEEEC8] p-2 z-50">
      <li>
        <button className="w-full px-4 py-2 text-left rounded-xl hover:text-[#ED3EF7] hover:bg-[#FEEEC8]">
          Profile
        </button>
      </li>
      <li>
        <button className="w-full px-4 py-2 text-left rounded-xl  hover:text-[#ED3EF7] hover:bg-[#FEEEC8]">
          Settings
        </button>
      </li>
      <li>
        <button
          onClick={User ? handleLogout : () => navigate("/")}
          className="w-full px-4 py-2 text-left rounded-xl hover:text-[#ED3EF7] hover:bg-[#FEEEC8]"
        >
          {User ? "Logout" : "Login"}
        </button>
      </li>
    </ul>
  )}
</div>


            </div>
        </header>
    );
};

export default Navbar;
