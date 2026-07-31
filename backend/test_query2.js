import mongoose from 'mongoose';
import User from './models/usermodel.js';

mongoose.connect('mongodb+srv://shivayadav1238800_db_user:6xCqMUhi4bnZK3XI@cluster0.ixio1yb.mongodb.net/tomato').then(async () => {
    console.log('Connected to DB');
    const latitude = 25.254049;
    const longitude = 87.042266;
    const boys = await User.find({
        role: "deliveryBoy",
        location: {
            $near: {
                $geometry: { type: "Point", coordinates: [longitude, latitude] },
                $maxDistance: 5000
            }
        }
    });
    console.log('Found boys:', boys.length);
    console.log(boys);
    process.exit();
}).catch(console.error);
