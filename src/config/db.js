import mongoose from "mongoose";
import { DB_NAME } from "../const.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("✅ MongoDB Connected !!!", conn.Connection.host);
    } catch (error) {
        console.log("❌ MongoDB Connection Failed : ", error.message);
        process.exit(1); // it terminate the code
    }
}
