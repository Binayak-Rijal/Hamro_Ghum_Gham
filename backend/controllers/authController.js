/**
 * Authentication Controller
 * Handles user signup, login, and profile-related operations
 * Manages JWT token generation and admin authentication
 */

import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
 * Generate JWT Token
 * Creates a signed token with user ID that expires in 7 days by default
 * @param {string} id - User ID to encode in token
 * @returns {string} - Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d', 
  })
};

// Admin credentials (hardcoded for testing)
// In production, these should be securely stored and managed
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '@Admin2060';

/**
 * User Signup Handler
 * Creates a new user account with regular 'user' role
 * Generates JWT token for immediate login
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.body.name - User's full name
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password (will be hashed)
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }

    // Create new user (regular users get 'user' role by default)
    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    // Generate authentication token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * User Login Handler
 * Authenticates user with email and password
 * Supports both regular users and admin with hardcoded credentials
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if it's admin login with hardcoded credentials
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      // Find or create admin user in database
      let adminUser = await User.findOne({ email: ADMIN_EMAIL });
      
      if (!adminUser) {
        // Create admin user if doesn't exist in database
        adminUser = await User.create({
          name: 'Admin',
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          role: 'admin'
        });
      } else if (adminUser.role !== 'admin') {
        // Update to admin role if user exists but isn't admin
        adminUser.role = 'admin';
        await adminUser.save();
      }

      // Generate admin token
      const token = generateToken(adminUser._id);

      return res.json({
        success: true,
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: 'admin'
        }
      });
    }

    // Regular user login
    // Query user and include password field for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate user token
    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user' // Ensure role is included, default to 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};