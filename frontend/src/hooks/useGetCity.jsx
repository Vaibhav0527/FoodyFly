import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentCity } from '../redux/userSlice';



function useGetCity() {
     const dispatch=useDispatch()
    //  const {userData}=useSelector(state=>state.user)
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
    try {
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude

    const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${"f7e3db0551cb4488bc4dca19cc686f56"}`)
    const place = result?.data?.results?.[0] || {}
    const resolvedCity = (place.city || place.town || place.village || place.county || place.state_district || "").trim()
    dispatch(setCurrentCity(resolvedCity))
    } catch (error) {
      console.log(error)
      dispatch(setCurrentCity(""))
    }
    // dispatch(setCurrentState(result?.data?.results[0].state))
    // dispatch(setCurrentAddress(result?.data?.results[0].address_line1 || result?.data?.results[0].address_line2 ))
    // dispatch(setAddress(result?.data?.results[0].address_line2))
    },()=>{
      dispatch(setCurrentCity(""))
    })
 
  },[])
}

export default useGetCity
