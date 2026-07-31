import express from "express"
import { getCurrentUser, updateUserLocation, updateProfile } from "../controllers/usercontroler.js"
import { upload } from "../middlewares/multer.js"


import isAuth from "../middlewares/isAuth.js"
const userRouter = express.Router()
userRouter.get("/current", isAuth, getCurrentUser)
userRouter.post("/update-location", isAuth, updateUserLocation)
userRouter.put("/profile", isAuth, upload.single("profilePic"), updateProfile)

export default userRouter