



// // backend/routes/admin.js
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import auth, { adminOnly } from '../middleware/auth.js';
// import User from '../models/User.js';
// import Booking from '../models/Booking.js';
// import Package from '../models/Package.js';

// const router = express.Router();

// // ✅ Get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Configure Multer for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Save to frontend/public/images directory
//     const uploadPath = path.join(__dirname, '../../frontend/public/images');
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Generate unique filename
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// // File filter - only accept images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif|webp/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'));
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// // Get all users (Admin only)
// router.get('/users', auth, adminOnly, async (req, res) => {
//   try {
//     const users = await User.find().select('-password').sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Get all bookings (Admin only)
// router.get('/bookings', auth, adminOnly, async (req, res) => {
//   try {
//     const bookings = await Booking.find()
//       .populate('user', 'name email')
//       .populate('package', 'title destination')
//       .sort({ createdAt: -1 });
//     res.json({ success: true, bookings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Get all packages (Admin only)
// router.get('/packages', auth, adminOnly, async (req, res) => {
//   try {
//     const packages = await Package.find().sort({ createdAt: -1 });
//     res.json({ success: true, packages });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ✅ ADD NEW PACKAGE WITH IMAGE UPLOAD (Admin only)
// router.post('/packages', auth, adminOnly, upload.single('image'), async (req, res) => {
//   try {
//     const { 
//       title, 
//       description, 
//       price, 
//       location, 
//       duration,
//       category,
//       difficulty,
//       highlights,
//       itinerary,
//       included,
//       excluded
//     } = req.body;

//     // Validation
//     if (!title || !price) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Title and price are required' 
//       });
//     }

//     // Get image path (if uploaded)
//     const imagePath = req.file ? `/images/${req.file.filename}` : '';

//     // Parse JSON strings if needed
//     const parsedHighlights = highlights ? JSON.parse(highlights) : [];
//     const parsedItinerary = itinerary ? JSON.parse(itinerary) : [];
//     const parsedIncluded = included ? JSON.parse(included) : [];
//     const parsedExcluded = excluded ? JSON.parse(excluded) : [];

//     const newPackage = new Package({
//       title,
//       description,
//       price: Number(price),
//       location,
//       image: imagePath,
//       duration,
//       category,
//       difficulty,
//       highlights: parsedHighlights,
//       itinerary: parsedItinerary,
//       included: parsedIncluded,
//       excluded: parsedExcluded
//     });

//     await newPackage.save();

//     res.status(201).json({ 
//       success: true, 
//       message: 'Package added successfully',
//       package: newPackage 
//     });
//   } catch (error) {
//     console.error('Error adding package:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // ✅ DELETE PACKAGE (Admin only)
// router.delete('/packages/:id', auth, adminOnly, async (req, res) => {
//   try {
//     const package_ = await Package.findById(req.params.id);
    
//     if (!package_) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'Package not found' 
//       });
//     }

//     await package_.deleteOne();
    
//     res.json({ 
//       success: true, 
//       message: 'Package deleted successfully' 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Delete user (Admin only)
// router.delete('/users/:id', auth, adminOnly, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     await user.deleteOne();
//     res.json({ success: true, message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // Update booking status (Admin only)
// router.patch('/bookings/:id', auth, adminOnly, async (req, res) => {
//   try {
//     const { status } = req.body;
//     const booking = await Booking.findById(req.params.id);
    
//     if (!booking) {
//       return res.status(404).json({ success: false, message: 'Booking not found' });
//     }
    
//     booking.status = status;
//     await booking.save();
    
//     res.json({ success: true, booking });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;



// backend/routes/admin.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import auth, { adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

const router = express.Router();

// ✅ Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../frontend/public/images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all users (Admin only)
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all bookings (Admin only)
router.get('/bookings', auth, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('package', 'title destination')
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all packages (Admin only)
router.get('/packages', auth, adminOnly, async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ NEW: Get single package by ID (Admin only)
router.get('/packages/:id', auth, adminOnly, async (req, res) => {
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

// ADD NEW PACKAGE WITH IMAGE UPLOAD (Admin only)
router.post('/packages', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { 
      title, 
      description, 
      price, 
      location, 
      duration,
      category,
      difficulty,
      highlights,
      itinerary,
      included,
      excluded
    } = req.body;

    if (!title || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and price are required' 
      });
    }

    const imagePath = req.file ? `/images/${req.file.filename}` : '';

    const parsedHighlights = highlights ? JSON.parse(highlights) : [];
    const parsedItinerary = itinerary ? JSON.parse(itinerary) : [];
    const parsedIncluded = included ? JSON.parse(included) : [];
    const parsedExcluded = excluded ? JSON.parse(excluded) : [];

    const newPackage = new Package({
      title,
      description,
      price: Number(price),
      location,
      image: imagePath,
      duration,
      category,
      difficulty,
      highlights: parsedHighlights,
      itinerary: parsedItinerary,
      included: parsedIncluded,
      excluded: parsedExcluded
    });

    await newPackage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Package added successfully',
      package: newPackage 
    });
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ NEW: UPDATE PACKAGE (Admin only)
router.put('/packages/:id', auth, adminOnly, upload.single('image'), async (req, res) => {
  try {
    const { 
      title, 
      description, 
      price, 
      location, 
      duration,
      category,
      difficulty,
      highlights,
      itinerary,
      included,
      excluded
    } = req.body;

    // Find existing package
    const package_ = await Package.findById(req.params.id);
    
    if (!package_) {
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found' 
      });
    }

    // Update fields
    if (title) package_.title = title;
    if (description) package_.description = description;
    if (price) package_.price = Number(price);
    if (location) package_.location = location;
    if (duration) package_.duration = duration;
    if (category) package_.category = category;
    if (difficulty) package_.difficulty = difficulty;

    // Update image only if new file uploaded
    if (req.file) {
      package_.image = `/images/${req.file.filename}`;
    }

    // Parse and update arrays
    if (highlights) {
      package_.highlights = JSON.parse(highlights);
    }
    if (itinerary) {
      package_.itinerary = JSON.parse(itinerary);
    }
    if (included) {
      package_.included = JSON.parse(included);
    }
    if (excluded) {
      package_.excluded = JSON.parse(excluded);
    }

    await package_.save();

    res.json({ 
      success: true, 
      message: 'Package updated successfully',
      package: package_ 
    });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE PACKAGE (Admin only)
router.delete('/packages/:id', auth, adminOnly, async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id);
    
    if (!package_) {
      return res.status(404).json({ 
        success: false, 
        message: 'Package not found' 
      });
    }

    await package_.deleteOne();
    
    res.json({ 
      success: true, 
      message: 'Package deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update booking status (Admin only)
router.patch('/bookings/:id', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    booking.status = status;
    await booking.save();
    
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;