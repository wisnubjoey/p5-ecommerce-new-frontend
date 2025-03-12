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
import { productsApi } from '../../../../../../services/api';
import type { CreateProductDTO } from '@/lib/types/product';
import { GalleryUpload } from '@/components/shared/GalleryUpload';

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
    gallery_photos: [],
    price: 0,
    stock: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("formData yang dikirim", formData);

    try {
      const response = await productsApi.create(formData);
      console.log("response dari api", response);
      toast.success('Produk berhasil ditambahkan');
      router.push('/dashboard/products');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error detail:', error.response?.data);
      toast.error('Gagal menambahkan produk');
    } finally {
      setLoading(false);
    }
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
              <Label>Galeri Foto</Label>
              <GalleryUpload
                value={formData.gallery_photos || []}
                onChange={(urls) => setFormData(prev => ({ ...prev, gallery_photos: urls }))}
                maxImages={5}
              />
            </div>

            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  Rp
                </span>
                <Input
                  id="price"
                  type="number"
                  className="pl-10"
                  value={formData.price}
                  onChange={(e) => 
                    setFormData(prev => ({ 
                      ...prev, 
                      price: parseFloat(e.target.value) || 0 
                    }))
                  }
                  min="0"
                  step="1000"
                  required
                />
              </div>

              <div className="space-y-2">
  <Label htmlFor="stock">Stok Barang</Label>
  <Input
    id="stock"
    type="number"
    value={formData.stock}
    onChange={(e) => 
      setFormData(prev => ({ 
        ...prev, 
        stock: parseInt(e.target.value) || 0 
      }))
    }
    min="0"
    required
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