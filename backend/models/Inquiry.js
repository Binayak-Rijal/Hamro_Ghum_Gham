import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destinationId: String,
  destinationName: String,
  fullName: String,
  email: String,
  phone: String,
  date: Date,
  guests: Number,
  message: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema);
