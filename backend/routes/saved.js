// ============================================
// BACKEND: routes/saved.js (CORRECT IMPORT)
// ============================================
import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js'; // ✅ CORRECT: Import default export

const router = express.Router();

// ============================================
// SAVED ITEM MODEL
// ============================================
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

// ============================================
// ROUTES
// ============================================

// @route   GET /api/saved
// @desc    Get all saved items for logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    console.log('GET /api/saved - User ID:', req.user.id);
    
    const savedItems = await SavedItem.find({ userId: req.user.id })
      .sort({ savedAt: -1 });

    console.log(`Found ${savedItems.length} saved items`);

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
    console.log('POST /api/saved - User ID:', req.user.id);
    console.log('Request body:', req.body);
    
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
      console.log('Item already saved');
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
    
    console.log('Item saved successfully:', savedItem);

    res.status(201).json({
      success: true,
      message: 'Item saved successfully',
      data: savedItem
    });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/saved/:itemId/:itemType
// @desc    Remove saved item
// @access  Private
router.delete('/:itemId/:itemType', auth, async (req, res) => {
  try {
    console.log('DELETE /api/saved - User ID:', req.user.id);
    console.log('Params:', req.params);
    
    const { itemId, itemType } = req.params;

    const deletedItem = await SavedItem.findOneAndDelete({
      userId: req.user.id,
      itemId,
      itemType
    });

    if (!deletedItem) {
      console.log('Item not found');
      return res.status(404).json({
        success: false,
        message: 'Saved item not found'
      });
    }

    console.log('Item deleted successfully');

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
    console.log('GET /api/saved/check - User ID:', req.user.id);
    console.log('Params:', req.params);
    
    const { itemId, itemType } = req.params;

    const savedItem = await SavedItem.findOne({
      userId: req.user.id,
      itemId,
      itemType
    });

    console.log('Item saved:', !!savedItem);

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
    console.log('GET /api/saved/packages - User ID:', req.user.id);
    
    const savedPackages = await SavedItem.find({
      userId: req.user.id,
      itemType: 'package'
    }).sort({ savedAt: -1 });

    console.log(`Found ${savedPackages.length} saved packages`);

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
    console.log('GET /api/saved/destinations - User ID:', req.user.id);
    
    const savedDestinations = await SavedItem.find({
      userId: req.user.id,
      itemType: 'destination'
    }).sort({ savedAt: -1 });

    console.log(`Found ${savedDestinations.length} saved destinations`);

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
    console.log('GET /api/saved/count - User ID:', req.user.id);
    
    const count = await SavedItem.countDocuments({ userId: req.user.id });

    console.log(`Total saved items: ${count}`);

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