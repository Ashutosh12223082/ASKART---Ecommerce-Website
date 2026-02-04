const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔹 SIGNUP (user database me save hoga)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password   // abhi simple rakhenge, baad me hash karenge
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 LOGIN (sirf verify karega)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

