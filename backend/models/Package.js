// backend/models/Package.js
import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
    },
    image: {
      type: String,
    },
    // ✅ NEW FIELDS
    duration: {
      type: String, // e.g., "5 Days", "7 Days"
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ['trekking', 'cultural', 'adventure', 'wildlife', 'other'],
      default: 'other'
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'difficult'],
      default: 'moderate'
    },
    highlights: [{
      type: String
    }],
    itinerary: [{
      day: Number,
      title: String,
      description: String
    }],
    included: [{
      type: String
    }],
    excluded: [{
      type: String
    }]
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError (important)
const Package =
  mongoose.models.Package || mongoose.model('Package', packageSchema);

export default Package;