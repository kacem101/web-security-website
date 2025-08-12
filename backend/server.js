// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const labsRouter = require('./routes/labs');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/labs', labsRouter);

// Database connection
// Replace the connection string below with your MongoDB Atlas string
const DB_URI = process.env.DB_URI;;

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the user routes
app.use('/api/users', usersRouter);

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});