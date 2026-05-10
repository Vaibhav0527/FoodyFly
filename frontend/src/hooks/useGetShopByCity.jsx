import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity, setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';
import { serverUrl } from '../App';


function useGetShopByCity(city) {
    const dispatch=useDispatch();
    const {currentCity}=useSelector(state=>state.user);
  useEffect(()=>{
  const fetchShop=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`,{withCredentials:true})
            console.log(result)
            dispatch(setShopsInMyCity(result.data))
  
    } catch (error) {
        console.log(error)
    }
}
fetchShop()
 
  },[currentCity])
}

export default useGetShopByCity;
