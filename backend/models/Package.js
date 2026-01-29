/**
 * Package Model
 * Defines the schema for travel package documents in MongoDB
 * Stores details about travel packages including pricing, itinerary, and featured status
 */

import mongoose from 'mongoose';

/**
 * Package Schema
 * Represents a travel package that users can book
 */
const packageSchema = new mongoose.Schema(
  {
    // Package name/title
    title: {
      type: String,
      required: true,
    },
    
    // Detailed description of the package
    description: {
      type: String,
    },
    
    // Price per person
    price: {
      type: Number,
      required: true,
    },
    
    // Main location/destination
    location: {
      type: String,
    },
    
    // URL to package image
    image: {
      type: String,
    },
    
    // Duration of the package (e.g., "5 days 4 nights")
    duration: {
      type: String,
    },
    
    // Average rating given by customers
    rating: {
      type: Number,
      default: 4.5,
    },
    
    // Total number of reviews/ratings
    reviews: {
      type: Number,
      default: 0,
    },
    
    // Package category: trekking, cultural, adventure, wildlife, or other
    category: {
      type: String,
      enum: ['trekking', 'cultural', 'adventure', 'wildlife', 'other'],
      default: 'other'
    },
    
    // Difficulty level: easy, moderate, or difficult
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'difficult'],
      default: 'moderate'
    },
    
    // Array of package highlights/features
    highlights: [{
      type: String
    }],
    
    // Day-by-day itinerary
    itinerary: [{
      day: Number,              // Day number
      title: String,            // Day title/location
      description: String       // Activity description
    }],
    
    // What's included in the package price
    included: [{
      type: String
    }],
    
    // What's NOT included (extra costs)
    excluded: [{
      type: String
    }],
    
    // Featured status for homepage display
    featured: {
      type: Boolean,
      default: false
    }
  },
  { 
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true 
  }
);

// Prevent model re-compilation in development
const Package =
  mongoose.models.Package || mongoose.model('Package', packageSchema);

export default Package;