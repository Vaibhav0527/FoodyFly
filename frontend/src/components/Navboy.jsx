import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';

const Navboy = () => {
  const navigate = useNavigate();
  const { userData,myOrders } = useSelector(state => state.user);
  const { myShopData } = useSelector(state => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-full h-[80px] flex items-center justify-between px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] shadow-md'>
      
      <h1 className="text-3xl font-bold text-[#ff4d2d] tracking-wide">
        Vingo
      </h1>

      {myShopData && (
        <button
          className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'
          onClick={() => { navigate('/add-item') }}
        >
          <FaPlus size={20} />
          <span>Add Food Item</span>
        </button>
      )}

      <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium' onClick={() => navigate("/my-orders")}>
        <TbReceipt2 size={20}/>
        <span>My Orders</span>
        <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]'>{myOrders?.length}</span>
      </div>

      <div
        className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'
        onClick={() => navigate("/my-orders")}
      >
        <TbReceipt2 size={20}/> 
        <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]'>{myOrders?.length}</span>                     
      </div>

      {userData?.fullname && (
        <div 
          className='w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer'
          onClick={() => setShowInfo(prev => !prev)}
        >
          {userData.fullname.slice(0, 1)}
        </div>
      )}

      {showInfo && (
        <div className="absolute top-[80px] right-[10px] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
          <div className='text-[17px] font-semibold'>{userData.fullname}</div>
          <div className='text-[#ff4d2d] font-semibold cursor-pointer' onClick={handleLogOut}>Log Out</div>
        </div>
      )}
    </div>
  ) 
}

export default Navboy;
