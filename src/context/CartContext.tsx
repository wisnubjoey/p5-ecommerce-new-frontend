// src/contexts/CartContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartService, CartItem } from '../../services/cart';
import { Product } from '../lib/types/product';
import { WhatsAppCheckoutDialog } from '@/components/checkout/WhatsappCheckoutDialog';


interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  useEffect(() => {
    setItems(CartService.getCart());
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    CartService.addItem(product, quantity);
    setItems(CartService.getCart());
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    CartService.updateQuantity(itemId, quantity);
    setItems(CartService.getCart());
  };

  const removeFromCart = (itemId: number) => {
    CartService.removeItem(itemId);
    setItems(CartService.getCart());
  };

  const clearCart = () => {
    CartService.clearCart();
    setItems([]);
  };

  const getTotal = () => CartService.getTotal();

  const checkout = () => {
    const whatsappUrl = CartService.generateWhatsAppMessage();
    setCheckoutDialogOpen(true);
  };

  return (
    <CartContext.Provider value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
        checkout
      }}>
        {children}
        <WhatsAppCheckoutDialog
          message={CartService.generateWhatsAppMessage()}
          phoneNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}
          open={checkoutDialogOpen}
          onOpenChange={setCheckoutDialogOpen}
        />
      </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};