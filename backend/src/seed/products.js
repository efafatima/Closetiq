import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'White Linen Shirt',
    description: 'Lightweight breathable linen shirt for casual and office looks.',
    category: 'Tops',
    price: 42,
    salePrice: 36,
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'],
    colors: ['White', 'Cream'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 24,
    brand: 'ClosetIQ Basics',
    rating: 4.6,
    tags: ['linen', 'summer', 'office'],
  },
  {
    name: 'Navy Tailored Blazer',
    description: 'Structured blazer that sharpens workwear and evening outfits.',
    category: 'Tops',
    price: 120,
    salePrice: 98,
    images: ['https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=900&q=80'],
    colors: ['Navy', 'Black'],
    sizes: ['S', 'M', 'L'],
    stock: 12,
    brand: 'Atelier Mode',
    rating: 4.8,
    tags: ['blazer', 'office', 'formal'],
  },
  {
    name: 'Black Slim Jeans',
    description: 'Everyday slim-fit denim with a clean dark wash.',
    category: 'Bottoms',
    price: 58,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80'],
    colors: ['Black'],
    sizes: ['26', '28', '30', '32', '34'],
    stock: 30,
    brand: 'Denim Studio',
    rating: 4.4,
    tags: ['denim', 'casual'],
  },
  {
    name: 'Beige Wide-Leg Trousers',
    description: 'Soft drape trousers for polished everyday styling.',
    category: 'Bottoms',
    price: 64,
    images: ['https://images.unsplash.com/photo-1506629905607-d9c297d4f5f1?auto=format&fit=crop&w=900&q=80'],
    colors: ['Beige', 'Cream'],
    sizes: ['S', 'M', 'L'],
    stock: 18,
    brand: 'Urban Ease',
    rating: 4.5,
    tags: ['trousers', 'office'],
  },
  {
    name: 'Floral Midi Dress',
    description: 'Easy midi dress with a soft floral print for daytime events.',
    category: 'Dresses',
    price: 86,
    salePrice: 72,
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80'],
    colors: ['Pink', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 16,
    brand: 'Bloom Label',
    rating: 4.7,
    tags: ['dress', 'party', 'spring'],
  },
  {
    name: 'White Leather Sneakers',
    description: 'Minimal sneakers that work with denim, dresses, and smart casual outfits.',
    category: 'Shoes',
    price: 78,
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'],
    colors: ['White'],
    sizes: ['6', '7', '8', '9', '10'],
    stock: 22,
    brand: 'StepLine',
    rating: 4.6,
    tags: ['sneakers', 'casual'],
  },
  {
    name: 'Tan Leather Loafers',
    description: 'Classic loafers for office and smart casual outfits.',
    category: 'Shoes',
    price: 92,
    images: ['https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80'],
    colors: ['Brown', 'Tan'],
    sizes: ['6', '7', '8', '9', '10'],
    stock: 14,
    brand: 'Heritage Walk',
    rating: 4.5,
    tags: ['loafers', 'office'],
  },
  {
    name: 'Brown Crossbody Bag',
    description: 'Compact everyday bag with a clean structured shape.',
    category: 'Bags',
    price: 68,
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80'],
    colors: ['Brown'],
    sizes: ['One Size'],
    stock: 20,
    brand: 'Carry Co.',
    rating: 4.3,
    tags: ['bag', 'accessory'],
  },
  {
    name: 'Gold Hoop Earrings',
    description: 'Polished gold hoops for simple outfit finishing.',
    category: 'Accessories',
    price: 24,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'],
    colors: ['Gold'],
    sizes: ['One Size'],
    stock: 40,
    brand: 'Luma Jewelry',
    rating: 4.4,
    tags: ['jewelry', 'earrings'],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    for (const product of products) {
      await Product.findOneAndUpdate(
        { name: product.name },
        product,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    console.log(`Seeded ${products.length} products`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Product seed failed:', error);
    process.exit(1);
  }
};

seedProducts();
