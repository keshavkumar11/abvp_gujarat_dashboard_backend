import express from "express";
import dotenv from "dotenv";
import institutionRoutes from "./src/routes/institutionRoutes.js";
import authRoutes from "./src/routes/authRoutes.js"
import cors from "cors";

app.use(cors());

dotenv.config();

const app = express();


app.use(express.json())
app.use("/api/auth",authRoutes);
app.use("/api/institutions",institutionRoutes);

app.get('/',(req,res)=>{
    res.send("API is running...")
})

export default app;

