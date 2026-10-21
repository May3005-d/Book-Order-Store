import { sampleBooks } from '@/data/books';
import type { Book } from '@/types/book';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export async function getBooks(): Promise<Book[]> {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error(`Book request failed with ${response.status}`);
    const books = (await response.json()) as Book[];
    return books.length > 0 ? books : sampleBooks;
  } catch {
    return sampleBooks;
  }
}

export async function getBook(id: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((book) => book.id === id);
}

export type CreateOrderPayload = {
  items: { bookId: string; quantity: number }[];
  customer: { name: string; phone: string; address: string };
};

export async function createOrder(payload: CreateOrderPayload): Promise<{ id: string }> {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Unable to create order');
  return (await response.json()) as { id: string };
}
