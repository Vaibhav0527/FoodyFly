import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    }
    catch(error){
        console.log("db error connecting to Atlas:", error.message)
        console.log("Starting in-memory MongoDB server as fallback...")
        try {
            const mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log("In-memory db connected successfully at", uri);
        } catch (memError) {
            console.log("Failed to start in-memory db:", memError.message);
        }
    }
}
export default connectDb