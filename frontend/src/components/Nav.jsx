import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5"; // close icon
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentCity, setSearchItems, setUserData } from '../redux/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setLocation } from '../redux/mapSlice';

function Nav() {
  const { userData ,currentCity,cartItems} = useSelector(state => state.user)
  const [showInfo, setShowInfo] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [addressInput, setAddressInput] = useState("")
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()

   const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }
   
    const getLatLngByAddress = async () => {
        try {
          const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
          const { lat, lon } = result.data.features[0].properties
          dispatch(setLocation({ lat, lon }))
          const cityResult=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
          const city=cityResult?.data?.results[0]?.city||cityResult?.data?.results[0]?.town||cityResult?.data?.results[0]?.village
          dispatch(setCurrentCity(city))
        } catch (error) {
          console.log(error)
        }
      }
    const handleSearchItems=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,{withCredentials:true})
    dispatch(setSearchItems(result.data))

      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        if(query){
handleSearchItems()
        }else{
              dispatch(setSearchItems(null))
        }

    },[query])
    
   


  return (
    <div className='w-full h-[80px] flex items-center justify-between px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] shadow-md'>
      
      {/* Left: Logo */}
      <h1 className="text-3xl font-bold text-[#ff4d2d] tracking-wide">
        Vingo
      </h1>

      {/* Center: Location + Search (hidden on small) */}
      <div className='hidden md:flex items-center gap-4'>
        {/* Location Box */}
        <div className="w-[160px] h-[50px] bg-white shadow-lg rounded-full flex items-center px-[15px] gap-[10px]">
          <FaLocationDot size={20} className="text-[#ff4d2d]" />
          <button className="truncate text-gray-600 text-sm font-medium" >{currentCity}</button>
        </div>
        <input type="text" className='flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]' placeholder='Enter Your Delivery Address..' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
         <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg flex items-center justify-center' onClick={getLatLngByAddress}><IoSearchOutline size={17} /></button>

        {/* Search Box */}
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
            {cartItems.length}
          </span>
        </div>

        {/* Orders Button */}
        <button className='hidden md:block px-4 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20 transition' onClick={()=>{navigate("/my-orders")}}>
          My Orders
        </button>

        {/* User Avatar */}
        {userData?.fullname && (
          <div 
            className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'
            onClick={() => setShowInfo(prev => !prev)}
          >
            {userData.fullname.slice(0, 1)}
          </div>
        )}

        {/* User Info Dropdown */}
        {showInfo && (
          <div className="absolute top-[80px] right-[10px] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className='text-[17px] font-semibold'>{userData.fullname}</div>
            <div className='text-[#ff4d2d] font-semibold cursor-pointer'onClick={handleLogOut}>Log Out</div>
          </div>
        )}
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
