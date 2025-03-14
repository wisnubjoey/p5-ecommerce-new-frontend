// src/app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { productsApi } from '../../../services/api';
import { Product } from '@/lib/types/product';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProductDetailDialog } from '@/components/product/ProductDetailDialog';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Loader } from '@/components/loader/Loader';
import { BackgroundGradient } from '@/components/ui/background-gradient';


const PRODUCTS_PER_PAGE = 6;

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Loader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center rounded-3xl overflow-hidden mt-8">
        <div className="absolute inset-0 bg-[#F5E6D8]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.h1 
            className="text-5xl font-serif font-bold text-[#4A3F35] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Collections
          </motion.h1>
          <motion.p 
            className="text-xl text-[#8B7355] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our handcrafted pieces, each telling its own unique story
          </motion.p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-[#FDF8F3] rounded-3xl my-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-[#4A3F35] mb-4">Latest Products</h2>
            <p className="text-[#8B7355] text-lg">Explore our newest additions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <BackgroundGradient 
                key={product.id}
                className="relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Card 
                  className="w-full h-full border-0 bg-transparent"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Image
                    src={product.main_photo_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Card>
              </BackgroundGradient>
            ))}
          </div>

          {displayedProducts.length < products.length && (
            <div className="mt-12 text-center">
              <Button 
                onClick={loadMore} 
                className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6 text-lg rounded-full"
              >
                Load More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          open={!!selectedProduct}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        />
      )}
    </main>
  );
}