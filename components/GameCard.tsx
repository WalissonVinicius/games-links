'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { GameLink } from '@/lib/sanity';
import CopyButton from './CopyButton';

interface GameCardProps {
  gameLink: GameLink;
}

export default function GameCard({ gameLink }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenLink = () => {
    window.open(gameLink.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: 2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-fuchsia-500/10 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <LinkIcon size={16} className="text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                {gameLink.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {new URL(gameLink.url).hostname}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={handleOpenLink}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Abrir ${gameLink.title}`}
          >
            <ExternalLink size={14} />
            <span>Abrir</span>
          </motion.button>

          <CopyButton 
            text={gameLink.url} 
            aria-label={`Copiar link do ${gameLink.title}`}
          />
        </div>

        {/* Creation date */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-xs text-gray-500">
            Adicionado em {new Date(gameLink._createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            transform: 'translateX(-100%)',
            width: '200%',
            height: '100%',
          }}
          animate={isHovered ? { transform: 'translateX(50%)' } : { transform: 'translateX(-100%)' }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  );
}