import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ecommerce/ProductCard';
import { FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cartService, productService, wishlistService } from '@/services/services';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Shoes', 'Bags', 'Accessories'];
  const filters = useMemo(
    () => ({
      ...(selectedCategory !== 'All' ? { category: selectedCategory } : {}),
      ...(searchQuery ? { search: searchQuery } : {}),
    }),
    [searchQuery, selectedCategory]
  );

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts(filters);
        if (isMounted) setProducts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Could not load products');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  const addToCart = async (product) => {
    try {
      await cartService.addToCart(product._id, 1, product.sizes?.[0]);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to add items');
    }
  };

  const addToWishlist = async (product) => {
    try {
      await wishlistService.addToWishlist(product._id);
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Please sign in to save wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f0e8] pt-20 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-6 border-b border-[#d8c8b8] pb-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-secondary">
              Catalog
            </p>
            <h1 className="font-display text-5xl font-semibold text-text-primary md:text-7xl">
              New wardrobe
            </h1>
          </div>
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3 top-3.5 text-text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search collection"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#d8c8b8] bg-[#fbf7f0] py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-text-primary"
            />
          </div>
        </motion.div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                selectedCategory === cat
                  ? 'border-text-primary bg-text-primary text-white'
                  : 'border-[#d8c8b8] bg-[#fbf7f0] text-text-secondary hover:border-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="fashion-product-grid"
        >
          {loading && <p className="text-text-secondary">Loading products...</p>}
          {!loading && products.length === 0 && (
            <p className="text-text-secondary">No products found.</p>
          )}
          {!loading && products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
