import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      onClick={onClick}
      className={`premium-panel rounded-2xl p-6 transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
