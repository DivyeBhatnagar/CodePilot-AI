'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, Folder, FileText } from 'lucide-react';

export default function LoadingOverlay() {
  const icons = [Code, Folder, FileText, Sparkles];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-12 shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center">
          {/* Animated Icons */}
          <div className="flex justify-center gap-4 mb-6">
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="p-3 bg-accent/10 rounded-xl"
              >
                <Icon className="w-6 h-6 text-accent" />
              </motion.div>
            ))}
          </div>

          {/* Loading Text */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            AI is building your project
          </h3>
          <p className="text-gray-600 mb-6">
            Generating files, dependencies, and setup instructions...
          </p>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ width: '50%' }}
            />
          </div>

          {/* Tips */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-500 mt-6"
          >
            This may take 10-30 seconds...
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
