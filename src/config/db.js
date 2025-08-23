const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set in environment');
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");
        
    } catch (error) {
        console.error("MongoDB Connection Failed:",error.message);
        process.exit(1)
    }
}

module.exports=connectDB;