import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import authRouter from "./routes/authroutes.js";
import shopRouter from "./routes/shoproutes.js";
import userRouter from "./routes/userroutes.js";

// Register models once at startup (required for populate refs)
import "./models/usermodel.js";
import "./models/shopmodle.js";
import "./models/itemmodel.js";
import itemRouter from "./routes/itemroutes.js";



const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true,
        methods:["GET","POST","PUT","DELETE"],}
));

dotenv.config();

const PORT=process.env.PORT || 5000;



app.use("/api/auth",authRouter);
app.use("/api/shop",shopRouter);
app.use("/api/user",userRouter);
app.use("/api/item",itemRouter);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
     connectDb();
})