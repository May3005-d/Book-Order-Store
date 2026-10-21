export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  description: string;
  color: string;
  mark: string;
  stock: number;
};

export type CartItem = Book & { quantity: number };
