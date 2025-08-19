require("dotenv").config();
import mongoose from "mongoose";

const dbUrl: string = process.env.DB_URL || '';
const connectDB =async () => {
    try {
           const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected to DB: ${process.env.DB_NAME}`);
    
    } catch (error:any) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB; 