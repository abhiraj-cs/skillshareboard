const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');
let Service = require('../models/service.model');

// --- ROUTE 1: Handle user registration ---
// (This route is correct, leaving it as is)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json('An account with this email already exists.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json('User successfully registered!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// --- ROUTE 2: Handle user login ---
// (This route is correct, leaving it as is)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json('Invalid credentials.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json('Invalid credentials.');
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Logged in successfully!',
      token: token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});

// ROUTE 3: Get a user's public profile and their services
router.get('/profile/:username', async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (!user) {
      return res.status(404).json('User not found.');
    }

    // Find all services posted by that user
    const services = await Service.find({ user: user._id });

    // Send back the user's public info and their services
    res.json({
      user,
      services,
    });
    
  } catch (err) {
    res.status(500).json('Error: ' + err);
  }
});


module.exports = router;
