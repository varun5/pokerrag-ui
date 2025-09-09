'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PokerCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function PokerCard({ children, className = '', hover = true, delay = 0 }: PokerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`poker-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
