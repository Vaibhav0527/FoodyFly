import mongoose from 'mongoose';
import User from './models/usermodel.js';

mongoose.connect('mongodb+srv://vaibhavgupta9737:vaibhavgupta9737@cluster0.eov4w.mongodb.net/FoodyFly').then(async () => {
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
