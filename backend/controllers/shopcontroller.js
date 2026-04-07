
import Shop from "../models/shopmodle.js";
import "../models/itemmodel.js";
import uploadOnCloudinary from "../utils/coudinary.js";

export const createEditShop=async (req,res) => {
    try {
       const {name,city,state,address}=req.body
       let image;
       if(req.file){
        console.log(req.file)
        image=await uploadOnCloudinary(req.file.path)
       } 
       let shop=await Shop.findOne({owner:req.userId})
       if(!shop){
        shop=await Shop.create({
        name,city,state,address,image,owner:req.userId
       })
       }else{
         shop=await Shop.findByIdAndUpdate(shop._id,{
        name,city,state,address,image,owner:req.userId
       },{new:true})
       }
      
       await shop.populate("owner items")
       return res.status(201).json(shop)
    } catch (error) {
        return res.status(500).json({message:`create shop error ${error}`})
    }
}
export const getMyShop=async (req,res) => {
    try {
        const shop=await Shop.findOne({owner:req.userId}).populate("owner").populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        if(!shop){
            return null
        }
        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({message:`get my shop error ${error}`})
    }
}

export const getShopsByCity = async (req, res) => {
    try {
        const city = (req.params.city ?? "").trim()
        if (!city) {
            return res.status(400).json({ message: "city is required" })
        }

        const shops = await Shop.find({ city: { $regex: new RegExp(`^${city}$`, "i") } })
            .select("name image city state address items")
            .sort({ updatedAt: -1 })

        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({ message: `get shops by city error ${error}` })
    }
}
