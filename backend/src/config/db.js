import mongoose from "mongoose";


export async function connectDB() {

    await mongoose.connect()
    console.log("Connected to MongoDB");

    
}