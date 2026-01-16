// backend/routes/packages.js
// ✅ CREATE THIS NEW FILE for public package access

import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// Get all packages (Public route - no auth required)
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single package by ID (Public route)
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