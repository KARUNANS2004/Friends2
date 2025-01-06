const express=require('express')
const User=require('./models/user.model')
const mongoose=require('mongoose')

const router=express.Router();

router.get("/:userId", async (req, res) => {
    console.log(req.params.userId)
    try {
      const userFound = await User.findById(req.params.userId);
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(userFound);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
});

module.exports=router