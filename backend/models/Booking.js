import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package'
  },
  packageId: {
    type: String,
    required: [true, 'Package ID is required']
  },
  packageName: {
    type: String,
    required: [true, 'Package name is required']
  },
  fullName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  travelDate: {
    type: Date,
    required: [true, 'Travel date is required']
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'At least 1 person is required']
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
    required: [true, 'Total price is required']
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
}, {
  timestamps: true
});

// Index for faster queries
bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ createdAt: -1 });

// export default mongoose.model('Booking', bookingSchema);

const Booking =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
