const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

//signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.send("All fields required");

    // 🔐 PASSWORD VALIDATION
    if (password.length < 8)
      return res.send("Password must be at least 8 characters");

    if (!/[A-Z]/.test(password))
      return res.send("Password must contain one uppercase letter");

    if (!/[0-9]/.test(password))
      return res.send("Password must contain one number");

    const exists = await User.findOne({ email });
    if (exists)
      return res.send("User already exists");

    const user = new User({ email, password });
    await user.save();

    res.send("Signup successful");

  } catch (err) {
    console.error(err);
    res.send("Signup error");
  }
});


/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Email se user lao
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Invalid credentials");
    }

    // 2️⃣ Password compare karo (PLAIN vs ENCRYPTED)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid credentials");
    }

    // 3️⃣ Session set karo
    req.session.userId = user._id;

    res.send("Login successful");

  } catch (err) {
    console.error(err);
    res.send("Login error");
  }
});

/* LOGOUT */
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Logged out");
});

/* CHECK LOGIN */
router.get("/me", (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ loggedIn: false });

  res.json({ loggedIn: true });
});

module.exports = router;
