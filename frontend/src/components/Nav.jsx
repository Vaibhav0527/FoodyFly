import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // close icon

import axios from 'axios';

import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function Nav() {
  const { currentCity} = useSelector(state => state.user)
  const [showInfo, setShowInfo] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [addressInput, setAddressInput] = useState("")
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()


    
   


  return (
    <div className='w-full h-[80px] flex items-center justify-between px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] shadow-md'>
      
      {/* Left: Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d] tracking-wide">
        FOODYFLY
      </h1>

      {/* Center: Location + Search (hidden on small) */}
      <div className='hidden md:flex items-center gap-4'>
        {/* Location Box */}
        <div className="w-[160px] h-[50px] bg-white shadow-lg rounded-full flex items-center px-[15px] gap-[10px]">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <button className="truncate text-gray-600 text-sm font-medium" >{currentCity}</button>
        </div>
       
        <div className="w-[280px] h-[50px] bg-white shadow-lg rounded-full items-center px-[15px] gap-[10px] hidden md:flex">
          <IoIosSearch size={20} className="text-[#ff4d2d]" />
          <input 
            type="text" 
            placeholder="Search delicious food..." 
            className="flex-1 text-gray-700 text-sm outline-none placeholder-gray-400"
            onChange={(e)=>setQuery(e.target.value)} value={query}
          />
        </div>
      </div>

      {/* Right: Cart + Orders + Profile */}
      <div className="flex items-center gap-4">
        
        {/* Search Icon (for mobile) */}
        <button 
          className="block md:hidden text-[#ff4d2d] text-2xl"
          onClick={() => setShowMobileSearch(true)}
        >
          <IoIosSearch />
        </button>

        {/* Cart */}
        <div className='relative cursor-pointer' onClick={()=>{navigate("/cart")}}>
          <FiShoppingCart size={25} className='text-[#ff4d2d]' />
          <span className='absolute right-[-9px] top-[-12px] text-sm font-semibold text-[#ff4d2d]'>
            {/* {cartItems.length} */}
          </span>
        </div>

        {/* Orders Button */}
        <button className='hidden md:block px-4 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20 transition' onClick={()=>{navigate("/my-orders")}}>
          My Orders
        </button>

        
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed top-0 left-0 w-full h-[80px] bg-white shadow-md flex items-center px-4 gap-3 z-[10000]">
          <IoIosSearch size={24} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food..."
            className="flex-1 text-gray-700 text-sm outline-none placeholder-gray-400"
            autoFocus
            onChange={(e)=>setQuery(e.target.value)} value={query}
          />
          <IoClose 
            size={28} 
            className="text-gray-600 cursor-pointer" 
            onClick={() => setShowMobileSearch(false)} 
          />
        </div>
      )}
    </div>
  )
}
export default Nav
