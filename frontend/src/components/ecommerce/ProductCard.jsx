import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart, onAddToWishlist }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const image = product.image || product.images?.[0] || 'https://placehold.co/600x600?text=ClosetIQ';
  const price = product.salePrice || product.price;
  const detailLine = product.description || `${product.brand || 'ClosetIQ'} ${product.category}`;
  const colorLine = product.colors?.length ? product.colors.slice(0, 3).join(', ') : 'Selected shades';
  const materialLine = product.tags?.length
    ? product.tags.slice(0, 3).join(' / ')
    : product.brand || 'Premium finish';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group flex h-full cursor-pointer flex-col rounded-[1.75rem] bg-white p-3 shadow-[0_14px_34px_rgba(37,29,36,0.08)] transition duration-300 hover:shadow-[0_24px_54px_rgba(217,108,140,0.22)]"
    >
      <div className="product-tile-image relative shrink-0 overflow-hidden rounded-[1.45rem] bg-[#e8dccd]">
        <Link to={`/products/${product._id}`}>
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#251D24]/92 via-[#251D24]/45 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="translate-y-3 transition duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
              {product.brand || product.category}
            </p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white">
              {detailLine}
            </p>
            <div className="mt-3 grid gap-1 text-xs text-white/78">
              <span>Material/detail: {materialLine}</span>
              <span>Colors: {colorLine}</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-display text-2xl font-semibold text-white">
                ${price}
              </span>
              <Link
                to={`/products/${product._id}`}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#251D24] transition hover:bg-[#FCE6EF]"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
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
          className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-2 rounded-full bg-[#D96C8C] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white opacity-0 shadow-[0_12px_28px_rgba(217,108,140,0.32)] transition group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <FiShoppingBag size={15} />
          Add
        </button>
      </div>

      <div className="mt-4 flex min-h-[6.25rem] flex-1 items-start justify-between gap-4 px-1 pb-2">
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
