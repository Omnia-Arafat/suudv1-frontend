'use client'

import { motion } from 'framer-motion'

export default function FramerDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-primary"
      >
        SU'UD Project
      </motion.h1>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full flex-center"
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear" 
          }}
          className="text-white text-2xl"
        >
          ⚡
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center max-w-md text-gray-600 dark:text-gray-300"
      >
        A powerful combination of Next.js, Laravel, SCSS, and Framer Motion
        for building modern web applications.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-accent text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        Get Started
      </motion.button>
    </div>
  )
}
