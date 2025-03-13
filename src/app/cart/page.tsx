// src/app/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal, checkout } = useCart();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    // Cari produk dari items
    const product = items.find(item => item.id === itemId);
    
    if (!product) return;
    
    // Cek jika quantity baru melebihi stock
    if (newQuantity > product.stock) {
      toast.error(`Stock tersedia hanya ${product.stock} item`);
      return;
    }
    
    // Cek minimum quantity
    if (newQuantity < 1) return;
    
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Keranjang masih kosong');
      return;
    }
    checkout();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F0EA] py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-4"
        >
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#8B7355]" />
            <h2 className="text-2xl font-serif text-[#4A3F35] mb-4">Keranjang Belanja Kosong</h2>
            <p className="text-[#8B7355] mb-8">Belum ada produk yang ditambahkan ke keranjang.</p>
            <Button 
              onClick={() => router.push('/products')}
              className="bg-[#4A3F35] hover:bg-[#8B7355] text-white transition-colors"
            >
              Lihat Produk
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0EA] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif text-[#4A3F35] mb-8"
        >
          Keranjang Belanja
        </motion.h1>

        <div className="grid gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32">
                        <Image
                          src={item.main_photo_url}
                          alt={item.name}
                          fill
                          className="object-cover rounded-xl"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-serif text-[#4A3F35]">{item.name}</h3>
                            <p className="text-sm text-[#8B7355]">{item.category_name}</p>
                            <p className="text-[#4A3F35] font-medium mt-1">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#8B7355] hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-12 text-center font-medium text-[#4A3F35]">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </Button>
                          <span className="text-sm text-gray-500">
                            (Stock: {item.stock})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl">
              <div className="flex justify-between text-xl font-serif mb-8">
                <span className="text-[#4A3F35]">Total</span>
                <span className="text-[#4A3F35]">{formatPrice(getTotal())}</span>
              </div>
              <Button 
                className="w-full bg-[#4A3F35] hover:bg-[#8B7355] text-white transition-colors"
                size="lg"
                onClick={handleCheckout}
              >
                Checkout via WhatsApp
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}