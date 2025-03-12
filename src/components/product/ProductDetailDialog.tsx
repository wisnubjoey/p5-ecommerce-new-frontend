// src/components/product/ProductDetailDialog.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductDetailDialogProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange
}: ProductDetailDialogProps) {
  const [selectedImage, setSelectedImage] = useState(product.main_photo_url);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isClosing, setIsClosing] = useState(false);
  
  const allImages = [product.main_photo_url, ...(product.galleries?.map(g => g.photo_url) || [])];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} ditambahkan ke keranjang`);
    onOpenChange(false); // Close dialog after adding to cart
    setQuantity(1); // Reset quantity
  };

  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai baru tutup dialog
    setTimeout(() => {
      setIsClosing(false);
      onOpenChange(false);
    }, 300); // sesuaikan dengan durasi animasi di dialog.tsx
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="max-w-6xl bg-white/95 backdrop-blur-sm p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30 
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 text-[#8B7355] hover:text-[#4A3F35] transition-colors"
                onClick={handleClose}
              >
                <X size={24} />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <motion.div 
                  className="space-y-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="aspect-square relative rounded-2xl overflow-hidden bg-[#F5F0EA] p-2">
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className="object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-4">
                    {allImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className={cn(
                          "aspect-square relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:opacity-80",
                          "border-2 border-transparent",
                          selectedImage === image && "border-[#8B7355] shadow-lg"
                        )}
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div 
                  className="space-y-6 p-2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div>
                    <h2 className="text-2xl font-serif text-[#4A3F35]">{product.name}</h2>
                    <p className="text-[#8B7355] font-medium mt-1">{product.category.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-2xl font-bold text-[#4A3F35]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-[#4A3F35]">Description</h3>
                    <p className="text-[#8B7355] leading-relaxed whitespace-pre-line">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#8B7355]">
                      Stock available: {product.stock} items
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-[#4A3F35]">Quantity:</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors"
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-12 text-center font-medium text-[#4A3F35]">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= product.stock}
                          className="border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      className="w-full bg-[#4A3F35] hover:bg-[#5A4F45] text-white transition-colors" 
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? (
                        'Out of Stock'
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Add to Cart - {formatPrice(product.price * quantity)}
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}