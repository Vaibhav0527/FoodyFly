import User from "../models/usermodel.js";
import { sendOtpMail } from "../utils/nodemailer.js";
import gentoken from "../utils/token.js";
import bcrypt from "bcryptjs"

export const signUp=async(req,res)=>{
    try{
        const{fullname,email,password,mobile,role}=req.body;
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exixt. "})
        }
        if(password.length<6){
             return res.status(400).json({message:"password must be of atleast 8 character "})
        }
        if(mobile.length<=9){
             return res.status(400).json({message:"enter a valid mobile number  "})

        }
        const hashedpassword=await bcrypt.hash(password,10)
        user=await User.create({
            fullname,
            email,
            mobile,
            role,
            password:hashedpassword
        })
        const token=await gentoken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
        return res.status(201).json(user)
    }
    catch(error){
        return res.status(500).json(`signup error ${error}`)
    }
}


export const signIn=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user does not exixt . "})
        } 
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password "})
        }
        
        
        const token=await gentoken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
        return res.status(201).json(user)
    }
    catch(error){
        return res.status(500).json(`signin error ${error}`)
    }
}  


export const signOut=async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out suesscufully"})   
        
    }
    catch(error){
        return res.status(500).json(`signout  error ${error}`)
    }
}

export const sendOtp=async (req,res) => {
  try {
    const {email}=req.body
    const user=await User.findOne({email})
    if(!user){
       return res.status(400).json({message:"User does not exist."})
    }
    const otp=Math.floor(1000 + Math.random() * 9000).toString()
    user.resetOtp=otp
    user.otpExpires=Date.now()+5*60*1000
    user.isOtpVerified=false
    await user.save()
    await sendOtpMail(email,otp)
    return res.status(200).json({message:"otp sent successfully"})
  } catch (error) {
     return res.status(500).json(`send otp error ${error}`)
  }  
}


export const verifyOtp=async (req,res) => {
    try {
        const {email,otp}=req.body
        const user=await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"invalid/expired otp"})
        }
        user.isOtpVerified=true
        user.resetOtp=undefined
        user.otpExpires=undefined
        await user.save()
        return res.status(200).json({message:"otp verify successfully"})
    } catch (error) {
         return res.status(500).json(`verify otp error ${error}`)
    }
}



export const resetPassword=async (req,res) => {
    try {
        const {email,newPassword}=req.body
        const user=await User.findOne({email})
    if(!user || !user.isOtpVerified){
       return res.status(400).json({message:"otp verification required"})
    }
    const hashedPassword=await bcrypt.hash(newPassword,10)
    user.password=hashedPassword
    user.isOtpVerified=false
    await user.save()
     return res.status(200).json({message:"password reset successfully"})
    } catch (error) {
         return res.status(500).json(`reset password error ${error}`)
    }
}



export const googleAuth=async (req,res) => {
    try {
        const {fullname,email,mobile,role}=req.body
        let user=await User.findOne({email})
        if(!user){
            user=await User.create({
                fullname,email,mobile,role
            })
        }

        const token=await gentoken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })
  
        return res.status(200).json(user)


    } catch (error) {
         return res.status(500).json(`googleAuth error ${error}`)
    }
}
