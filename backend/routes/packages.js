// // backend/routes/packages.js
// // ✅ CREATE THIS NEW FILE for public package access

// import express from 'express';
// import Package from '../models/Package.js';

// const router = express.Router();

// // Get all packages (Public route - no auth required)
// router.get('/', async (req, res) => {
//   try {
//     const packages = await Package.find().sort({ createdAt: -1 });
//     res.json({ success: true, packages });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Get single package by ID (Public route)
// router.get('/:id', async (req, res) => {
//   try {
//     const package_ = await Package.findById(req.params.id);
    
//     if (!package_) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Package not found' 
//       });
//     }
    
//     res.json({ success: true, package: package_ });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;


// backend/routes/packages.js
import express from 'express';
import Package from '../models/Package.js';

const router = express.Router();

// ✅ Get popular packages ONLY (for Home page)
// This route MUST come before the /:id route
router.get('/popular', async (req, res) => {
  try {
    // Define the exact popular package names (case-insensitive)
    const popularPackageNames = [
      'pokhara',
      'mustang',
      'manang',
      'everest base camp',
      'annapurna base camp'
    ];

    // Create regex patterns for case-insensitive matching
    const regexPatterns = popularPackageNames.map(name => 
      new RegExp(`^${name}$`, 'i')
    );

    // Fetch packages that match any of the popular names
    const popularPackages = await Package.find({
      $or: regexPatterns.map(regex => ({ title: regex }))
    }).sort({ createdAt: -1 });

    res.json({ success: true, packages: popularPackages });
  } catch (error) {
    console.error('Error fetching popular packages:', error);
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