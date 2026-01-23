// backend/routes/admin.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import auth, { adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Package from '../models/Package.js';
import Destination from '../models/Destination.js';

const router = express.Router();

// ✅ Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// MULTER CONFIG (shared for packages + destinations)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../frontend/public/images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ========================================
// USER MANAGEMENT
// ========================================
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/users/:id', auth, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    await user.deleteOne();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// BOOKING MANAGEMENT
// ========================================
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

router.patch('/bookings/:id', auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// PACKAGE MANAGEMENT
// ========================================
router.get('/packages', auth, adminOnly, async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json({ success: true, packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/packages/:id', auth, adminOnly, async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id);
    if (!package_) {
      return res
        .status(404)
        .json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, package: package_ });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post(
  '/packages',
  auth,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
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
        excluded,
      } = req.body;

      if (!title || !price) {
        return res.status(400).json({
          success: false,
          message: 'Title and price are required',
        });
      }

      const imagePath = req.file ? `/images/${req.file.filename}` : '';

      const newPackage = new Package({
        title,
        description,
        price: Number(price),
        location,
        image: imagePath,
        duration,
        category,
        difficulty,
        highlights: highlights ? JSON.parse(highlights) : [],
        itinerary: itinerary ? JSON.parse(itinerary) : [],
        included: included ? JSON.parse(included) : [],
        excluded: excluded ? JSON.parse(excluded) : [],
      });

      await newPackage.save();

      res.status(201).json({
        success: true,
        message: 'Package added successfully',
        package: newPackage,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.put(
  '/packages/:id',
  auth,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
    try {
      const package_ = await Package.findById(req.params.id);
      if (!package_) {
        return res
          .status(404)
          .json({ success: false, message: 'Package not found' });
      }

      Object.assign(package_, req.body);

      if (req.file) {
        package_.image = `/images/${req.file.filename}`;
      }

      await package_.save();

      res.json({
        success: true,
        message: 'Package updated successfully',
        package: package_,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.delete('/packages/:id', auth, adminOnly, async (req, res) => {
  try {
    const package_ = await Package.findById(req.params.id);
    if (!package_) {
      return res
        .status(404)
        .json({ success: false, message: 'Package not found' });
    }
    await package_.deleteOne();
    res.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================================
// DESTINATION MANAGEMENT (NEW)
// ========================================
router.get('/destinations', auth, adminOnly, async (req, res) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 });
    res.json({ success: true, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/destinations/:id', auth, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post(
  '/destinations',
  auth,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        name,
        location,
        description,
        price,
        badge,
        rating,
        reviews,
        bestTimeToVisit,
        highlights,
        attractions,
        thingsToDo,
        included,
        excluded,
        featured,
      } = req.body;

      if (!name || !price || !location) {
        return res.status(400).json({
          success: false,
          message: 'Name, location, and price are required',
        });
      }

      const imagePath = req.file ? `/images/${req.file.filename}` : '';

      const newDestination = new Destination({
        name,
        location,
        description,
        price: Number(price),
        image: imagePath,
        badge: badge || 'Featured',
        rating: rating ? Number(rating) : 4.5,
        reviews: reviews ? Number(reviews) : 0,
        bestTimeToVisit,
        highlights: highlights ? JSON.parse(highlights) : [],
        attractions: attractions ? JSON.parse(attractions) : [],
        thingsToDo: thingsToDo ? JSON.parse(thingsToDo) : [],
        included: included ? JSON.parse(included) : [],
        excluded: excluded ? JSON.parse(excluded) : [],
        featured: featured === 'true' || featured === true,
      });

      await newDestination.save();

      res.status(201).json({
        success: true,
        message: 'Destination added successfully',
        destination: newDestination,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.put(
  '/destinations/:id',
  auth,
  adminOnly,
  upload.single('image'),
  async (req, res) => {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res
          .status(404)
          .json({ success: false, message: 'Destination not found' });
      }

      Object.assign(destination, req.body);

      if (req.file) {
        destination.image = `/images/${req.file.filename}`;
      }

      await destination.save();

      res.json({
        success: true,
        message: 'Destination updated successfully',
        destination,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.delete('/destinations/:id', auth, adminOnly, async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res
        .status(404)
        .json({ success: false, message: 'Destination not found' });
    }
    await destination.deleteOne();
    res.json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
