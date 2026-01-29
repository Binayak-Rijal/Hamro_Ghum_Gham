/**
 * Main Server File
 * Initializes Express server, connects to MongoDB, and sets up all API routes
 * Handles CORS, static file serving, and error handling
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import savedRoutes from './routes/saved.js';
import adminRoutes from './routes/admin.js';
import packagesRoutes from './routes/packages.js';
import destinationsRoutes from './routes/destinations.js';
import passwordRoutes from './routes/password.js';
import ratingsRoutes from './routes/ratings.js';
import searchRoutes from './routes/search.js';
import { testEmailConnection } from './controllers/passwordController.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Get __dirname and __filename in ES modules (required for path operations)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware Configuration
// CORS: Enable cross-origin requests from frontend
app.use(cors());
// Body Parser: Parse incoming JSON requests
app.use(express.json());

// Static File Serving
// Serve uploaded images from frontend public directory
app.use(
  '/images',
  express.static(path.join(__dirname, '../frontend/public/images'))
);

// Database Connection
// Establish MongoDB connection on server startup
connectDB();

// Email Service Validation
// Test email connection to ensure password reset emails can be sent
testEmailConnection();

// API Routes Configuration
// Mount all route handlers under /api prefix
app.use('/api/auth', authRoutes);          // User authentication (signup, login, profile)
app.use('/api/bookings', bookingRoutes);   // Booking management
app.use('/api/saved', savedRoutes);        // Saved packages and destinations
app.use('/api/admin', adminRoutes);        // Admin dashboard and management
app.use('/api/packages', packagesRoutes);  // Package management and retrieval
app.use('/api/destinations', destinationsRoutes); // Destination management
app.use('/api/password', passwordRoutes);  // Password reset functionality
app.use('/api/ratings', ratingsRoutes);    // Package and destination ratings
app.use('/api/search', searchRoutes);      // Search functionality

// Health Check Endpoint
// Used to verify if the API server is running
app.get('/', (req, res) => {
  res.json({ message: 'Travel Booking API is running' });
});

// Global Error Handling Middleware
// Catches all errors thrown in route handlers and sends standardized error response
app.use((err, req, res, next) => {
  // Log error for debugging
  console.error(err.stack);
  
  // Send error response to client
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: err.message
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;

// Start Server
// Listen on configured port and log startup message
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});