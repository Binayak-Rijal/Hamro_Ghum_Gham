// backend/routes/destinations.js
import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// ✅ Get featured destinations ONLY (for Home page)
// This route MUST come before the /:id route
router.get('/featured', async (req, res) => {
  try {
    // Fetch destinations marked as featured
    const featuredDestinations = await Destination.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({ success: true, destinations: featuredDestinations });
  } catch (error) {
    console.error('Error fetching featured destinations:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all destinations (for Destinations page)
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json({ success: true, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single destination by ID
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ 
        success: false, 
        message: 'Destination not found' 
      });
    }
    
    res.json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;