import React from "react";
import {BrowserRouter,  Route, Routes} from "react-router-dom"
import "./App.css";
import { MainSection } from "./Components/MainSection";
import Login from "./Components/LoginAndSignup/Login";
import Signup from "./Components/LoginAndSignup/Signup";
import SearchPage from "./MainSection/LeftSection/SearchPage";
import { Feed } from "./MainSection/LeftSection/Feed";
import Profile from "./MainSection/LeftSection/Profile";
import { About } from "./MainSection/LeftSection/About";

function App() {

  
  return (
    <>
    {/* <Navbar/> */}


    <BrowserRouter basename="/">
      <div>
        <Routes>
          <Route path="/" element={<MainSection/>}>
          <Route index element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          {/* <Route path="/EnterOtp" element={<Signup/>}/> */}
          <Route path="/Home" element={<Feed/>}/>
          <Route path="/Search" element={<SearchPage/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/About" element={<About/>}/>


          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
    </>
  
  );
}

export default App;
