import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js'; //  auth middleware

const router = express.Router();


// SAVED ITEM MODEL
const savedItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  itemType: {
    type: String,
    enum: ['package', 'destination'],
    required: true
  },
  name: String,
  location: String,
  price: Number,
  duration: String,
  image: String,
  rating: Number,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index to prevent duplicates
savedItemSchema.index({ userId: 1, itemId: 1, itemType: 1 }, { unique: true });

const SavedItem = mongoose.model('SavedItem', savedItemSchema);

// ROUTES

// @route   GET /api/saved
// @desc    Get all saved items for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const savedItems = await SavedItem.find({ userId: req.user.id })
      .sort({ savedAt: -1 });

    res.json({
      success: true,
      data: savedItems
    });
  } catch (error) {
    console.error('Error fetching saved items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/saved
// @desc    Save a package or destination
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { itemId, itemType, name, location, price, duration, image, rating } = req.body;

    // Validation
    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: 'Item ID and type are required'
      });
    }

    // Check if already saved
    const existingItem = await SavedItem.findOne({
      userId: req.user.id,
      itemId,
      itemType
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Item already saved'
      });
    }

    // Create new saved item
    const savedItem = new SavedItem({
      userId: req.user.id,
      itemId,
      itemType,
      name,
      location,
      price,
      duration,
      image,
      rating
    });

    await savedItem.save();

    res.status(201).json({
      success: true,
      message: 'Item saved successfully',
      data: savedItem
    });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/saved/:itemId/:itemType
// @desc    Remove saved item
// @access  Private
router.delete('/:itemId/:itemType', auth, async (req, res) => {
  try {
    const { itemId, itemType } = req.params;

    const deletedItem = await SavedItem.findOneAndDelete({
      userId: req.user.id,
      itemId,
      itemType
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Saved item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item removed from saved',
      data: deletedItem
    });
  } catch (error) {
    console.error('Error removing saved item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/saved/check/:itemId/:itemType
// @desc    Check if item is saved
// @access  Private
router.get('/check/:itemId/:itemType', auth, async (req, res) => {
  try {
    const { itemId, itemType } = req.params;

    const savedItem = await SavedItem.findOne({
      userId: req.user.id,
      itemId,
      itemType
    });

    res.json({
      success: true,
      isSaved: !!savedItem
    });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/saved/packages
// @desc    Get only saved packages
// @access  Private
router.get('/packages', auth, async (req, res) => {
  try {
    const savedPackages = await SavedItem.find({
      userId: req.user.id,
      itemType: 'package'
    }).sort({ savedAt: -1 });

    res.json({
      success: true,
      data: savedPackages
    });
  } catch (error) {
    console.error('Error fetching saved packages:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/saved/destinations
// @desc    Get only saved destinations
// @access  Private
router.get('/destinations', auth, async (req, res) => {
  try {
    const savedDestinations = await SavedItem.find({
      userId: req.user.id,
      itemType: 'destination'
    }).sort({ savedAt: -1 });

    res.json({
      success: true,
      data: savedDestinations
    });
  } catch (error) {
    console.error('Error fetching saved destinations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/saved/count
// @desc    Get count of saved items
// @access  Private
router.get('/count', auth, async (req, res) => {
  try {
    const count = await SavedItem.countDocuments({ userId: req.user.id });

    res.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error counting saved items:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;