import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Book, CartItem } from '@/types/book';

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (book: Book) => void;
  remove: (bookId: string) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    add: (book) => setItems((current) => {
      const existing = current.find((item) => item.id === book.id);
      return existing
        ? current.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...book, quantity: 1 }];
    }),
    remove: (bookId) => setItems((current) => current.filter((item) => item.id !== bookId)),
    setQuantity: (bookId, quantity) => setItems((current) => quantity > 0
      ? current.map((item) => item.id === bookId ? { ...item, quantity } : item)
      : current.filter((item) => item.id !== bookId)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
