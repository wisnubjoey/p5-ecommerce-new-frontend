// src/services/cart.ts
import { Product } from '@/lib/types/product';

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  main_photo_url: string;
  category_name: string;
}

export class CartService {
  private static CART_KEY = 'shopping_cart';

  static getCart(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem(this.CART_KEY);
    return cart ? JSON.parse(cart) : [];
  }

  static saveCart(cart: CartItem[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  static addItem(product: Product, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: Date.now(), // unique id for cart item
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        main_photo_url: product.main_photo_url,
        category_name: product.category.name
      });
    }

    this.saveCart(cart);
  }

  static updateQuantity(itemId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find(item => item.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  }

  static removeItem(itemId: number): void {
    const cart = this.getCart();
    const newCart = cart.filter(item => item.id !== itemId);
    this.saveCart(newCart);
  }

  static clearCart(): void {
    this.saveCart([]);
  }

  static getTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  static generateWhatsAppMessage(): string {
    const cart = this.getCart();
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    
    let message = 'Halo, saya ingin memesan:\n\n';
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Kategori: ${item.category_name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Harga: Rp ${item.price.toLocaleString('id-ID')}\n`;
      message += `   Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
    });

    message += `Total: Rp ${this.getTotal().toLocaleString('id-ID')}`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  }
}