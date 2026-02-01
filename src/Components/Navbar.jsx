import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoggedInUser } from "../Store/UserSlice";
import { baseUrl } from "../Constants";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const User = useSelector((state) => state.user);
  const sidebar = useSelector((state)=>state.sidebar)
  console.log(sidebar)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
      dispatch(LoggedInUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#001D3D] border-b border-[#003566]">
      <div className="h-16 sm:h-20 px-4 sm:px-6 lg:px-10 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center">

          <RxHamburgerMenu className="text-2xl" />
          <img
            src="/src/assets/DevCircleLogo.png"
            alt="Logo"
            className="h-12 sm:h-16 object-contain"
          />
        </div>

        {/* AVATAR + DROPDOWN */}
        <div className="relative">
          <div
            onClick={handleShow}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden
                       border-2 border-[#FFC300] cursor-pointer hover:scale-105 transition"
          >
            <img
              src={
                User?.photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTtLeSSHX-wbWFp_a_yKe3C4XAvY1NBmimNFV8akYRuIsaFGRufPr-QOT3BAHwH6m8KE&usqp=CAU"
              }
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>

          {show && (
            <ul className="absolute right-0 mt-2 w-48 bg-[#003566]
                           rounded-xl shadow-lg border border-[#FFC300] p-2">
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg
                                   text-[#FFD60A] hover:bg-[#FFC300] hover:text-[#001D3D] transition">
                  Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg
                                   text-[#FFD60A] hover:bg-[#FFC300] hover:text-[#001D3D] transition">
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={User ? handleLogout : () => navigate("/")}
                  className="w-full text-left px-3 py-2 rounded-lg
                             text-[#FFD60A] hover:bg-[#FFC300] hover:text-[#001D3D] transition"
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
