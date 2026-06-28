import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: Number,
    images: [String],
    colors: [String],
    sizes: [String],
    stock: {
      type: Number,
      default: 0,
    },
    brand: String,
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        date: Date,
      },
    ],
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
