import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const userSlice=createSlice({
    name:"user",
    initialState:{       
        currentCity:null ,
        userData:null,
        shopInMyCity:null,
          

    },
    reducers:{
       
        setCurrentCity:(state,action)=>{
            state.currentCity=action.payload
        },
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setShopsInMyCity:(state,action)=>{
            state.shopInMyCity=action.payload
        }
}})
export const {setCurrentCity, setUserData, setShopsInMyCity}=userSlice.actions
export default userSlice.reducer