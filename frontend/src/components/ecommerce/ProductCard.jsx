import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const image = product.image || product.images?.[0] || 'https://placehold.co/600x600?text=ClosetIQ';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-[#e8dccd] product-tile-image">
        <Link to={`/products/${product._id}`}>
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsWishlisted(!isWishlisted);
            onAddToWishlist?.(product);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 flex items-center justify-center shadow-soft"
          aria-label="Add to wishlist"
        >
          <FiHeart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
          />
        </motion.button>
        <button
          onClick={() => onAddToCart?.(product)}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-text-primary px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition group-hover:opacity-100"
        >
          <FiShoppingBag size={15} />
          Add
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-4 border-b border-[#d8c8b8] pb-4">
        <div className="min-w-0">
          <Link to={`/products/${product._id}`}>
            <h3 className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-text-primary hover:text-accent-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-secondary">
            {product.category}
          </p>
        </div>
        <p className="font-display text-lg font-semibold text-text-primary">
          ${product.salePrice || product.price}
        </p>
      </div>
    </motion.div>
  );
}
