// src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { productsApi } from '../../../services/api';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProductDetailDialog } from '@/components/product/ProductDetailDialog';

const CATEGORIES = [
  { 
    id: 1, 
    name: 'Dream catcher',
    image: '/api/placeholder/400/300' // Nanti ganti dengan image asli
  },
  { 
    id: 2, 
    name: 'Perhiasan',
    image: '/api/placeholder/400/300'
  },
  { 
    id: 3, 
    name: 'Gantungan kunci',
    image: '/api/placeholder/400/300'
  }
];

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsApi.getAll();
      // Sort products by creation date (newest first)
      const sortedProducts = data.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setProducts(sortedProducts);
      setDisplayedProducts(sortedProducts.slice(0, PRODUCTS_PER_PAGE));
    } catch (error) {
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const currentLength = displayedProducts.length;
    const newProducts = products.slice(currentLength, currentLength + PRODUCTS_PER_PAGE);
    setDisplayedProducts([...displayedProducts, ...newProducts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Card key={category.id} className="overflow-hidden group cursor-pointer">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group" onClick={() => setSelectedProduct(product)}>
                <div className="aspect-square relative">
                  <Image
                    src={product.main_photo_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category.name}</p>
                  <p className="mt-2 text-sm line-clamp-2 text-gray-600">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {displayedProducts.length < products.length && (
            <div className="mt-8 text-center">
              <Button onClick={loadMore} variant="outline" size="lg">
                Tampilkan Lebih Banyak
              </Button>
            </div>
          )}
        </section>
      </div>
      {selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        />
      )}
    </div>
  );
}