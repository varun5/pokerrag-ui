'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Sparkles, Zap, Shield, Brain } from 'lucide-react';
import PokerCard from '@/components/PokerCard';
import PokerChip from '@/components/PokerChip';
import LoadingSpinner from '@/components/LoadingSpinner';
import QuestionSuggestions from '@/components/QuestionSuggestions';
import ResponseDisplay from '@/components/ResponseDisplay';

function getDefaultBase() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('API_BASE');
    if (saved) return saved;
  }
  return process.env.NEXT_PUBLIC_API_URL || 'https://pokerrag-api.onrender.com';
}

export default function Home() {
  const [base, setBase] = useState<string>(getDefaultBase());
  const [question, setQuestion] = useState('What is a string raise?');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('API_BASE') : null;
    if (saved) setBase(saved);
  }, []);

  async function ask() {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setResponse(null);
    
    try {
      localStorage.setItem('API_BASE', base.trim());
      const resp = await fetch(`${base.replace(/\/$/,'')}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: question, top_k: 4 })
      });
      const json = await resp.json();
      setResponse(json);
    } catch (e: any) {
      setResponse({ error: String(e) });
    } finally {
      setIsLoading(false);
    }
  }

  const handleQuestionSelect = (selectedQuestion: string) => {
    setQuestion(selectedQuestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-card-950 via-card-900 to-card-800">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-poker-600/10 to-poker-800/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-poker-500 to-poker-700 rounded-2xl flex items-center justify-center poker-glow-strong">
                  <span className="text-3xl">🃏</span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-2 border-2 border-poker-500/30 rounded-2xl"
                />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-poker-400 to-poker-600 bg-clip-text text-transparent">
                PokerRag
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-card-300 mb-8 max-w-2xl mx-auto"
            >
              Your AI-powered poker assistant. Ask questions about rules, strategies, and terminology.
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="flex items-center gap-2 bg-card-800/50 px-4 py-2 rounded-full border border-poker-500/20">
                <Brain className="w-4 h-4 text-poker-400" />
                <span className="text-card-200 text-sm">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 bg-card-800/50 px-4 py-2 rounded-full border border-poker-500/20">
                <Zap className="w-4 h-4 text-poker-400" />
                <span className="text-card-200 text-sm">Fast Responses</span>
              </div>
              <div className="flex items-center gap-2 bg-card-800/50 px-4 py-2 rounded-full border border-poker-500/20">
                <Shield className="w-4 h-4 text-poker-400" />
                <span className="text-card-200 text-sm">Accurate Sources</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Question Input */}
          <div className="lg:col-span-1 space-y-6">
            <PokerCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-card-100 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-poker-400" />
                  Ask a Question
                </h2>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-card-700/50 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-card-400" />
                </button>
              </div>

              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-card-800/30 rounded-lg border border-poker-500/20"
                >
                  <label className="block text-sm font-semibold text-card-200 mb-2">
                    API Base URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className="poker-input flex-1 text-sm"
                      placeholder="https://pokerrag-api.onrender.com"
                    />
                    <button
                      onClick={() => localStorage.setItem('API_BASE', base.trim())}
                      className="px-4 py-2 bg-poker-600 hover:bg-poker-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-card-200 mb-2">
                    Your Question
                  </label>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={4}
                    className="poker-textarea w-full"
                    placeholder="Ask anything about poker..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={ask}
                  disabled={isLoading || !question.trim()}
                  className="poker-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span>Thinking...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Ask Question</span>
                    </>
                  )}
                </motion.button>
              </div>
            </PokerCard>

            <PokerCard>
              <QuestionSuggestions onSelect={handleQuestionSelect} />
            </PokerCard>
          </div>

          {/* Right Column - Response */}
          <div className="lg:col-span-2">
            <ResponseDisplay response={response} isLoading={isLoading} />
          </div>
        </div>

        {/* Footer Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <PokerChip value="$1" color="white" size="sm" />
          <PokerChip value="$5" color="red" size="sm" />
          <PokerChip value="$25" color="green" size="sm" />
          <PokerChip value="$100" color="blue" size="sm" />
          <PokerChip value="$500" color="black" size="sm" />
        </motion.div>
      </main>
    </div>
  );
}
