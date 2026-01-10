import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import { MessageSection } from "./MessageSection";
import { AnimatedProfileCard } from "../../Components/AnimatedProfileCard";
export const SuggestPeople = () => {
    const [people, setPeople] = useState([])
    const UserUrl = "data:image/png;base64,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"

    const FetchConnection = async () => {

        try {


            const checkData = await axios.get("http://localhost:2100/feed", { withCredentials: true });

            const FetchedData = checkData.data;
            setPeople(FetchedData);
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        FetchConnection()
    }, [])

  const User = useSelector((state) => state.user)
  console.log(User)


    console.log(people)


    // const{lastName,firstName} = people.data
    return (

        <>
        {/* <AnimatedProfileCard/> */}
        {
        User ?
            <div className="carousel carousel-center flex-col items-center bg-neutral rounded-box max-w-md space-x-4 p-4">
                <div className="text-white text-2xl p-6 underline">
                    Suggested People
                </div>
                <div className="carousel carousel-center  items-center bg-neutral rounded-box max-w-md space-x-4 p-4">

                    {
                        (people) ?
                            people.map((user) => (
                                <div key ={user._id} className="card carousel-item bg-blue-200 text-neutral-950 w-66 h-min-80  shadow-sm">
                                    <figure >
                                        <img  className="w-60 pt-3 h-30"
                                src={(user?.photoURL)? (user?.photoURL):UserUrl }
                                alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{user.firstName.toUpperCase() +" "+ user.lastName.toUpperCase()}</h2>
                                        <p>{user?.about}</p>

                                    </div>
                                    <button className="btn btn-primary mb-3 ml-5 mr-5">SEND REQUEST<IoPersonAddSharp /></button>
                                    <button className="btn btn-secondary mb-3 ml-5 mr-5">Remove</button>
                                </div>


                            ))
                            : null
                    
                        }


                </div>
            </div>
            : null
}
        </>
    
    )
}