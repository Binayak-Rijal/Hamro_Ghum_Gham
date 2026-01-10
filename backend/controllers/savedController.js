import User from '../models/User.js';

// @desc    Save/Add a package to user profile
export const savePackage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const exists = user.savedPackages.find(p => p.packageId === req.body.id);
    
    if (exists) {
      return res.status(400).json({ success: false, message: 'Package already saved' });
    }

    user.savedPackages.push({ ...req.body, packageId: req.body.id });
    await user.save();
    res.json({ success: true, savedPackages: user.savedPackages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove a package
export const removePackage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedPackages = user.savedPackages.filter(p => p.packageId !== req.params.id);
    await user.save();
    res.json({ success: true, savedPackages: user.savedPackages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all saved items
export const getSavedItems = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      savedPackages: user.savedPackages,
      savedDestinations: user.savedDestinations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};