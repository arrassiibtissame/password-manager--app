
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
  
    const passwords = await Password.find({ user: req.user.id });
   const decryptedPasswords = passwords.map(p => ({
    ...p._doc,
    password: decrypt(p.password)
  }));
  res.json(decryptedPasswords);
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
router.put ("/:id",async (req, res) =>{
  try{
    const updatedPassword =await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
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