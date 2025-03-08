// src/app/(dashboard)/products/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { toast } from 'sonner';
import { productsApi } from '../../../../../services/api';
import type { CreateProductDTO } from '@/lib/types/product';

const CATEGORIES = [
  { id: 1, name: 'Dream catcher' },
  { id: 2, name: 'Perhiasan' },
  { id: 3, name: 'Gantungan kunci' },
];

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateProductDTO>({
    category_id: 0,
    name: '',
    description: '',
    main_photo_url: '',
    instagram_link: '',
    gallery_photos: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("formData yang dikirim", formData);

    try {
      const response = await productsApi.create(formData);
      console.log("response dari api", response);
      toast.success('Produk berhasil ditambahkan');
      router.push('/products');
    } catch (error: any) {
        console.error('Error detail:', error.response?.data);
      toast.error('Gagal menambahkan produk');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryUpload = (url?: string) => {
    if (!url) return;
    
    setFormData(prev => ({
      ...prev,
      gallery_photos: [...(prev.gallery_photos || []), url]
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_photos: prev.gallery_photos?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle>Tambah Produk Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select
                value={formData.category_id.toString()}
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category_id: parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem 
                      key={category.id} 
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Produk</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => 
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => 
                  setFormData(prev => ({ ...prev, description: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Foto Utama</Label>
              <ImageUpload
                value={formData.main_photo_url}
                onChange={(url) => 
                  setFormData(prev => ({ ...prev, main_photo_url: url || '' }))
                }
                endpoint="productImage"
              />
            </div>

            <div className="space-y-2">
              <Label>Galeri Foto (Maksimal 5)</Label>
              <div className="grid grid-cols-2 gap-4">
                {formData.gallery_photos?.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => removeGalleryImage(index)}
                    >
                      Hapus
                    </Button>
                  </div>
                ))}
                {(formData.gallery_photos?.length || 0) < 5 && (
                  <ImageUpload
                    value=""
                    onChange={handleGalleryUpload}
                    endpoint="productGallery"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Link Instagram</Label>
              <Input
                id="instagram"
                value={formData.instagram_link}
                onChange={(e) => 
                  setFormData(prev => ({ ...prev, instagram_link: e.target.value }))
                }
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}