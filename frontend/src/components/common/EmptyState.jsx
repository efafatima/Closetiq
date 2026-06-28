import { motion } from 'framer-motion';

export default function EmptyState({ title, description, icon: Icon, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      {Icon && (
        <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mb-6">
          <Icon size={40} className="text-accent-600" />
        </div>
      )}
      <h3 className="font-display text-2xl font-semibold text-text-primary mb-2 text-center">
        {title}
      </h3>
      <p className="text-text-secondary text-center max-w-md mb-8">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
