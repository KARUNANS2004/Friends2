const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes=require('./auth')
const friendRoutes=require('./friends')
const searchRoutes=require('./search')
const userRoutes=require('./users')

dotenv.config()

const app=express()

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database connected')
}).catch((error)=>{
    console.error("Database connection error:",error)
})

app.use("/api/auth",authRoutes)

app.use("/api/friends",friendRoutes)

app.use("/api/search",searchRoutes)

app.use("/api/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("Server is running")
})

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));