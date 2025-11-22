import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("database connected successfully")
    } catch (error) {
        console.log("database connection Failed", error)
        process.exit(1);
    }
}

