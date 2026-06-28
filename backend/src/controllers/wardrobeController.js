import WardrobeItem from '../models/WardrobeItem.js';
import User from '../models/User.js';

export const getWardrobeItems = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { userId: req.userId };

    if (category) {
      query.category = category;
    }

    const items = await WardrobeItem.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addWardrobeItem = async (req, res) => {
  try {
    const { name, category, color, season, brand, size, imageUrl } = req.body;

    const item = new WardrobeItem({
      userId: req.userId,
      name,
      category,
      color,
      season,
      brand,
      size,
      imageUrl,
    });

    await item.save();

    // Update user wardrobe stats
    const user = await User.findById(req.userId);
    user.wardrobeStats.totalItems += 1;
    if (category === 'Tops') user.wardrobeStats.topCount += 1;
    if (category === 'Bottoms') user.wardrobeStats.bottomCount += 1;
    if (category === 'Shoes') user.wardrobeStats.shoeCount += 1;
    await user.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWardrobeItem = async (req, res) => {
  try {
    const item = await WardrobeItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWardrobeItem = async (req, res) => {
  try {
    await WardrobeItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGapAnalysis = async (req, res) => {
  try {
    const items = await WardrobeItem.find({ userId: req.userId });

    const categories = {
      Tops: 0,
      Bottoms: 0,
      Dresses: 0,
      Shoes: 0,
      Bags: 0,
      Accessories: 0,
    };

    items.forEach((item) => {
      categories[item.category]++;
    });

    const total = items.length;
    const analysis = {
      totalItems: total,
      categories,
      gaps: Object.entries(categories)
        .filter(([, count]) => count === 0 || count < total / 6)
        .map(([cat]) => cat),
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateOutfit = async (req, res) => {
  try {
    const { occasion = 'casual', season } = req.body;
    const query = { userId: req.userId };

    if (season && season !== 'all') {
      query.$or = [{ season }, { season: 'All Season' }];
    }

    const items = await WardrobeItem.find(query).sort({ isFavorite: -1, updatedAt: -1 });
    const pickItem = (categories) => items.find((item) => categories.includes(item.category));

    const outfit = {
      occasion,
      season: season || 'All Season',
      top: pickItem(['Tops', 'Dresses']),
      bottom: pickItem(['Bottoms']),
      shoes: pickItem(['Shoes']),
      accessory: pickItem(['Bags', 'Accessories']),
      missing: [],
      tips: [
        `Use your strongest ${season || 'all season'} pieces for this ${occasion} look.`,
        'Keep one neutral base and add one accent color for balance.',
      ],
    };

    if (!outfit.top) outfit.missing.push('Tops or Dresses');
    if (!outfit.bottom && outfit.top?.category !== 'Dresses') outfit.missing.push('Bottoms');
    if (!outfit.shoes) outfit.missing.push('Shoes');
    if (!outfit.accessory) outfit.missing.push('Bags or Accessories');

    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
