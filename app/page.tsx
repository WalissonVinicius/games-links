'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gamepad2, ExternalLink } from 'lucide-react';
import { fetchGameLinks, type GameLink } from '@/lib/sanity';
import { searchLinks } from '@/lib/search';
import { useDebounce } from '@/hooks/useDebounce';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import SearchBar from '@/components/SearchBar';
import GameCard from '@/components/GameCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';
import AnimatedBackground from '@/components/AnimatedBackground';
import Footer from '@/components/Footer';

export default function Home() {
  const [gameLinks, setGameLinks] = useState<GameLink[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<GameLink[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useKeyboardShortcuts(searchInputRef, setIsSearchOpen);

  useEffect(() => {
    const loadGameLinks = async () => {
      try {
        setIsLoading(true);
        const links = await fetchGameLinks();
        setGameLinks(links);
        setFilteredLinks(links);
        setError(null);
      } catch (err) {
        console.error('Error loading game links:', err);
        setError('Erro ao carregar os links. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGameLinks();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      const results = searchLinks(gameLinks, debouncedSearchQuery);
      setFilteredLinks(results);
    } else {
      setFilteredLinks(gameLinks);
    }
  }, [debouncedSearchQuery, gameLinks]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Gamepad2 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LevelUp
                </h1>
                <p className="text-sm text-gray-400">Links & Arquivos</p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl px-4 py-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Search size={16} className="text-gray-400" />
              <span className="text-sm text-gray-400">Pesquisar...</span>
              <kbd className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">Ctrl+K</kbd>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Search Section */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Encontre seus games favoritos
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Use a busca avançada para encontrar rapidamente links e arquivos. 
              Pressione <kbd className="bg-gray-800 px-2 py-1 rounded text-sm">/</kbd> para focar ou{' '}
              <kbd className="bg-gray-800 px-2 py-1 rounded text-sm">Ctrl+K</kbd> para busca modal.
            </p>
          </div>

          <SearchBar
            ref={searchInputRef}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Digite o nome do game..."
            className="max-w-2xl mx-auto"
          />
        </motion.section>

        {/* Results Section */}
        <section>
          {error ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-red-400">{error}</p>
              </div>
            </motion.div>
          ) : isLoading ? (
            <SkeletonLoader />
          ) : filteredLinks.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {filteredLinks.map((link, index) => (
                  <motion.div
                    key={link._id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        delay: index * 0.05,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.95, 
                      y: -20,
                      transition: { duration: 0.2 }
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <GameCard gameLink={link} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full mx-6 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchBar
                ref={searchInputRef}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Digite o nome do game..."
                autoFocus
                className="mb-4"
              />
              <div className="text-xs text-gray-500 text-center">
                Pressione <kbd className="bg-gray-700 px-1 rounded">ESC</kbd> para fechar
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}