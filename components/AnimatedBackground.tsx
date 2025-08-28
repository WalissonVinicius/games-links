'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Main gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating orbs */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-screen filter blur-xl opacity-30"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            background: `radial-gradient(circle, 
              ${i % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' : 
                i % 3 === 1 ? 'rgba(147, 51, 234, 0.3)' : 
                'rgba(236, 72, 153, 0.3)'} 0%, 
              transparent 70%)`,
            left: `${10 + i * 15}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}

      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}