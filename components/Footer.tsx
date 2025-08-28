'use client';

import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="relative z-10 mt-20 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="text-gray-400 text-sm">Feito com</span>
            <Heart size={16} className="text-red-400 fill-current" />
            <span className="text-gray-400 text-sm">e</span>
            <Code size={16} className="text-blue-400" />
            <span className="text-gray-400 text-sm">por</span>
            <a 
              href="https://github.com/WalissonVinicius" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline font-medium"
            >
              Walisson
            </a>
            <span className="text-gray-400 text-sm">para a comunidade gamer</span>
          </motion.div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} LevelUp</span>
            <span>•</span>
            <span>Links & Arquivos</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}