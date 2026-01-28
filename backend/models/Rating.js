import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      default: null,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 500,
      default: '',
    },
    type: {
      type: String,
      enum: ['package', 'destination'],
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
ratingSchema.index({ packageId: 1, userId: 1 });
ratingSchema.index({ destinationId: 1, userId: 1 });

export default mongoose.model('Rating', ratingSchema);
