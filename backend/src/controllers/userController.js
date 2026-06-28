import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWardrobeStats = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.wardrobeStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStyleScore = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ styleScore: user.styleScore });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
