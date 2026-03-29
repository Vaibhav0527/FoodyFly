import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';
import { serverUrl } from '../App';


function useGetMyShopData() {
    const dispatch=useDispatch();
    const {userData}=useSelector(state=>state.user);
  useEffect(()=>{
  const fetchShop=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
            console.log(result)
            dispatch(setMyShopData(result.data))
  
    } catch (error) {
        console.log(error)
    }
}
fetchShop() 
  },[userData])
}

export default useGetMyShopData
