'use client';

import { motion } from 'framer-motion';
import { CreditCard, Sparkles } from 'lucide-react';

interface QuestionSuggestionsProps {
  onSelect: (question: string) => void;
  className?: string;
}

const suggestions = [
  "What is a string raise?",
  "How do blinds work in poker?",
  "What is a straddle bet?",
  "Explain the rules of Texas Hold'em",
  "What is a bad beat?",
  "How do you calculate pot odds?",
  "What is a continuation bet?",
  "Explain the different poker hand rankings",
  "What is a check-raise?",
  "How do you play position in poker?"
];

export default function QuestionSuggestions({ onSelect, className = '' }: QuestionSuggestionsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 text-card-300">
        <Sparkles className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Popular Questions</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(suggestion)}
            className="p-3 text-left bg-card-800/30 border border-poker-500/20 rounded-lg hover:border-poker-500/40 hover:bg-card-800/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-poker-500 group-hover:text-poker-400 transition-colors" />
              <span className="text-card-200 group-hover:text-card-100 text-sm">
                {suggestion}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
