// backend/models/Rating.js
import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxLength: 500,
      trim: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure one rating per user per package
ratingSchema.index({ packageId: 1, userId: 1 }, { unique: true });

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);

export default Rating;