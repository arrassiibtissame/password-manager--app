
const {encrypt, decrypt}=require("../utils/crypto");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Password = require("../models/Passwords");

// Add new password
router.post("/", auth, async (req, res) => {
  const { title, username, password } = req.body;
  try {
    const encryptedPassword = encrypt(password);
    const newPassword = new Password({ userId: req.user.id, title, username, password: encryptedPassword });
    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all passwords for logged-in user
router.get("/", auth, async (req, res) => {
  
    const passwords = await Password.find({ userId: req.user.id });
   const decryptedPasswords = passwords.map(p => ({
    ...p._doc,
    password: decrypt(p.password)
  }));
  res.json(decryptedPasswords);
});

module.exports = router;