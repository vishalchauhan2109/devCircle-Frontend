import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css";
import { MainSection } from "./Components/MainSection";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import SearchPage from "./MainSection/LeftSection/SearchPage";
import  Feed  from "./MainSection/LeftSection/Feed";
import Profile from "./MainSection/LeftSection/Profile";
import { About } from "./MainSection/LeftSection/About";
import EditProfile from "./Components/EditProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectionRequest from "./MainSection/LeftSection/ConnectionRequest";
import  PostSection  from "./MainSection/LeftSection/PostSection";
import Friends from "./MainSection/LeftSection/Friends";
import Chat from "./MainSection/LeftSection/Chat";
import MessageSection from "./MainSection/RightSection/MessageSection";
import OthersProfile from "./MainSection/OthersProfile";
function App() {


  return (
    <>
      {/* <Navbar/> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <BrowserRouter basename="/">
        <div className=" bg-[#FFF6EA]">
          <Routes>
            <Route path="/" element={<MainSection />}>
              <Route index element={<Login />} />
              <Route path="/Signup" element={<Signup/>} />
              {/* <Route path="/EnterOtp" element={<Signup/>}/> */}
              <Route path="/Home" element={<Feed />} />
              <Route path="/Search" element={<SearchPage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/About" element={<About />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/ConnectionRequest" element={<ConnectionRequest/>} />
              <Route path ="/Posts" element ={<PostSection/>} />
              <Route path ="/Friends" element ={<Friends/>} />
              <Route path = "/chat" element={<MessageSection/>}/>
              <Route path = "/profile/:userID" element={<OthersProfile/>}/>

            </Route>
          </Routes>
        </div>
      </BrowserRouter>

    </>

  );
}

export default App;
