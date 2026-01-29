/**
 * Database Connection Module
 * Handles MongoDB connection initialization
 * Ensures MONGODB_URI is defined before attempting connection
 */

import mongoose from 'mongoose';

/**
 * Connects to MongoDB database
 * @async
 * @throws {Error} If MONGODB_URI environment variable is not defined
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  // Validate that MongoDB URI is configured in environment variables
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env');
  }

  // Establish connection to MongoDB
  const conn = await mongoose.connect(process.env.MONGODB_URI);
  
  // Log successful connection with host information
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
