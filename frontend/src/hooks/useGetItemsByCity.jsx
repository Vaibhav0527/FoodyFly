import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setShopsInMyCity, setUserData } from '../redux/userSlice';
import { setMyShopData } from '../redux/ownerSlice';
import { serverUrl } from '../App';


function useGetItemsByCity(city) {
    const dispatch=useDispatch();
    const {currentCity}=useSelector(state=>state.user);
  useEffect(()=>{
  const fetchItems=async () => {
    try {
           const result=await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
            console.log(result)
            dispatch(setItemsInMyCity(result.data))
  
    } catch (error) {
        console.log(error)
    }
}
fetchItems()

  },[currentCity])
}

export default useGetItemsByCity;
