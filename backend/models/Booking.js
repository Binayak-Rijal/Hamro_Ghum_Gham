/**
 * Booking Model
 * Defines the schema for booking documents in MongoDB
 * Stores booking details including user information, package details, and booking status
 */

import mongoose from 'mongoose';

/**
 * Booking Schema
 * Records all booking information for tracking and management
 */
const bookingSchema = new mongoose.Schema({
  // Reference to the User who made the booking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  
  // Optional reference to Package collection
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  
  // Package ID (stored as string for flexibility)
  packageId: {
    type: String,
    required: [true, 'Package ID is required']
  },
  
  // Name of the package being booked
  packageName: {
    type: String,
    required: [true, 'Package name is required']
  },
  
  // Full name of the customer
  fullName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  
  // Contact phone number
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  
  // Date of travel
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  
  // Number of people in the booking
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'At least 1 person is required']
  },
  
  // Special requests from customer (optional)
  specialRequests: {
    type: String,
    default: ''
  },
  
  // Base price before service charge
  subtotal: {
    type: Number,
    default: 0
  },
  
  // Service/platform fee
  serviceCharge: {
    type: Number,
    default: 0
  },
  
  // Final total price (subtotal + serviceCharge)
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required']
  },
  
  // Booking status: pending, confirmed, cancelled, or completed
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  
  // Timestamp when booking was created
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  // Automatically add updatedAt timestamp
  timestamps: true
});

// Database Indexes
// Index for faster queries by user and status
bookingSchema.index({ user: 1, status: 1 });
// Index for sorting by creation date (newest first)
bookingSchema.index({ createdAt: -1 });

// Prevent model re-compilation in development
const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;