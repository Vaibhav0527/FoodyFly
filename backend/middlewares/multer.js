import multer from "multer"
import fs from "fs"

const storage=multer.diskStorage({
   destination:(req,file,cb)=>{
    const dir = "./public";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir)
   },
   filename:(req,file,cb)=>{
    cb(null,file.originalname)
   }
})

export const upload=multer({storage})