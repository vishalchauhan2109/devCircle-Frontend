import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MainSection } from '../MainSection';

const EnterOtp = () => {
    const[main,setMain] = useState(false);
    const handlePage =()=>{
        setMain(!main)
    }
    return(
    <>
    {
        main ?
            <MainSection/>
            :
    <div className='flex mt-[10%] justify-center'>
    <div className='w-[40vw] h-[40vh] bg-amber-600 rounded-2xl '>
            <p className=' text-green-400 italic pl-10 underline'>Submit Your OTP</p>
            <input className='h-10 bg-white border-b-2 ml-10 mt-6 w-[60%]  text-neutral-800' maxLength={6}   type='text' placeholder='Submit OTP'/>
            <button  onClick={handlePage}className='w-40 ml-[8%] mt-6 h-13 bg-green-400  text-2xl text-white p-2 rounded-2xl mt-4 '>Submit</button>
           
    </div>
    </div>
    }
    </>
  )
}

export default EnterOtp