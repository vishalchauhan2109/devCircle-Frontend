import React from 'react'
import { Outlet } from 'react-router-dom'

const Outlett = () => {
  return (
    <div className='h-[calc(100vh-80px)] pt-20 bg-[#FFF6EA]'>
      <Outlet />
    </div>
  )
}

export default Outlett
