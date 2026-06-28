import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    styleScore: {
      type: Number,
      default: 0,
    },
    wardrobeStats: {
      totalItems: { type: Number, default: 0 },
      topCount: { type: Number, default: 0 },
      bottomCount: { type: Number, default: 0 },
      shoeCount: { type: Number, default: 0 },
    },
    preferences: {
      favoriteColors: [String],
      favoriteStyles: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
