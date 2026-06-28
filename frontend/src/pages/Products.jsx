import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ecommerce/ProductCard';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiGift,
  FiRefreshCcw,
  FiSearch,
  FiShield,
  FiTruck,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { cartService, productService, wishlistService } from '@/services/services';

const categoryPromos = [
  {
    title: 'Goggles',
    label: 'Summer look',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    category: 'Accessories',
  },
  {
    title: 'Big Offer',
    label: 'Save up to 40%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    category: 'Shoes',
  },
  {
    title: 'New One',
    label: 'Fresh arrivals',
    image: 'https://images.unsplash.com/photo-1506629905607-d9c297d4f5f1?auto=format&fit=crop&w=600&q=80',
    category: 'Tops',
  },
];

const storeServices = [
  ['Free delivery', 'On wardrobe picks', FiTruck],
  ['Easy return', '7 day replacement', FiRefreshCcw],
  ['Secure checkout', 'Protected orders', FiShield],
  ['Gift offers', 'Weekly style deals', FiGift],
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePromo, setActivePromo] = useState(0);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePromo((current) => (current + 1) % categoryPromos.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-[#FFF7F3] pt-16">
      <section className="relative overflow-hidden bg-white">
        <div className="grid min-h-[34rem] items-stretch lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="relative flex min-h-[28rem] items-end justify-center overflow-hidden bg-white"
          >
            <img
              src="/girl.png"
              alt="ClosetIQ fashion model"
              className="h-[33rem] w-full scale-110 object-contain object-bottom sm:h-[39rem] lg:h-[44rem]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex min-h-[24rem] flex-col items-center justify-center bg-white px-6 text-center sm:px-10"
          >
            <p className="font-display text-2xl italic text-[#D96C8C] sm:text-3xl">The all new</p>
            <h1 className="mt-2 max-w-xl text-4xl font-black uppercase leading-tight tracking-[0.02em] text-[#202020] sm:text-6xl lg:text-7xl">
              Change Your Look
            </h1>
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-0 px-4 pb-8 sm:px-6 md:grid-cols-3 lg:px-8">
          {categoryPromos.map((promo, index) => (
            <motion.button
              key={promo.title}
              type="button"
              onClick={() => {
                setActivePromo(index);
                setSelectedCategory(promo.category);
              }}
              whileHover={{ y: -5 }}
              className={`grid min-h-28 grid-cols-[0.9fr_1.1fr] overflow-hidden text-left transition ${
                activePromo === index ? 'bg-[#F2F2F2]' : 'bg-[#FAFAFA]'
              }`}
            >
              <img src={promo.image} alt={promo.title} className="h-full w-full object-cover" />
              <span className="flex flex-col justify-center px-5">
                <span className="text-lg font-bold text-[#202020]">{promo.title}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D96C8C]">{promo.label}</span>
                <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#D96C8C] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white">
                  Shop now <FiArrowRight />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D96C8C]">
              Trending Product
            </p>
            <h2 className="mt-2 font-body text-3xl font-bold text-[#251D24] md:text-4xl">
              Store Collection
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#6B6268]">
              Browse products selected to match your digital wardrobe and complete your everyday outfits.
            </p>
          </div>
          <div className="relative mx-auto w-full md:mx-0 md:w-80">
            <FiSearch className="absolute left-4 top-3.5 text-[#8A7E86]" size={18} />
            <input
              type="text"
              placeholder="Search store"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#F0DCE4] bg-white py-3 pl-11 pr-4 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-[#D96C8C]/20"
            />
          </div>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2 md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                selectedCategory === cat
                  ? 'border-[#251D24] bg-[#251D24] text-white'
                  : 'border-[#F0DCE4] bg-white text-[#5F5360] shadow-soft hover:border-[#D96C8C] hover:text-[#D96C8C]'
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
            <div className="col-span-full rounded-[1.5rem] bg-white p-8 text-center shadow-soft">
              <p className="font-semibold text-[#251D24]">No products found.</p>
              <p className="mt-2 text-sm text-[#6B6268]">Try another category or seed your store products.</p>
            </div>
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

      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {storeServices.map(([title, copy, Icon]) => (
            <div key={title} className="flex items-center justify-center gap-3 rounded-2xl bg-[#FFF7F3] px-4 py-4 text-center md:justify-start md:text-left">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#D96C8C] shadow-soft">
                <Icon size={19} />
              </span>
              <span>
                <span className="block text-sm font-bold text-[#251D24]">{title}</span>
                <span className="block text-xs text-[#6B6268]">{copy}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="relative min-h-[26rem] w-full overflow-hidden bg-[#202020] shadow-[0_28px_70px_rgba(32,32,32,0.20)]">
          <img
            src="/banner.jpg"
            alt="ClosetIQ special offer fashion banner"
            onError={(event) => {
              event.currentTarget.src = 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1200&q=85';
            }}
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 flex min-h-[26rem] flex-col items-center justify-center px-6 py-12 text-center text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F9A8C0]">Limited time</p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-tight sm:text-5xl">
              Special Offer
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
              Complete your look with AI-picked accessories, sunglasses, shoes, and wardrobe essentials at exclusive seasonal prices.
            </p>
            <button
              onClick={() => setSelectedCategory('Accessories')}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#D96C8C] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#C85A7D]"
            >
              Shop offer <FiArrowUpRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
