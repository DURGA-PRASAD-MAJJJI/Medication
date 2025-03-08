import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { DocContext } from '../context/DocContext';


const Nav = () => {
  const { aToken,setAToken } = useContext(AdminContext)
  const {dToken,setDToken} = useContext(DocContext)
 const Navigate =useNavigate()
  const SignOut =()=>{
    Navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
  }

  return (
<div className="flex justify-between items-center px-4 sm:px-10 py-3 bg-white border border-white-500">
{/* Left Section: Logo + Role Indicator */}
      <div className="flex items-center gap-2 text-xs">
        <img className="w-40 h-32 sm:w-40 cursor-pointer" src={assets.admin_logo} alt="" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button onClick={SignOut} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Sign Out</button>
    </div>
  )
};

export default Nav