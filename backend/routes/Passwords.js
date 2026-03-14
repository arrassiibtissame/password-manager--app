const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Password = require("../models/Passwords");

// Add new password
router.post("/", auth, async (req, res) => {
  const { title, username, password } = req.body;
  try {
    const newPassword = new Password({ user: req.user.id, title, username, password });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all passwords for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    res.json(passwords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;