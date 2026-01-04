import axios from "axios"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LoggedInUser } from "../Store/UserSlice"


const Navbar = () => {

    const User = useSelector((state) => state.user);
    const nevigate = useNavigate();
    const dispatch = useDispatch();
    
    //to handle logout
    const handleLogout =async()=>{
        try{
            await axios.post( "http://localhost:2100/logout",
            {},
                { withCredentials: true })
                dispatch(LoggedInUser(null));
                nevigate("/");
        }
        catch(Error){
            console.log(Error);
        }

    } 

    return (
        <>
            <div className="navbar bg-base-100  fixed  top-0 left-0 right-0 w-full z-10 shadow">
                <div className="flex-1">
                    <a className="btn btn-ghost text-white font-bold text-3xl">Hii {User?.firstName ? User.firstName.toUpperCase():" User"}👋</a>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                           
                           {User && 
                            <div className="w-10  rounded-full">
                                <img

                                    alt="Tailwind CSS Navbar component"
                                    src={!User?.photoURL ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTtLeSSHX-wbWFp_a_yKe3C4XAvY1NBmimNFV8akYRuIsaFGRufPr-QOT3BAHwH6m8KE&usqp=CAU": User?.photoURL }
                                />
                            </div>
                       
}
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <button className="cursor-pointer hover:bg-gray-800 rounded h-10"  onClick={User ? handleLogout:null}><a>{
                            !User ?"Login" : "Logout"}</a></button>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar