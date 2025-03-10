'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif text-[#4A3F35]">
            CraftHaven
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link href="/products" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
              All Products
            </Link>
            <Link href="/products/dream-catcher" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
              Dream Catchers
            </Link>
            <Link href="/products/perhiasan" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
              Jewelry
            </Link>
            <Link href="/products/gantungan-kunci" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
              Keychains
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="text-[#8B7355] hover:text-[#4A3F35]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#8B7355] hover:text-[#4A3F35]">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#8B7355]">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#8B7355]">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#8B7355]"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8DFD8]">
            <div className="flex flex-col space-y-4">
              <Link href="/products" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
                All Products
              </Link>
              <Link href="/products/dream-catcher" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
                Dream Catchers
              </Link>
              <Link href="/products/perhiasan" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
                Jewelry
              </Link>
              <Link href="/products/gantungan-kunci" className="text-[#8B7355] hover:text-[#4A3F35] font-medium">
                Keychains
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
