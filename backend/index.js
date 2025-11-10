import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
const app=express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
     connectDb();
})