import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#e3d1be] text-[#4A3F35] max-w-[1440px] mx-auto rounded-t-3xl px-4 sm:px-6 lg:px-8 rounded-3xl">
      <div className="max-w-5xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif">CraftHaven</h3>
            <p className="text-[#8B7355]">
              Handcrafted with love and care, bringing beauty to your everyday life.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-[#8B7355] hover:text-[#4A3F35]">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/dream-catcher" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Dream Catchers
                </Link>
              </li>
              <li>
                <Link href="/products/perhiasan" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/products/gantungan-kunci" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Keychains
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-serif text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35]">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg mb-4">Newsletter</h3>
            <p className="text-[#8B7355] mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-[#E8DFD8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8DFD8] text-center text-[#8B7355]">
          <p>&copy; 2024 CraftHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
