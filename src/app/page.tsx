'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productsApi } from '../../services/api';
import { Product } from '@/lib/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductDetailDialog } from '@/components/product/ProductDetailDialog';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await productsApi.getAll();
      setFeaturedProducts(data.slice(0, 6));
    } catch (error) {
      console.error('Failed to load featured products');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDF8F3] max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl">
        <div>‎</div>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center rounded-3xl overflow-hidden mt-2 mb6">
          <div className="absolute inset-0 bg-[#F5E6D8]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338')] bg-cover bg-center opacity-20" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-serif font-bold text-[#4A3F35] mb-6">
                Experience the Brilliance of Craftsmanship
              </h1>
              <p className="text-xl text-[#6B5D51] mb-8">
                Discover our exquisite collection of handcrafted jewelry and accessories
              </p>
              <Link href="/products">
                <Button className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6 text-lg rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:block relative h-[500px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
                alt="Jewelry crafting"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white rounded-3xl my-8">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '✨', title: 'Handcrafted', subtitle: 'With Love' },
                { icon: '💎', title: 'Premium', subtitle: 'Materials' },
                { icon: '🎁', title: 'Gift Ready', subtitle: 'Packaging' },
                { icon: '⭐', title: 'Customer', subtitle: 'Satisfaction' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-[#4A3F35]">{item.title}</h3>
                  <p className="text-sm text-[#8B7355]">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sparkle in Love Section */}
        <section className="py-20 rounded-3xl my-8">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-[#4A3F35] text-center mb-12">
              Sparkle in Love
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
              {[
                'Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Pendants',
                'Anklets', 'Brooches', 'Charms'
              ].map((category) => (
                <Link href={`/products/${category.toLowerCase()}`} key={category}>
                  <div className="text-center group cursor-pointer">
                    <div className="aspect-square relative mb-3">
                      <Image
                        src={`https://source.unsplash.com/random/300x300/?jewelry,${category}`}
                        alt={category}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-sm text-[#4A3F35]">{category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Sections */}
        <section className="py-20 bg-white rounded-3xl my-8">
          <div className="max-w-5xl mx-auto px-4 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
                  alt="Luxe Abundance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-serif mb-4">Luxe Abundance</h3>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Shop Collection
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
                  alt="Sparkle in Love"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-serif mb-4">Sparkle in Love</h3>
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Discover More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#4A3F35]">
                Featured Products
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden group cursor-pointer bg-white border-none shadow-sm">
                  <div className="aspect-square relative">
                    <Image
                      src={`https://source.unsplash.com/random/400x400/?jewelry,${i}`}
                      alt={`Featured product ${i}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium text-[#4A3F35]">Beautiful Necklace</h3>
                    <p className="mt-2 text-[#8B7355]">$299.99</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Styles Banner */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl font-serif font-bold text-[#4A3F35] mb-6">
                  Jewelry Unique Styles
                </h2>
                <p className="text-[#8B7355] mb-8">
                  Discover our collection of unique and handcrafted jewelry pieces that tell your story.
                </p>
                <Button className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6">
                  Shop Now
                </Button>
              </div>
              <div className="relative h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584"
                  alt="Unique Styles"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Wall */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-[#4A3F35]">
                Follow Us on Instagram
              </h2>
              <p className="text-[#8B7355] mt-2">@crafthaven</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square relative">
                  <Image
                    src={`https://source.unsplash.com/random/300x300/?jewelry,instagram,${i}`}
                    alt={`Instagram post ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
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
      <Footer />
    </>
  );
}
