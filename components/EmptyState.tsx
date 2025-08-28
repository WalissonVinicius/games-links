'use client';

import { motion } from 'framer-motion';
import { Search, TowerControl as GameController2 } from 'lucide-react';

interface EmptyStateProps {
  searchQuery?: string;
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  const isSearching = Boolean(searchQuery?.trim());

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative mb-8"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl border border-gray-700/50">
          {isSearching ? (
            <Search size={48} className="text-gray-400" />
          ) : (
            <GameController2 size={48} className="text-gray-400" />
          )}
        </div>
        
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {isSearching ? (
          <>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Nenhum resultado encontrado
            </h3>
            <p className="text-gray-400 max-w-md">
              Não encontramos nenhum jogo com "{searchQuery}". 
              Tente usar termos diferentes ou verifique a ortografia.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-white">
              Nenhum link cadastrado
            </h3>
            <p className="text-gray-400 max-w-md">
              Ainda não há jogos cadastrados no sistema. 
              Os links aparecerão aqui assim que forem adicionados pelo administrador.
            </p>
          </>
        )}
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}