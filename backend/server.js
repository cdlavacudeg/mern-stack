import express from 'express';
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app= express();

app.use(cors());
app.use(express.json());//Be able to read JSON

app.use("/api/v1/restaurants",restaurants);//Restaurant Route
app.use("*",(req,res)=>res.status(404).json({error:"not found"}));//Al other directions

export default app;