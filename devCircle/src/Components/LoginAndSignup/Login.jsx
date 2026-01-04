// src/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { LoggedInUser } from "../../Store/UserSlice";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("rishabh@gmail.com");
  const [password, setPassword] = useState("Rishabh@171717");
  const [login , setLogin] = useState("");
  // const data = { email, password };
  const dispatch = useDispatch()
  // console.log(data);

  const handleSubmit = async (e) => {
    //  authentication logic
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2100/Login", {
        
        emailId : email,
        password
      },
      {withCredentials:true}

      
    );
    
      dispatch(LoggedInUser(res.data))
      navigate("/Home");
    } catch (err) {
      setLogin(err)
      console.log(err);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-amber-500 px-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-neutral-600 text-center mb-6">
          Login
        </h2>
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              placeholder="Enter Email / Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border text-neutral-800 border-neutral-800 rounded-2xl focus:outline-none focus:border-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-800 text-neutral-800 rounded-2xl focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {

          <div className="text-red-700 ">{ login?.response?.data?.error ? login?.response?.data.error : login?.response?.data }</div>
          
          }
         
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-2xl transition-colors"
          >
            Submit
          </button>
        </form>
        <Link to="/Signup">
          <div className="mt-6 text-center text-neutral-600 text-sm">
            Don’t have an account?{" "}
            <p href="#" className="text-amber-700 hover:underline">
              Sign up
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Login;
