import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean; 
}

export const Card: React.FC<CardProps> = ({ children, className = '', delay = 0, noPadding = false }) => {
  const { lowDataMode } = useApp();

  const baseStyles = `rounded-xl transition-all ${noPadding ? 'p-0' : 'p-6'} ${className}`;
  
  const visualStyles = lowDataMode
    ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-xl';

  return (
    <motion.div
      // Logic: Only animate if NOT in low data mode to save CPU/Battery
      initial={!lowDataMode ? { opacity: 0, y: 20 } : undefined}
      animate={!lowDataMode ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={`${baseStyles} ${visualStyles}`}
    >
      {children}
    </motion.div>
  );
};