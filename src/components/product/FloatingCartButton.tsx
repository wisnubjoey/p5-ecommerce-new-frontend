'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCartButton() {
  const { items } = useCart();
  const router = useRouter();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={() => router.push('/cart')}
            className="bg-[#4A3F35] hover:bg-[#8B7355] text-white rounded-full p-6 shadow-lg"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {items.length}
            </span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
