// src/components/product/ProductDetailDialog.tsx
'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  const allImages = [product.main_photo_url, ...(product.galleries?.map(g => g.photo_url) || [])];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
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
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-gray-500">{product.category.name}</p>
            </div>
            
            <div>
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}