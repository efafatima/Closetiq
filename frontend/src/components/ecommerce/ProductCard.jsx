import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const image = product.image || product.images?.[0] || 'https://placehold.co/600x600?text=ClosetIQ';
  const price = product.salePrice || product.price;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex h-full cursor-pointer flex-col rounded-[1.5rem] bg-white p-3 shadow-[0_14px_34px_rgba(37,29,36,0.08)] transition duration-300 hover:shadow-[0_20px_44px_rgba(217,108,140,0.16)]"
    >
      <div className="product-tile-image relative shrink-0 overflow-hidden rounded-[1.25rem] bg-[#e8dccd]">
        <Link to={`/products/${product._id}`}>
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsWishlisted(!isWishlisted);
            onAddToWishlist?.(product);
          }}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 shadow-soft"
          aria-label="Add to wishlist"
        >
          <FiHeart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
          />
        </motion.button>
        <button
          onClick={() => onAddToCart?.(product)}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-full bg-[#251D24] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white opacity-0 shadow-[0_12px_28px_rgba(37,29,36,0.20)] transition group-hover:opacity-100"
        >
          <FiShoppingBag size={15} />
          Add
        </button>
      </div>

      <div className="mt-4 flex min-h-[6.25rem] flex-1 items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <Link to={`/products/${product._id}`}>
            <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold uppercase leading-5 tracking-[0.12em] text-text-primary transition hover:text-accent-600">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-text-secondary">
            {product.category}
          </p>
        </div>
        <p className="font-display text-lg font-semibold text-text-primary">
          ${price}
        </p>
      </div>
    </motion.div>
  );
}
