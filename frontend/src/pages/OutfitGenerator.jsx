import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { wardrobeService } from '@/services/services';

export default function OutfitGenerator() {
  const [selectedOccasion, setSelectedOccasion] = useState('Casual');
  const [selectedSeason, setSelectedSeason] = useState('Spring');
  const [generatedOutfit, setGeneratedOutfit] = useState(null);
  const [loading, setLoading] = useState(false);

  const occasions = ['Casual', 'Office', 'Party', 'Wedding', 'University'];
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await wardrobeService.generateOutfit({
        occasion: selectedOccasion,
        season: selectedSeason,
      });
      setGeneratedOutfit(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sign in and add wardrobe items first');
    } finally {
      setLoading(false);
    }
  };

  const itemLabel = (item, fallback) => item?.name || fallback;

  return (
    <div className="min-h-screen pt-20 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl font-bold text-text-primary mb-2">
            Outfit Generator
          </h1>
          <p className="text-text-secondary">
            Create perfect outfits for any occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="sticky top-24">
              <h2 className="font-semibold text-text-primary mb-6 flex items-center gap-2">
                <FiFilter size={20} />
                Outfit Filters
              </h2>

              {/* Occasion */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Occasion
                </label>
                <div className="space-y-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedOccasion === occ
                          ? 'bg-accent-600 text-white'
                          : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Season */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-text-primary mb-3">
                  Season
                </label>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedSeason === season
                          ? 'bg-accent-600 text-white'
                          : 'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate Outfit'}
              </button>
            </Card>
          </motion.div>

          {/* Outfit Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {generatedOutfit ? (
              <Card>
                <div className="grid grid-cols-2 gap-6">
                  {/* Outfit Items */}
                  <div className="space-y-4">
                    <div className="h-40 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center">
                      <p className="text-text-secondary">{itemLabel(generatedOutfit.top, 'Missing top')}</p>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-secondary-200 to-secondary-100 rounded-lg flex items-center justify-center">
                      <p className="text-text-secondary">
                        {itemLabel(generatedOutfit.bottom, generatedOutfit.top?.category === 'Dresses' ? 'Dress selected' : 'Missing bottom')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-40 bg-gradient-to-br from-accent-600/10 to-accent-600/5 rounded-lg flex items-center justify-center">
                      <p className="text-text-secondary">{itemLabel(generatedOutfit.shoes, 'Missing shoes')}</p>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-secondary-100/50 to-secondary-200/50 rounded-lg flex items-center justify-center">
                      <p className="text-text-secondary">{itemLabel(generatedOutfit.accessory, 'Optional accessory')}</p>
                    </div>
                  </div>
                </div>

                {/* Styling Tips */}
                <div className="mt-8 border-t border-secondary-100 pt-6">
                  <h3 className="font-semibold text-text-primary mb-4">Styling Tips</h3>
                  <ul className="space-y-2">
                    {generatedOutfit.tips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-accent-600 font-bold">✓</span>
                        <span className="text-text-secondary text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition font-semibold">
                    Save Outfit
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-accent-600 text-accent-600 rounded-lg hover:bg-accent-50 transition font-semibold">
                    Shop Missing Items
                  </button>
                </div>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-text-secondary mb-4">
                    Select occasion and season to generate an outfit
                  </p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
