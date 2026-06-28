import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCamera,
  FiCloud,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiSliders,
  FiStar,
  FiSun,
  FiUploadCloud,
  FiZap,
} from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const featureCards = [
  {
    title: 'Digital Wardrobe',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85',
    description:
      'Organize your clothing digitally, upload outfits, categorize items, and manage your personal collection effortlessly.',
    button: 'Open Wardrobe',
    to: '/wardrobe',
    icon: FiLayers,
  },
  {
    title: 'AI Outfit Stylist',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
    description:
      'Receive personalized outfit recommendations based on weather, occasion, color combinations, and the clothes available in your wardrobe.',
    button: 'Get Suggestions',
    to: '/stylist',
    icon: FiZap,
  },
  {
    title: 'Fashion Store',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85',
    description:
      'Discover trending fashion items and purchase pieces that perfectly complement your existing wardrobe.',
    button: 'Shop Now',
    to: '/products',
    icon: FiShoppingBag,
  },
];

const steps = [
  ['Upload your clothes', FiUploadCloud],
  ['Organize your wardrobe', FiSliders],
  ['Ask AI for outfit recommendations', FiMessageCircle],
  ['Purchase matching fashion items', FiShoppingCart],
];

const reasons = [
  ['AI-powered outfit recommendations', FiZap],
  ['Smart wardrobe management', FiLayers],
  ['Personalized shopping', FiShoppingBag],
  ['Occasion-based styling', FiStar],
  ['Weather-aware suggestions', FiCloud],
  ['Modern fashion experience', FiHeart],
];

const testimonials = [
  {
    name: 'Ayesha Khan',
    role: 'Final year student',
    quote:
      'Nayak makes outfit planning feel effortless. I can see my wardrobe, get ideas instantly, and shop only what I actually need.',
  },
  {
    name: 'Mira Shah',
    role: 'Boutique owner',
    quote:
      'The interface feels premium and practical. It explains AI styling in a way fashion users understand right away.',
  },
  {
    name: 'Zara Malik',
    role: 'Style creator',
    quote:
      'I love the soft visuals, clean store flow, and personalized styling concept. It feels like a real fashion tech product.',
  },
];

