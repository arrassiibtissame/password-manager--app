
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
    const newPassword = new Password({ user: req.user.id, title, username, password: encryptedPassword });
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

    const decryptedPasswords = passwords.map((p) => {
      try {
        return {
          ...p._doc,
          password: p.password ? decrypt(p.password) : null,
        };
      } catch (err) {
        console.log("Failed to decrypt password:", p._id);
        return {
          ...p._doc,
          password: null,
        };
      }
    });

    res.json(decryptedPasswords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
  

// Delete a password
router.delete("/:id",auth, async (req,res)=>{
  try {
    console.log("Delete ID:", req.params.id);
    console.log("User:", req.user);
    const deleted = await Password.findOneAndDelete({_id:req.params.id, 
      user:req.user.id});
if(!deleted){
  return res.status(404).json({message:"Password not found"});
}
res.json({message:"Password deleted"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Server error"});
  }
});
// update password 
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, username, password } = req.body;

    const updatedData = {
      title,
      username,
    };

    if (password) {
      updatedData.password = encrypt(password);
    }

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updatedData,
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.json(updatedPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;