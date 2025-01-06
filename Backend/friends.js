const express = require("express");
const User = require("./models/user.model");

const router = express.Router();

// Add a friend
router.post("/add", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // Avoid duplicate friend entries
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      await user.save();
    }

    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's friends count
router.get("/count/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendsCount = user.friends.length;
    res.status(200).json({ friendsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
