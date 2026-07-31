import mongoose from 'mongoose';
import DeliveryAssignment from './models/deliveryAssignmentmodel.js';

mongoose.connect('mongodb+srv://shivayadav1238800_db_user:6xCqMUhi4bnZK3XI@cluster0.ixio1yb.mongodb.net/tomato').then(async () => {
    const assignments = await DeliveryAssignment.find({
        assignedTo: '6a6cc1a849131e2713b226bc'
    });
    console.log(assignments);
    process.exit();
}).catch(console.error);
