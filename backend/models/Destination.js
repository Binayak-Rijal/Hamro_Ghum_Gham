// backend/models/Destination.js
import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
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
    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      default: 'Featured'
    },
    // Additional destination-specific fields
    highlights: [{
      type: String
    }],
    attractions: [{
      name: String,
      description: String,
      time: String
    }],
    bestTimeToVisit: {
      type: String
    },
    thingsToDo: [{
      type: String
    }],
    included: [{
      type: String
    }],
    excluded: [{
      type: String
    }],
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Destination =
  mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export default Destination;