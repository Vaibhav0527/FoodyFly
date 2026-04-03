import jwt from "jsonwebtoken"

const gentoken=async(userId)=>{
    try{
        if(!process.env.JWT_SCERET){
            throw new Error("JWT_SCERET is missing in environment")
        }
        const token=await jwt.sign({userId},process.env.JWT_SCERET,{expiresIn:"7d"})
        return token
    }
    catch(error){
        console.log(error)
        throw error
    }
}
export default gentoken   