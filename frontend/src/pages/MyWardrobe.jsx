import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import EmptyState from '@/components/common/EmptyState';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { FiPlus, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { wardrobeService } from '@/services/services';

const categories = ['Tops', 'Bottoms', 'Dresses', 'Shoes', 'Bags', 'Accessories'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];
const initialForm = {
  name: '',
  category: 'Tops',
  color: '',
  season: 'All Season',
  brand: '',
  size: '',
  imageUrl: '',
};

export default function MyWardrobe() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadWardrobe = async () => {
      setLoading(true);
      try {
        const res = await wardrobeService.getItems(
          selectedCategory === 'all' ? undefined : { category: selectedCategory }
        );
        if (isMounted) setItems(res.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Sign in to load your wardrobe');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWardrobe();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      [item.name, item.category, item.color, item.brand, item.season]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [items, searchQuery]);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await wardrobeService.addItem(formData);
      setItems((current) => [res.data, ...current]);
      setFormData(initialForm);
      setShowForm(false);
      toast.success('Wardrobe item added');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add wardrobe item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
        >
          <div>
            <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
              My Wardrobe
            </h1>
            <p className="text-text-secondary">
              Organize and manage your clothing collection
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold"
          >
            <FiPlus size={20} />
            Add Item
          </button>
        </motion.div>

        {showForm && (
          <Card className="mb-8" hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-text-primary">Add Item</h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 rounded-lg bg-secondary-100 inline-flex items-center justify-center"
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Item name"
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <input
                value={formData.color}
                onChange={(e) => updateField('color', e.target.value)}
                placeholder="Color"
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              />
              <select
                value={formData.season}
                onChange={(e) => updateField('season', e.target.value)}
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              >
                {seasons.map((season) => (
                  <option key={season}>{season}</option>
                ))}
              </select>
              <input
                value={formData.brand}
                onChange={(e) => updateField('brand', e.target.value)}
                placeholder="Brand"
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              />
              <input
                value={formData.size}
                onChange={(e) => updateField('size', e.target.value)}
                placeholder="Size"
                className="px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              />
              <input
                value={formData.imageUrl}
                onChange={(e) => updateField('imageUrl', e.target.value)}
                placeholder="Image URL"
                className="md:col-span-2 px-4 py-3 bg-bg-beige border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
              />
              <button
                type="submit"
                disabled={saving}
                className="md:col-span-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Item'}
              </button>
            </form>
          </Card>
        )}

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search your wardrobe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-secondary-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-600"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-accent-600 text-white'
                  : 'bg-white border border-secondary-100 text-text-secondary hover:border-accent-600'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-accent-600 text-white'
                    : 'bg-white border border-secondary-100 text-text-secondary hover:border-accent-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items Grid */}
        {loading ? (
          <LoadingSkeleton count={6} type="card" />
        ) : items.length === 0 ? (
          <EmptyState
            title="No items yet"
            description="Start building your digital wardrobe by adding your first item"
            icon={FiPlus}
            action={{ label: 'Add First Item', onClick: () => setShowForm(true) }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden group">
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 h-40">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary">
                        {item.category}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-primary truncate">{item.name}</h3>
                  <p className="text-text-secondary text-sm">{item.category}</p>
                  <div className="flex gap-2 mt-3">
                    {item.color && (
                      <span className="px-2 py-1 bg-secondary-100 rounded text-xs text-text-secondary">
                        {item.color}
                      </span>
                    )}
                    {item.season && (
                      <span className="px-2 py-1 bg-secondary-100 rounded text-xs text-text-secondary">
                        {item.season}
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
