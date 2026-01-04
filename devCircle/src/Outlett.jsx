import React from 'react'
import { Outlet } from 'react-router-dom'

const Outlett = () => {
  return (
    <div className=' min-h-auto pt-15 '>
        <Outlet/>
    </div>
  )
}

export default Outlett