// ============================================
// routes/bookings.js - UPDATED WITH NEW ENDPOINTS
// ============================================

import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';

const router = express.Router();

// ============================================
// BOOKING MODEL
// ============================================
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  packageId: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true,
    min: 1
  },
  specialRequests: {
    type: String,
    default: ''
  },
  subtotal: {
    type: Number,
    default: 0
  },
  serviceCharge: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// ============================================
// ROUTES
// ============================================

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    console.log('Booking request received');
    console.log('User ID:', req.user.id);
    console.log('Request body:', req.body);

    const { 
      packageId, 
      packageName, 
      fullName,
      phone, 
      travelDate, 
      numberOfPeople,
      specialRequests,
      subtotal, 
      serviceCharge, 
      totalPrice
    } = req.body;

    // Validation
    if (!packageId || !packageName || !fullName  || !phone || !travelDate || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create new booking
    const booking = new Booking({
      user: req.user.id,
      packageId,
      packageName,
      fullName,
      phone,
      travelDate,
      numberOfPeople,
      specialRequests: specialRequests || '',
      subtotal: subtotal || 0,
      serviceCharge: serviceCharge || 0,
      totalPrice: totalPrice || 0,
      status: 'pending'
    });

    await booking.save();

    console.log('Booking created successfully:', booking);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// @route   GET /api/bookings/count
// @desc    Get count of user's bookings
// @access  Private
router.get('/count', auth, async (req, res) => {
  try {
    const count = await Booking.countDocuments({ 
      user: req.user.id,
      status: { $ne: 'cancelled' } // Don't count cancelled bookings
    });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error fetching bookings count:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings count',
      count: 0
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'name images duration price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('package', 'name images duration price');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking'
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking (update status to cancelled)
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled'
      });
    }

    // Check if booking is completed
    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed booking'
      });
    }

    // Update status to cancelled
    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking'
    });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking (permanent deletion)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      message: 'Booking deleted successfully',
      booking
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking'
    });
  }
});

export default router;