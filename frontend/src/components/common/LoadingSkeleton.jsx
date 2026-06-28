import { motion } from 'framer-motion';

export default function LoadingSkeleton({ count = 6, type = 'card' }) {
  const variants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            variants={variants}
            animate="animate"
            className="bg-gray-200 rounded-lg h-64"
          />
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            variants={variants}
            animate="animate"
            className="bg-gray-200 rounded h-4"
          />
        ))}
      </div>
    );
  }

  return null;
}
