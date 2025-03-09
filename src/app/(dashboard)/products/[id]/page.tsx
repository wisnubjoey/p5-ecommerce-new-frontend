// src/app/(dashboard)/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import type { Product, CreateProductDTO } from '@/lib/types/product';
import { GalleryUpload } from '@/components/shared/GalleryUpload';

const CATEGORIES = [
  { id: 1, name: 'Dream catcher' },
  { id: 2, name: 'Perhiasan' },
  { id: 3, name: 'Gantungan kunci' },
];

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateProductDTO>({
    category_id: 0,
    name: '',
    description: '',
    main_photo_url: '',
    gallery_photos: [],
  });

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const product = await productsApi.getOne(parseInt(params.id));
      setFormData({
        category_id: product.category_id,
        name: product.name,
        description: product.description,
        main_photo_url: product.main_photo_url,
        gallery_photos: product.galleries.map(g => g.photo_url),
      });
    } catch (error) {
      toast.error('Gagal memuat data produk');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await productsApi.update(parseInt(params.id), formData);
      toast.success('Produk berhasil diupdate');
      router.push('/products');
    } catch (error) {
      toast.error('Gagal mengupdate produk');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Produk</CardTitle>
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
              <GalleryUpload
                value={formData.gallery_photos || []}
                onChange={(urls) => setFormData(prev => ({ ...prev, gallery_photos: urls }))}
                maxImages={5}
              />
            </div>

            <Button type="submit" disabled={submitting}>
              {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}