import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { addItem,deleteItem ,editItem,getItemById} from "../controllers/itemcontroller.js"



const itemRouter=express.Router()
itemRouter.post("/add-item",isAuth,upload.single("image"),addItem)
itemRouter.get("/delete/:itemId",isAuth,deleteItem)
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById)

itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem)



export default itemRouter