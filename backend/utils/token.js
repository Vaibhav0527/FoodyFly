import jwt from "jsonwebtoken"

const gentoken=async(userId)=>{
    try{
        const token=await jwt.sign({userId},process.env.JWT_SCERET,{expiresIn:"7d"})
        return token
    }
    catch(error){
        console.log(error)
    }
}
export default gentoken   