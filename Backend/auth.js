require('dotenv').config(); // Ensure this is loaded if not done in main server file

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('./models/user.model');
const { default: axios } = require("axios");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log('Signup Request Received:', username, password); // Log incoming request

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username: username, password: hashedPassword });
        console.log('New User to be Saved:', newUser); // Log new user data before saving
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup process:', error); // More descriptive error logging
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log('Login Request Received:', username); // Log incoming login request

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, username: user.username });

    } catch (error) {
        console.log('Error during login process:', error); // More descriptive error logging
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
