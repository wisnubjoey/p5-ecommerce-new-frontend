// src/app/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal, checkout } = useCart();

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Keranjang masih kosong');
      return;
    }
    checkout();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Keranjang Belanja Kosong</h2>
            <p className="text-gray-500 mb-6">Belum ada produk yang ditambahkan ke keranjang.</p>
            <Button onClick={() => router.push('/products')}>
              Lihat Produk
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

        <div className="grid gap-6">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.main_photo_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.category_name}</p>
                        <p className="text-blue-600 font-medium">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </Button>
                      <div className="ml-auto font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="p-6">
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>{formatPrice(getTotal())}</span>
            </div>
            <Button 
              className="w-full"
              size="lg"
              onClick={handleCheckout}
            >
              Checkout via WhatsApp
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}