export default function Landing() {
  return (
    <div className="overflow-hidden bg-[#FFF7F3] text-[#251D24]">
      <section className="relative min-h-[calc(100vh-4rem)] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,108,140,0.20),transparent_28%),radial-gradient(circle_at_84%_24%,rgba(125,95,255,0.18),transparent_26%),linear-gradient(135deg,#FFF7F3_0%,#FFF0F7_48%,#F6F1FF_100%)]" />
        <div className="absolute left-8 top-28 hidden h-24 w-24 rounded-full border border-white/80 bg-white/35 backdrop-blur-md lg:block" />
        <div className="absolute bottom-20 right-10 hidden h-32 w-32 rounded-[2rem] border border-white/80 bg-white/30 rotate-12 backdrop-blur-md lg:block" />

        <div className="relative mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7D5FFF] shadow-soft backdrop-blur-xl"
            >
              <FiSun className="text-[#D96C8C]" />
              Fashion intelligence for every day
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl font-body text-5xl font-semibold leading-[1.04] text-[#201820] sm:text-6xl lg:text-7xl"
            >
              Your Smart AI Fashion Companion
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-[#685B67] sm:text-lg"
            >
              Manage your digital wardrobe, receive AI-powered outfit recommendations, and shop fashion items-all in one intelligent platform.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/wardrobe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D96C8C] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(217,108,140,0.28)] transition hover:-translate-y-0.5 hover:bg-[#C85A7D]"
              >
                Explore Wardrobe <FiArrowRight />
              </Link>
              <Link
                to="/stylist"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#7D5FFF]/25 bg-white/75 px-6 py-3 text-sm font-semibold text-[#7D5FFF] shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#7D5FFF] hover:bg-white"
              >
                Try AI Stylist <FiZap />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#302331]/10 bg-[#251D24] px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#3A2B3A]"
              >
                Shop Collection <FiShoppingBag />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.18 }}
            className="relative"
          >
            <div className="absolute -left-4 top-10 z-10 rounded-3xl border border-white/80 bg-white/70 p-4 shadow-premium backdrop-blur-xl sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#FDE7EF] text-[#D96C8C]">
                  <FiCamera />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7D5FFF]">Closet scan</p>
                  <p className="text-sm font-semibold text-[#251D24]">42 items styled</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 bottom-10 z-10 rounded-3xl border border-white/80 bg-white/75 p-4 shadow-premium backdrop-blur-xl sm:-right-8">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EEE9FF] text-[#7D5FFF]">
                  <FiHeart />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D96C8C]">AI pick</p>
                  <p className="text-sm font-semibold text-[#251D24]">Date night look</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/55 p-3 shadow-[0_30px_90px_rgba(70,45,82,0.18)] backdrop-blur-xl">
              <div className="grid aspect-[4/5] grid-cols-[0.8fr_1.2fr] gap-3 overflow-hidden rounded-[1.5rem] bg-white">
                <div className="flex flex-col gap-3 bg-[#FFF7F3] p-3">
                  {[
                    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=500&q=85',
                    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=85',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=85',
                  ].map((image, index) => (
                    <motion.img
                      key={image}
                      src={image}
                      alt={`Nayak wardrobe preview ${index + 1}`}
                      className="min-h-0 flex-1 rounded-2xl object-cover shadow-soft"
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    />
                  ))}
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
                    alt="Nayak AI fashion assistant with wardrobe and shopping elements"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-soft backdrop-blur-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7D5FFF]">AI recommendation</p>
                    <p className="mt-1 text-lg font-semibold text-[#251D24]">Blush blazer + satin top</p>
                    <div className="mt-3 flex gap-2">
                      {['Work', 'Rainy', 'Elegant'].map((tag) => (
                        <span key={tag} className="rounded-full bg-[#FFF0F7] px-3 py-1 text-xs font-medium text-[#D96C8C]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp} className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D96C8C]">Premium features</p>
          <h2 className="mt-3 font-body text-3xl font-semibold text-[#251D24] sm:text-4xl">Everything your wardrobe needs</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/80 shadow-[0_20px_60px_rgba(65,39,58,0.10)] backdrop-blur-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/80 text-[#D96C8C] shadow-soft backdrop-blur-xl">
                    <Icon size={22} />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-body text-2xl font-semibold text-[#251D24]">{feature.title}</h3>
                  <p className="mt-3 min-h-[7rem] text-sm leading-7 text-[#685B67]">{feature.description}</p>
                  <Link
                    to={feature.to}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#251D24] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96C8C]"
                  >
                    {feature.button} <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <section className="bg-white/55 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7D5FFF]">How it works</p>
              <h2 className="mt-3 font-body text-3xl font-semibold text-[#251D24] sm:text-4xl">From closet to complete outfit</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#685B67]">
              Nayak turns scattered clothing into a guided styling system for daily looks, events, and shopping decisions.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {steps.map(([step, Icon], index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08 }}
                className="relative rounded-[1.5rem] border border-[#F1DCE5] bg-[#FFF7F3] p-6 shadow-soft"
              >
                <span className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#D96C8C] shadow-soft">
                  <Icon size={22} />
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7D5FFF]">Step {index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold text-[#251D24]">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#D96C8C]">Why choose Nayak</p>
          <h2 className="mt-3 font-body text-3xl font-semibold text-[#251D24] sm:text-4xl">Luxury style decisions, powered by AI</h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(([reason, Icon]) => (
            <motion.div
              key={reason}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.01 }}
              className="rounded-[1.4rem] border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur-xl"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#EEE9FF] text-[#7D5FFF]">
                <Icon size={21} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-[#251D24]">{reason}</h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/80 bg-[#251D24] px-5 py-14 text-white shadow-[0_30px_90px_rgba(37,29,36,0.22)] sm:px-10">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F9A8C0]">Testimonials</p>
            <h2 className="mt-3 font-body text-3xl font-semibold sm:text-4xl">Loved by style-first users</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <motion.figure
                key={item.name}
                whileHover={{ y: -6 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex text-[#F9A8C0]">
                  {[...Array(5)].map((_, index) => (
                    <FiStar key={index} className="fill-current" />
                  ))}
                </div>
                <blockquote className="text-sm leading-7 text-white/78">"{item.quote}"</blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-white/55">{item.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
