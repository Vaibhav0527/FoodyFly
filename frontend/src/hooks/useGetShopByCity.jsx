import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShopsInMyCity } from '../redux/userSlice';
import { serverUrl } from '../App';


function useGetShopByCity(city) {
    const dispatch=useDispatch();
    const {currentCity}=useSelector(state=>state.user);
  useEffect(()=>{
  const fetchShop=async () => {
    try {
           const resolvedCity = (city ?? currentCity ?? '').trim()
           if (!resolvedCity) {
             dispatch(setShopsInMyCity([]))
             return
           }

           const result=await axios.get(`${serverUrl}/api/shop/get-by-city/${encodeURIComponent(resolvedCity)}`,{withCredentials:true})
           const data = result?.data
           const shops = Array.isArray(data) ? data : (data?.shops ?? [])
           dispatch(setShopsInMyCity(shops))
  
    } catch (error) {
        console.log(error)
        dispatch(setShopsInMyCity([]))
    }
}
fetchShop()
 
  },[currentCity, city, dispatch])
}

export default useGetShopByCity;
