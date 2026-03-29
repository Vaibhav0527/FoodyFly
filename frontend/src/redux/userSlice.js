import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const userSlice=createSlice({
    name:"user",
    initialState:{       
        currentCity:null ,
        userData:null,
          

    },
    reducers:{
       
        setCurrentCity:(state,action)=>{
            state.currentCity=action.payload
        },
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
}})
export const {setCurrentCity, setUserData}=userSlice.actions
export default userSlice.reducer