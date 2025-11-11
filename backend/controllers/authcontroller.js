import User from "../models/usermodel.js";
import bcrypt from "bcrypt";

export const signUp=async(req,res)=>{
    try{
        const {name,email,password,mobile,role}=req.body;
        //check if user already exists
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        if(mobile.length<10){
            return res.status(400).json({message:"Invalid mobile number"});
        }
     const hashedPassword=await bcrypt.hash(password,10)
        user=await User.create({
            name,
            email,
            mobile,
            password:hashedPassword,
            role
        });
        return res.status(201).json({message:"User registered successfully"});
    }
    catch(error){
        console.error("Error in signUp:",error);
        return res.status(500).json({message:"Server error"});
    }
}
export const signIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }
        return res.status(200).json({message:"User signed in successfully"});
    }
    catch(error){
        console.error("Error in signIn:",error);
        return res.status(500).json({message:"Server error"});
    }
}