import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: 'dvob9szx4',
        api_key: '673665942737932',
        api_secret: 'dU4t58emzDW9eLn9xnuIjO2erYk'
    });
    try {
        const result=await cloudinary.uploader.upload(file)
        fs.unlinkSync(file)
        return result.secure_url
    }
    catch(error) {
        fs.unl(file)
        console.log(error)
    }

}
export default uploadOnCloudinary