import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/context/cart-context';
import { getBook } from '@/services/api';
import type { Book } from '@/types/book';
import { formatMoney } from '@/utils/format-money';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book>();
  const { add } = useCart();
  useEffect(() => { if (id) getBook(id).then(setBook); }, [id]);
  if (!book) return <ThemedView style={styles.center}><ThemedText>Loading book...</ThemedText></ThemedView>;
  return <ThemedView style={styles.container}><ScrollView contentContainerStyle={styles.content}>
    <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>‹ Back</ThemedText></Pressable>
    <View style={[styles.cover, { backgroundColor: book.color }]}><ThemedText style={styles.mark}>{book.mark}</ThemedText><ThemedText style={styles.coverTitle}>{book.title}</ThemedText><ThemedText style={styles.coverAuthor}>{book.author}</ThemedText></View>
    <ThemedText style={styles.title}>{book.title}</ThemedText><ThemedText style={styles.author}>{book.author} · {book.category}</ThemedText>
    <ThemedText style={styles.description}>{book.description}</ThemedText><ThemedText style={styles.price}>{formatMoney(book.price)}</ThemedText>
    <Pressable style={styles.button} onPress={() => { add(book); router.push('/cart'); }}><ThemedText style={styles.buttonText}>Add to cart</ThemedText></Pressable>
  </ScrollView></ThemedView>;
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F2EA' }, content: { padding: 24, paddingTop: 60 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { color: '#C35640', fontWeight: '800', marginBottom: 24 }, cover: { height: 330, borderRadius: 22, padding: 24, justifyContent: 'space-between', marginBottom: 24 }, mark: { color: '#FFF8EE', fontSize: 32, fontWeight: '900' }, coverTitle: { color: '#FFF8EE', fontSize: 30, lineHeight: 34, fontWeight: '900' }, coverAuthor: { color: '#FFF8EE', fontSize: 14 },
  title: { color: '#202B2A', fontSize: 26, lineHeight: 31, fontWeight: '900' }, author: { color: '#77736B', marginTop: 6 }, description: { color: '#4E514B', fontSize: 16, lineHeight: 25, marginTop: 24 }, price: { color: '#C35640', fontSize: 22, fontWeight: '900', marginTop: 24 }, button: { backgroundColor: '#202B2A', borderRadius: 16, alignItems: 'center', padding: 16, marginTop: 24 }, buttonText: { color: '#FFF8EE', fontWeight: '800', fontSize: 16 },
});
