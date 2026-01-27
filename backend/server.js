


// backend/server.js
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
import ratingsRoutes from './routes/ratings.js'; // ✅ NEW
import { testEmailConnection } from './controllers/passwordController.js';

dotenv.config();

const app = express();

// ✅ Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded images
app.use(
  '/images',
  express.static(path.join(__dirname, '../frontend/public/images'))
);

// Connect to Database
connectDB();

// Test Email Server Connection on Startup
testEmailConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/password', passwordRoutes);
app.use('/api/ratings', ratingsRoutes); // ✅ NEW

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Travel Booking API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});