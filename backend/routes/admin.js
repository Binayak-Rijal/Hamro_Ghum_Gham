// // backend/routes/admin.js
// import express from 'express';
// import auth, { adminOnly } from '../middleware/auth.js';
// import User from '../models/User.js';
// import Booking from '../models/Booking.js';
// import Package from '../models/Package.js';

// const router = express.Router();

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
import auth, { adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';

const router = express.Router();

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

// ✅ ADD NEW PACKAGE (Admin only)
router.post('/packages', auth, adminOnly, async (req, res) => {
  try {
    const { title, description, price, location, image } = req.body;

    // Validation
    if (!title || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and price are required' 
      });
    }

    const newPackage = new Package({
      title,
      description,
      price,
      location,
      image
    });

    await newPackage.save();

    res.status(201).json({ 
      success: true, 
      message: 'Package added successfully',
      package: newPackage 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ DELETE PACKAGE (Admin only)
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