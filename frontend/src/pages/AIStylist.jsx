import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { FiSend, FiStar, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { stylistService } from '@/services/services';

export default function AIStylist() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi, I'm your AI Fashion Stylist. Tell me the occasion, weather, or vibe and I'll suggest a polished outfit.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: cleanText,
    };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await stylistService.chat(cleanText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: res.data.reply,
        suggestions: res.data.suggestions || [],
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Sign in to use your AI stylist');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const quickPrompts = [
    '👗 Office outfit',
    '🌟 Night out',
    '🎓 University look',
    '🏖️ Casual weekend',
  ];

  const cleanQuickPrompts = quickPrompts.map((prompt) => prompt.replace(/[^\x20-\x7E]/g, '').trim());

  return (
    <div className="min-h-screen pt-24 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-white shadow-soft text-accent-700 font-semibold text-sm mb-5">
            <FiStar size={16} />
            Personal Style Intelligence
          </div>
          <h1 className="font-display text-5xl font-bold text-text-primary mb-3">
            AI Stylist Assistant
          </h1>
          <p className="text-text-secondary text-lg">
            Chat with your personal fashion AI to get outfit recommendations
          </p>
        </motion.div>

        {/* Chat Container */}
        <Card className="h-[560px] flex flex-col mb-6 p-0 overflow-hidden" hover={false}>
          <div className="px-6 py-4 border-b border-secondary-100 bg-white/80 flex items-center justify-between">
            <div>
              <p className="font-semibold text-text-primary">ClosetIQ Stylist</p>
              <p className="text-xs text-text-secondary">Ready with outfit ideas</p>
            </div>
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-soft" />
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-gradient-to-b from-white/20 to-bg-beige/70">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl shadow-soft ${
                    msg.type === 'user'
                      ? 'bg-accent-600 text-white rounded-br-md'
                      : 'bg-white text-text-primary rounded-bl-md border border-secondary-100'
                  }`}
                >
                  <p className="text-sm leading-6">{msg.text}</p>
                  {msg.suggestions && (
                    <div className="mt-3 space-y-1">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 transition px-2 py-1 rounded"
                        >
                          {sugg.item} • {sugg.category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent-600 rounded-full animate-bounce"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-6 pt-4 grid grid-cols-2 md:grid-cols-4 gap-2 bg-white/70">
              {cleanQuickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-sm px-3 py-2 bg-white hover:bg-secondary-100 border border-secondary-100 transition rounded-lg text-text-secondary font-medium"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-secondary-100 p-4 bg-white/80">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for outfit suggestions..."
              className="flex-1 px-4 py-3 bg-bg-beige border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-12 h-12 inline-flex items-center justify-center bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition disabled:opacity-50"
            >
              <FiSend size={20} />
            </button>
          </form>
        </Card>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="premium-panel rounded-2xl p-4 flex gap-3"
        >
          <FiZap className="text-accent-600 flex-shrink-0 mt-1" size={20} />
          <p className="text-sm text-text-secondary">
            Tip: Describe the occasion, weather, or mood for better recommendations!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
