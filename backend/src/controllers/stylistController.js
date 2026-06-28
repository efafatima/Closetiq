import WardrobeItem from '../models/WardrobeItem.js';

export const chatWithStylist = async (req, res) => {
  try {
    const { message = '' } = req.body;
    const items = await WardrobeItem.find({ userId: req.userId }).sort({
      isFavorite: -1,
      updatedAt: -1,
    });

    const suggestions = ['Tops', 'Bottoms', 'Shoes']
      .map((category) => items.find((item) => item.category === category))
      .filter(Boolean)
      .map((item) => ({ item: item.name, category: item.category }));

    const reply =
      suggestions.length > 0
        ? `For "${message}", I found ${suggestions.length} wardrobe pieces that can work together. Start with a clean base, then add one accent color.`
        : 'Add a few wardrobe items first, then I can suggest outfits from your real closet.';

    res.json({ reply, suggestions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
