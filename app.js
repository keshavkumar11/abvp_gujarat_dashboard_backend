import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db";
import institutionRoutes from "./src/routes/institutionRoutes";
import authRoutes from "./src/routes/authRoutes"

dotenv.config();

const app = express();


app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/institutions",institutionRoutes);

app.get('/',(req,res)=>{
    res.send("API is running...")
})

export default app;

