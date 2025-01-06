const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require('./models/user.model');
const { default: axios } = require("axios");

const router=express.Router();

// signup

router.post("/signup",async (req,res)=>{
    const {username,password}=req.body;

    try {
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"Username alreasdy exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newUser=new User({username:username,password:hashedPassword})
        console.log(newUser)
        await newUser.save()

        res.status(201).json({message:'User created successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" });
    }
})
//login
router.post("/login",async (req,res)=>{
    const {username,password}=req.body;

    try {
        const user=await User.findOne({username});
        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        // verifying password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        // jwt
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.json({token, username:user.username})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router