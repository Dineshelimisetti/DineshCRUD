import dotenv from "dotenv";

import {connectDB} from "./config/db.js";

import app from "./app.js"
import { connect } from "mongoose";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT,() =>{
    console.log(`server running at http://localhost:${PORT}`);
    
    
})