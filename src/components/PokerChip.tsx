'use client';

import { motion } from 'framer-motion';

interface PokerChipProps {
  value: string | number;
  color: 'red' | 'blue' | 'green' | 'black' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PokerChip({ value, color, size = 'md', className = '' }: PokerChipProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <motion.div
      className={`poker-chip poker-chip-${color} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        boxShadow: [
          '0 4px 8px rgba(0,0,0,0.3)',
          '0 8px 16px rgba(0,0,0,0.4)',
          '0 4px 8px rgba(0,0,0,0.3)'
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {value}
    </motion.div>
  );
}
