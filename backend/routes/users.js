const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // You'll need this for login
const authenticate = require('../middleware/authenticate'); // Import the middleware

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user and send back a JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // This is the line that's most likely causing the issue
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    if (!user.isWhitelisted) {
      return res.status(403).json({ error: 'User is not whitelisted' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    // Log the full error object to the console
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Protected Route Example
// This route can only be accessed with a valid token
router.get('/protected', authenticate, (req, res) => {
  // The 'authenticate' middleware already verified the token and added the user object to the request
  res.status(200).json({ message: 'You have access to this protected route!', user: req.user });
});

// New route to get the logged-in user's profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    // We can now access the user's ID directly from the request object
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;