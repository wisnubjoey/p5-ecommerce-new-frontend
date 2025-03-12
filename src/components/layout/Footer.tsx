'use client';
'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <footer className="bg-gradient-to-br from-[#e3d1be] to-[#d4bea3] text-[#4A3F35] rounded-3xl">
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif">CraftHaven</h3>
              <p className="text-[#8B7355] leading-relaxed">
                Handcrafted with love and care, bringing beauty to your everyday life.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="bg-white/80 p-2 rounded-full text-[#8B7355] hover:text-[#4A3F35] hover:bg-white transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-white/80 p-2 rounded-full text-[#8B7355] hover:text-[#4A3F35] hover:bg-white transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="bg-white/80 p-2 rounded-full text-[#8B7355] hover:text-[#4A3F35] hover:bg-white transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif text-lg mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#8B7355]"></span>
              </h3>
              <ul className="space-y-3">
                {['All Products', 'Dream Catchers', 'Jewelry', 'Keychains'].map((item) => (
                  <li key={item}>
                    <Link 
                      href="#" 
                      className="text-[#8B7355] hover:text-[#4A3F35] transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#4A3F35] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-serif text-lg mb-6 relative inline-block">
                Help
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#8B7355]"></span>
              </h3>
              <ul className="space-y-3">
                {['Shipping Information', 'Returns & Exchange', 'Contact Us', 'FAQs'].map((item) => (
                  <li key={item}>
                    <Link 
                      href="#" 
                      className="text-[#8B7355] hover:text-[#4A3F35] transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#4A3F35] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-serif text-lg mb-6 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#8B7355]"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#8B7355] mt-1" />
                  <span className="text-[#8B7355]">123 Craft Street, Creative City, CC 12345</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#8B7355]" />
                  <span className="text-[#8B7355]">+1 234 567 890</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#8B7355]" />
                  <span className="text-[#8B7355]">hello@crafthaven.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-[#8B7355]/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-[#8B7355] text-sm">
                © 2024 CraftHaven. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35] text-sm">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-[#8B7355] hover:text-[#4A3F35] text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}