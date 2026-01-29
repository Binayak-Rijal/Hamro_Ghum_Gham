
/**
 * User Model
 * Defines the schema for user documents in MongoDB
 * Includes authentication features like password hashing and comparison
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Schema
 * Stores user information with password security and role-based access
 */
const userSchema = new mongoose.Schema({
  // User's full name
  name: { type: String, required: true, trim: true },
  
  // User's email address (unique identifier)
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  
  // Hashed password (not included by default in queries)
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Exclude from queries by default for security
  },
  
  // User role: 'user' (regular customer) or 'admin' (system administrator)
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  // Arrays to store user's saved packages and destinations
  savedPackages: Array,
  savedDestinations: Array,
  
  // Timestamp of when the user account was created
  createdAt: { type: Date, default: Date.now }
});

/**
 * Pre-save Middleware
 * Automatically hashes password before saving to database
 * Only hashes if password field is modified (not on every save)
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

/**
 * Instance Method: comparePassword
 * Compares plain text password with hashed password
 * Used during login to verify user credentials
 * @param {string} candidatePassword - Plain text password from login form
 * @returns {Promise<boolean>} - True if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);