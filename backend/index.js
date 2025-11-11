import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import authRouter from "./routes/authroutes.js";



const app=express();
app.use(express.json());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],}
));

dotenv.config();

const PORT=process.env.PORT || 5000;



app.use("/api/auth",authRouter);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
     connectDb();
})