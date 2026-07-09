import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import EmptyState from '@/components/common/EmptyState';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { FiCamera, FiHeart, FiPlus, FiSearch, FiX } from 'react-icons/fi';
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

const heroShots = [
  { label: 'Soft layers', position: '18% 16%' },
  { label: 'Statement hat', position: '50% 40%' },
  { label: 'Evening profile', position: '82% 24%' },
];

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

  const openAddForm = () => {
    setFormData((current) => ({
      ...current,
      category: selectedCategory === 'all' ? current.category : selectedCategory,
    }));
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mode = e.nativeEvent.submitter?.value || 'close';
    setSaving(true);
    try {
      const res = await wardrobeService.addItem(formData);
      setItems((current) => [res.data, ...current]);
      if (mode === 'add-next') {
        setFormData({
          ...initialForm,
          category: formData.category,
          season: formData.season,
        });
        setShowForm(true);
        toast.success('Item added. Add the next one.');
      } else {
        setFormData(initialForm);
        setShowForm(false);
        toast.success('Wardrobe item added');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Could not add wardrobe item');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F2EE] px-4 pb-16 pt-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#E6D5C8] shadow-[0_28px_80px_rgba(61,45,38,0.16)]"
        >
          <div className="grid min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative flex min-h-[500px] flex-col justify-between bg-[#D7C0AF] p-6 text-[#2B211D] sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.34),transparent_45%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7E5A4B]">Digital closet</p>
                <h1 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
                  My Wardrobe
                </h1>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#5D4B43] sm:text-base">
                  Curate outfits, organize pieces, and shape a wardrobe that feels editorial, wearable, and personal.
                </p>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 bg-white/65 p-4 shadow-soft backdrop-blur-xl">
                  <span className="grid h-10 w-10 place-items-center bg-[#251D24] text-white">
                    <FiCamera size={18} />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold text-[#251D24]">{items.length}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6E5146]">Saved pieces</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/65 p-4 shadow-soft backdrop-blur-xl">
                  <span className="grid h-10 w-10 place-items-center bg-[#D96C8C] text-white">
                    <FiHeart size={18} />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold text-[#251D24]">{selectedCategory === 'all' ? 'All' : selectedCategory}</p>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6E5146]">Current rail</p>
                  </div>
                </div>
              </div>

              <div className="relative grid grid-cols-3 gap-3">
                {heroShots.map((shot) => (
                  <div key={shot.label} className="group overflow-hidden rounded-xl bg-white/50 shadow-soft">
                    <div className="h-36 bg-cover bg-center transition duration-500 group-hover:scale-105 sm:h-44" style={{ backgroundImage: 'url(/wadrob.jpg)', backgroundPosition: shot.position }} />
                    <p className="bg-white/78 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6E5146]">
                      {shot.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden bg-[#BFA18D]">
              <img
                src="/wadrob.jpg"
                alt="Editorial wardrobe collage with one model in multiple fashion poses"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,29,36,0.18),transparent_40%),linear-gradient(0deg,rgba(37,29,36,0.34),transparent_42%)]" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xs bg-white/88 p-4 shadow-premium backdrop-blur-xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9B6D5B]">Today&apos;s edit</p>
                  <p className="mt-2 font-display text-2xl font-semibold text-[#251D24]">Soft, structured, styled</p>
                </div>
                <button
                  onClick={openAddForm}
                  className="inline-flex items-center justify-center gap-2 bg-[#251D24] px-5 py-3 text-sm font-semibold text-white shadow-premium transition hover:bg-[#D96C8C]"
                >
                  <FiPlus size={18} />
                  Add Item
                </button>
              </div>
            </div>
          </div>
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
              <div className="md:col-span-2 grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  value="add-next"
                  disabled={saving}
                  className="px-6 py-3 bg-[#251D24] text-white rounded-lg hover:bg-[#3A3038] transition font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save & Add Next'}
                </button>
                <button
                  type="submit"
                  value="close"
                  disabled={saving}
                  className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Item'}
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4 rounded-2xl border border-white/80 bg-white/72 p-4 shadow-soft backdrop-blur-xl"
        >
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-[#9B6D5B]" size={20} />
            <input
              type="text"
              placeholder="Search your wardrobe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#E7D5CA] bg-[#FFFDFB] py-3 pl-12 pr-4 text-[#251D24] outline-none transition placeholder:text-[#9B8A83] focus:border-[#D96C8C] focus:ring-2 focus:ring-[#D96C8C]/18"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-[#251D24] text-white'
                  : 'border border-[#E7D5CA] bg-[#FFFDFB] text-[#5F5360] hover:border-[#D96C8C] hover:text-[#D96C8C]'
              }`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-[#251D24] text-white'
                    : 'border border-[#E7D5CA] bg-[#FFFDFB] text-[#5F5360] hover:border-[#D96C8C] hover:text-[#D96C8C]'
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
            action={{ label: 'Add First Item', onClick: openAddForm }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="group overflow-hidden p-0">
                  <div className="relative h-64 overflow-hidden bg-[#E6D5C8]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-display text-2xl text-[#7E5A4B]">
                        {item.category}
                      </div>
                    )}
                    <span className="absolute left-4 top-4 bg-white/88 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9B6D5B] backdrop-blur-xl">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="truncate font-display text-2xl font-semibold text-[#251D24]">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#5F5360]">{item.brand || 'Closet edit'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.color && (
                      <span className="bg-[#F8F2EE] px-3 py-1 text-xs font-medium text-[#7E5A4B]">
                        {item.color}
                      </span>
                    )}
                    {item.season && (
                      <span className="bg-[#FFF0F7] px-3 py-1 text-xs font-medium text-[#D96C8C]">
                        {item.season}
                      </span>
                    )}
                  </div>
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
