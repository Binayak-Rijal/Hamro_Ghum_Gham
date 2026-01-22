

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';
// import bookingRoutes from './routes/bookings.js';
// import savedRoutes from './routes/saved.js';
// import adminRoutes from './routes/admin.js';
// import packagesRoutes from './routes/packages.js'; // ✅ NEW IMPORT

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to Database
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/saved', savedRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/packages', packagesRoutes); // ✅ NEW PUBLIC ROUTE

// // Health check
// app.get('/', (req, res) => {
//   res.json({ message: 'Travel Booking API is running' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import savedRoutes from './routes/saved.js';
import adminRoutes from './routes/admin.js';
import packagesRoutes from './routes/packages.js';
import passwordRoutes from './routes/password.js';
import { testEmailConnection } from './controllers/passwordController.js'; // ✅ NEW IMPORT

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// ✅ Test Email Server Connection on Startup
testEmailConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/password', passwordRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Travel Booking API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});