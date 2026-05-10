import express from "express"
import { getCurrentUser, updateUserLocation } from "../controllers/usercontroler.js"


import isAuth from "../middlewares/isAuth.js"
const userRouter = express.Router()
userRouter.get("/current", isAuth, getCurrentUser)
userRouter.post("/update-location", isAuth, updateUserLocation)

export default userRouter