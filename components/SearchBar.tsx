'use client';

import { forwardRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder, autoFocus, className }, ref) => {
    return (
      <motion.div 
        className={cn("relative", className)}
        whileFocus={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl 
                   text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-transparent transition-all duration-200
                   backdrop-blur-sm hover:bg-gray-800/70"
          aria-label="Campo de busca"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-fuchsia-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;