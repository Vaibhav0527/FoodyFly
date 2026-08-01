import multer from "multer"
import fs from "fs"

const dir = "./public"
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
}

const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
    cb(null,"./public")
   },
   filename:(req,file,cb)=>{
    cb(null,file.originalname)
   }
})

export const upload=multer({storage})