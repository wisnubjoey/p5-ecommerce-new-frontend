import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Playfair_Display } from 'next/font/google';
import { FloatingCartButton } from "@/components/product/FloatingCartButton";
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CraftHaven - Handcrafted with Love",
  description: "Discover our exquisite collection of handcrafted jewelry and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <CartProvider>{children}
          <FloatingCartButton />
        </CartProvider>
      </body>
    </html>
  );
}
