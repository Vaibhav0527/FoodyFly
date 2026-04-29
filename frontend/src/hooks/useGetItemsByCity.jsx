import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity } from '../redux/userSlice';
import { serverUrl } from '../App';


function useGetItemsByCity(city) {
    const dispatch=useDispatch();
    const {currentCity}=useSelector(state=>state.user);
  useEffect(()=>{
  const fetchItems=async () => {
    try {
           const resolvedCity = (city ?? currentCity ?? '').trim()
           if (!resolvedCity) {
            dispatch(setItemsInMyCity([]))
            return
           }

           const result=await axios.get(`${serverUrl}/api/item/get-by-city/${encodeURIComponent(resolvedCity)}`,{withCredentials:true})
           const data = result?.data
           const items = Array.isArray(data) ? data : (data?.items ?? [])
           dispatch(setItemsInMyCity(items))
  
    } catch (error) {
        console.log(error)
        dispatch(setItemsInMyCity([]))
    }
}
fetchItems()

  },[currentCity, city, dispatch])
}

export default useGetItemsByCity;
