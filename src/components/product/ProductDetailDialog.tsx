// src/components/product/ProductDetailDialog.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

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
  
  const allImages = [product.main_photo_url, ...(product.galleries?.map(g => g.photo_url) || [])];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name} ditambahkan ke keranjang`);
    onOpenChange(false); // Close dialog after adding to cart
    setQuantity(1); // Reset quantity
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-6 gap-2">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square relative rounded-md overflow-hidden cursor-pointer",
                    selectedImage === image && "ring-2 ring-blue-500"
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-500">{product.category.name}</p>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}