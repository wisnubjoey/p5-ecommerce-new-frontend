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
import { motion } from "motion/react"

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
      <main className="min-h-screen bg-white max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl">
        <div>‎</div>

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center rounded-3xl overflow-hidden mt-2 mb-6">
          <div className="absolute inset-0 bg-[#F5E6D8]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338')] bg-cover bg-center opacity-20" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 className="text-5xl font-serif font-bold text-[#4A3F35] mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                Experience the Brilliance of Craftsmanship
              </motion.h1>
              <motion.p className="text-xl text-[rgb(107,93,81)] mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
                Discover our exquisite collection of handcrafted jewelry and accessories
              </motion.p>
              <Link href="/products">
                <Button className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6 text-lg rounded-full">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <motion.div className="hidden md:block relative h-[500px] w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
                alt="Jewelry crafting"
                fill
                className="object-cover rounded-3xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Image with Text Section */}
<section className="py-16 bg-white my-8">
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left side - Image */}
      <div className="relative aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
          alt="Jewelry crafting"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Right side - Content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-serif text-[#4A3F35]">
          Discover Our Handcrafted Collection
        </h2>
        <p className="text-[#8B7355] text-lg">
          Each piece is carefully crafted with attention to detail and premium materials, 
          ensuring you receive jewelry that's as unique as you are.
        </p>
        <Button className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6 text-lg rounded-full">
          Lihat Koleksi Perhiasan
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
</section>

        {/* Unique Styles Banner */}
        <section className="py-10 rounded-3xl bg-[#f8e6d3]">
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
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1519471245485-5d5981842a2b?q=80&w=3168&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Unique Styles"
                  fill
                  className="object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

{/* Image with Text Section */}
<section className="py-16 bg-white my-8">
  <div className="max-w-5xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left side - Image */}
      <div className="relative aspect-square">
        <Image
          src="https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?q=80&w=3018&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Jewelry crafting"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Right side - Content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-serif text-[#4A3F35]">
          Discover Our Handcrafted Collection
        </h2>
        <p className="text-[#8B7355] text-lg">
          Each piece is carefully crafted with attention to detail and premium materials, 
          ensuring you receive jewelry that's as unique as you are.
        </p>
        <Button className="bg-[#8B7355] hover:bg-[#6B5D51] text-white px-8 py-6 text-lg rounded-full">
          Explore Collection
        </Button>
      </div>
    </div>
  </div>
</section>

{/* Banner Sections */}
<section className="pb-24 pt-30 bg-white rounded-3xl my-8">
  <div className="max-w-6xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-serif text-[#4A3F35] mb-4">Our Collections</h2>
      <p className="text-[#8B7355] text-lg">Discover our carefully curated pieces</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
          alt="Luxe Abundance"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex items-center justify-center">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-serif mb-4">Luxe Abundance</h3>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors duration-300">
              Shop Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a"
          alt="Sparkle in Love"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex items-center justify-center">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-serif mb-4">Sparkle in Love</h3>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors duration-300">
              Discover More
            </Button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
          alt="Elegant Essentials"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex items-center justify-center">
          <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-2xl font-serif mb-4">Elegant Essentials</h3>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black transition-colors duration-300">
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Features Section */}
        <section className="py-20 bg-[#e6d8ca] rounded-3xl my-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-[#4A3F35] mb-4">Why Choose CraftHaven?</h2>
              <p className="text-[#8B7355] text-lg max-w-2xl mx-auto">
                We take pride in delivering exceptional quality and service to ensure your complete satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="text-center group">
                <div className="mb-6 relative w-20 h-20 mx-auto bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/award.svg"
                    alt="Certified"
                    fill
                    className="object-contain p-4 text-[#8B7355]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#4A3F35] mb-3">Authenticity Guaranteed</h3>
                <p className="text-[#8B7355] leading-relaxed">
                  Every piece comes with a certificate of authenticity and quality assurance
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 relative w-20 h-20 mx-auto bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-check.svg"
                    alt="Secure"
                    fill
                    className="object-contain p-4 text-[#8B7355]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#4A3F35] mb-3">Secure Shopping</h3>
                <p className="text-[#8B7355] leading-relaxed">
                  Trusted by thousands of customers since 2024
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 relative w-20 h-20 mx-auto bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/truck.svg"
                    alt="Shipping"
                    fill
                    className="object-contain p-4 text-[#8B7355]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#4A3F35] mb-3">Global Delivery</h3>
                <p className="text-[#8B7355] leading-relaxed">
                  Swift and secure worldwide shipping at your doorstep
                </p>
              </div>

              <div className="text-center group">
                <div className="mb-6 relative w-20 h-20 mx-auto bg-white rounded-full p-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/refresh-ccw.svg"
                    alt="Transparent"
                    fill
                    className="object-contain p-4 text-[#8B7355]"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#4A3F35] mb-3">Easy Returns</h3>
                <p className="text-[#8B7355] leading-relaxed">
                  30-day hassle-free return policy for your peace of mind
                </p>
              </div>
            </div>
          </div>
        </section>

        

        {/* Instagram Wall */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-[#4A3F35] mb-4">
                Our Gallery
              </h2>
              <p className="text-[#8B7355] text-lg">Follow our journey @crafthaven</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[200px]">
              {/* Large landscape image - spans 8 columns */}
              <div className="relative md:col-span-8 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
                  alt="Forest road aerial view"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Medium square image - spans 4 columns */}
              <div className="relative md:col-span-4 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8"
                  alt="Misty forest"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Small cottage image - spans 4 columns */}
              <div className="relative md:col-span-4 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1518780664697-55e3ad937233"
                  alt="Cottage in forest"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Large mountain landscape - spans 8 columns */}
              <div className="relative md:col-span-8 rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba"
                  alt="Mountain landscape"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
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
