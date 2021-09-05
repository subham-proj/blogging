import express from "express";
const router = express.Router();
import User from "../models/users.js";
import bcrypt from "bcrypt";

// Registration
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json("User has been registered successfully");
  } catch (err) {
    res.status(500).json("Registration Failed!");
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Invalid username");

    const validate = await bcrypt.compare(req.body.password, user.password);

    !validate && res.status(400).json("Invalid password");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json("Login Failed!");
  }
});

export default router;
