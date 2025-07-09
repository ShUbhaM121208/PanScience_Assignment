// debug-auth.js - Helper script to debug authentication issues
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

// Test JWT token verification
const testToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token is valid:', decoded);
    return decoded;
  } catch (error) {
    console.log('❌ Token is invalid:', error.message);
    return null;
  }
};

// Test MongoDB connection
const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    
    const { User, Task } = require('./models');
    
    // Test user lookup
    const users = await User.find().limit(5);
    console.log('📊 Users in database:', users.length);
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - Role: ${user.role} - ID: ${user._id}`);
    });
    
    // Test task lookup
    const tasks = await Task.find().limit(5);
    console.log('📊 Tasks in database:', tasks.length);
    tasks.forEach(task => {
      console.log(`  - ${task.title} - UserID: ${task.userId} - Created: ${task.createdAt}`);
    });
    
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
};

// Usage instructions
console.log('🔧 Debug Authentication Helper');
console.log('Usage: node debug-auth.js <token>');
console.log('');

if (process.argv[2]) {
  const token = process.argv[2];
  console.log('Testing token:', token.substring(0, 20) + '...');
  testToken(token);
} else {
  console.log('No token provided. Testing database connection...');
  testDB();
} 