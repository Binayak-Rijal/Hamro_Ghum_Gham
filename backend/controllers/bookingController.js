import Booking from '../models/Booking.js';
import Inquiry from '../models/Inquiry.js';

// @desc    Create booking
// @route   POST /api/bookings
export const createBooking = async (req, res) => {
  try {
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
    if (!packageId || !packageName || !fullName ||  !phone || !travelDate || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const booking = await Booking.create({
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

    res.status(201).json({ 
      success: true, 
      message: 'Booking created successfully',
      booking 
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get bookings count
// @route   GET /api/bookings/count
export const getBookingsCount = async (req, res) => {
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
    console.error('Get bookings count error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message,
      count: 0
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('package', 'name images duration price')
      .sort({ createdAt: -1 });
      
    res.json({ 
      success: true, 
      count: bookings.length, 
      bookings 
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
export const getBooking = async (req, res) => {
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
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
export const cancelBooking = async (req, res) => {
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
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
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
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Submit inquiry
// @route   POST /api/bookings/inquiry
export const submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create({
      user: req.user.id,
      ...req.body
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      inquiry 
    });
  } catch (error) {
    console.error('Submit inquiry error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};