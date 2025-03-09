// src/components/shared/GalleryUpload.tsx
'use client';

import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/components/ui/button';
import { X, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface GalleryUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export const GalleryUpload = ({
  value = [],
  onChange,
  maxImages = 5
}: GalleryUploadProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative group border rounded-lg overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const newImages = value.filter((_, i) => i !== index);
                    onChange(newImages);
                    toast.success('Foto berhasil dihapus');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {value.length < maxImages && (
          <div className="aspect-square border-2 border-dashed rounded-lg">
            <ImageUpload
              value=""
              onChange={(url) => {
                if (url) {
                  if (value.length >= maxImages) {
                    toast.error(`Maksimal ${maxImages} foto`);
                    return;
                  }
                  onChange([...value, url]);
                  toast.success('Foto berhasil ditambahkan');
                }
              }}
              endpoint="productGallery"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Gallery Photos</p>
        <p>{value.length} dari {maxImages} foto</p>
      </div>
    </div>
  );
};