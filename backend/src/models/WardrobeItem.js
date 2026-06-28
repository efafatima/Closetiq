import mongoose from 'mongoose';

const wardrobeItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Bags', 'Accessories'],
      required: true,
    },
    color: String,
    season: {
      type: String,
      enum: ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'],
      default: 'All Season',
    },
    brand: String,
    size: String,
    imageUrl: String,
    condition: {
      type: String,
      enum: ['New', 'Like New', 'Good', 'Fair'],
      default: 'Good',
    },
    tags: [String],
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('WardrobeItem', wardrobeItemSchema);
