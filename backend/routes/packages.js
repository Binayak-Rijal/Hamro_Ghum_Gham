// backend/routes/packages.js
import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// ✅ UPDATED: Get featured packages for Home page
router.get('/popular', async (req, res) => {
  try {
    const featuredPackages = await Package.find({ featured: true })
      .sort({ createdAt: -1 });

    res.json({ success: true, packages: featuredPackages });
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all packages (for Tours page)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single package by ID
router.get('/:id', async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id);
    
    if (!package_) {
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found' 
      });
    }
    
    res.json({ success: true, package: package_ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;