'use client';

import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          {/* Header skeleton */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-700/50 rounded-xl shimmer" />
            <div className="flex-1">
              <div className="w-3/4 h-5 bg-gray-700/50 rounded-lg mb-2 shimmer" />
              <div className="w-1/2 h-3 bg-gray-700/30 rounded shimmer" />
            </div>
          </div>

          {/* Actions skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-20 h-8 bg-gray-700/50 rounded-xl shimmer" />
            <div className="w-8 h-8 bg-gray-700/50 rounded-xl shimmer" />
          </div>

          {/* Date skeleton */}
          <div className="pt-4 border-t border-gray-700/30">
            <div className="w-32 h-3 bg-gray-700/30 rounded shimmer" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}