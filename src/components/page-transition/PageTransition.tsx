'use client';

import { motion } from 'framer-motion';

export function PageTransition() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <motion.div
        className="h-1 bg-[#8B7355] fixed top-0 left-0 right-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
}
