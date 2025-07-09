// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// ================== REGISTER ===================
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Trim input to avoid trailing spaces
    const cleanEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: cleanEmail } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username: username.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: role || 'user', // fallback to 'user' role
    });

    // Generate token
    const token = generateToken(user);

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Registration failed:', err);
    return res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
};

// ================== LOGIN ===================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({ where: { email: cleanEmail } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user);

    return res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Login failed:', err);
    return res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
};
