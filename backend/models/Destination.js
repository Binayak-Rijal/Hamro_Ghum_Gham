/**
 * Destination Model
 * Defines the schema for destination documents in MongoDB
 * Stores details about travel destinations with attractions, activities, and travel information
 */

import mongoose from 'mongoose';

/**
 * Destination Schema
 * Represents a travel destination that users can explore and visit
 */
const destinationSchema = new mongoose.Schema(
  {
    // Destination name/title
    name: {
      type: String,
      required: true,
    },
    
    // Location/geographical area
    location: {
      type: String,
      required: true,
    },
    
    // Description of the destination
    description: {
      type: String,
    },
    
    // Estimated price per person
    price: {
      type: Number,
      required: true,
    },
    
    // URL to destination image
    image: {
      type: String,
    },
    
    // Average rating given by visitors
    rating: {
      type: Number,
      default: 4.5,
    },
    
    // Total number of reviews/ratings
    reviews: {
      type: Number,
      default: 0,
    },
    
    // Badge label (e.g., "Featured", "Popular", "New")
    badge: {
      type: String,
      default: 'Featured'
    },
    
    // Key highlights and attractions
    highlights: [{
      type: String
    }],
    
    // Detailed attractions with descriptions
    attractions: [{
      name: String,                  // Attraction name
      description: String,           // Details about the attraction
      time: String                   // Time needed to visit
    }],
    
    // Best season/time to visit
    bestTimeToVisit: {
      type: String
    },
    
    // Things to do at this destination
    thingsToDo: [{
      type: String
    }],
    
    // What's typically included in tours
    included: [{
      type: String
    }],
    
    // What's NOT included (extra activities/costs)
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
const Destination =
  mongoose.models.Destination || mongoose.model('Destination', destinationSchema);

export default Destination;