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
    <div className="relative min-h-screen overflow-hidden px-4 py-12 pt-24">
      <div className="absolute inset-0">
        <img
          src="/Ai section.png"
          alt="AI stylist fashion background"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,29,36,0.88),rgba(37,29,36,0.58),rgba(255,247,243,0.74))]" />
        <div className="absolute inset-0 bg-[#FFF7F3]/18 backdrop-blur-[1px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/14 px-4 py-2 text-sm font-semibold text-white shadow-soft backdrop-blur-xl">
            <FiStar size={16} />
            Personal Style Intelligence
          </div>
          <h1 className="mb-3 font-display text-5xl font-bold text-white drop-shadow-sm">
            AI Stylist Assistant
          </h1>
          <p className="max-w-xl text-lg leading-8 text-white/78">
            Chat with your personal fashion AI to get outfit recommendations, styling direction, and ready-to-wear pairings.
          </p>
        </motion.div>

        {/* Chat Container */}
        <Card className="mb-6 flex h-[590px] flex-col overflow-hidden border border-white/24 bg-[#251D24]/18 p-0 shadow-[0_30px_90px_rgba(22,16,22,0.34)] backdrop-blur-2xl" hover={false}>
          <div className="flex items-center justify-between border-b border-white/15 bg-[#251D24]/48 px-6 py-4 text-white backdrop-blur-xl">
            <div>
              <p className="font-semibold">ClosetIQ Stylist</p>
              <p className="text-xs text-white/62">Ready with outfit ideas</p>
            </div>
            <span className="h-3 w-3 rounded-full bg-[#7CFFB2] shadow-[0_0_18px_rgba(124,255,178,0.9)]" />
          </div>
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(37,29,36,0.10),rgba(255,240,247,0.16))] p-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md rounded-2xl px-4 py-3 shadow-soft backdrop-blur-xl ${
                    msg.type === 'user'
                      ? 'rounded-br-md bg-[#D96C8C] text-white'
                      : 'rounded-bl-md border border-white/45 bg-white/68 text-[#251D24]'
                  }`}
                >
                  <p className="text-sm leading-6">{msg.text}</p>
                  {msg.suggestions && (
                    <div className="mt-3 space-y-1">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          className="block w-full rounded bg-white/20 px-2 py-1 text-left text-xs transition hover:bg-white/30"
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
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/88">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#D96C8C]"></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="grid grid-cols-2 gap-2 bg-white/28 px-6 pt-4 backdrop-blur-xl md:grid-cols-4">
              {cleanQuickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="border border-white/42 bg-white/56 px-3 py-2 text-sm font-medium text-[#5F5360] transition hover:bg-[#251D24] hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-white/18 bg-white/38 p-4 backdrop-blur-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for outfit suggestions..."
              className="flex-1 border border-white/50 bg-white/72 px-4 py-3 text-[#251D24] outline-none transition placeholder:text-[#8C7B85] focus:border-[#D96C8C] focus:ring-2 focus:ring-[#D96C8C]/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-12 w-12 items-center justify-center bg-[#251D24] text-white transition hover:bg-[#D96C8C] disabled:opacity-50"
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
          className="flex gap-3 rounded-2xl border border-white/25 bg-white/22 p-4 text-white shadow-soft backdrop-blur-xl"
        >
          <FiZap className="mt-1 flex-shrink-0 text-[#F9A8C0]" size={20} />
          <p className="text-sm text-white/78">
            Tip: Describe the occasion, weather, or mood for better recommendations.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
