const express=require('express')
const User=require("./models/user.model")

const router=express.Router()

router.get("/",async (req,res)=>{
    const {query}=req.query;
    console.log(query)

    try {
        const user = await User.find({username:new RegExp(query,"i")})
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router