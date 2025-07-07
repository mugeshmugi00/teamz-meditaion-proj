// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Register Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, terms } = req.body;
    if (!name || !email || !password || !confirmPassword || terms === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newUser = new User({ name, email, password, confirmPassword, terms });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful', user: newUser.toJSON() });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
// server.js (Login Endpoint)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check for admin user
    if (email === 'admin' && password === 'admin') {
      return res.status(200).json({ message: 'Admin login successful', role: 'admin' });
    }

    // Check for registered user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found. Please register.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', role: 'user', user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});