import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{       
        currentCity:null   

    },
    reducers:{
       
        setCurrentCity:(state,action)=>{
            state.currentCity=action.payload
        }
}})
export const {setCurrentCity}=userSlice.actions
export default userSlice.reducer