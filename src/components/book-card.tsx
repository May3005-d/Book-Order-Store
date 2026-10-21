import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useCart } from '@/context/cart-context';
import type { Book } from '@/types/book';
import { formatMoney } from '@/utils/format-money';

export function BookCard({ book, onPress }: { book: Book; onPress: () => void }) {
  const { add } = useCart();
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <ThemedText style={styles.mark}>{book.mark}</ThemedText>
        <ThemedText style={styles.coverTitle}>{book.title.split(' ').slice(0, 2).join(' ')}</ThemedText>
        <ThemedText style={styles.coverAuthor}>{book.author}</ThemedText>
      </View>
      <ThemedText numberOfLines={2} style={styles.title}>{book.title}</ThemedText>
      <ThemedText style={styles.author}>{book.author}</ThemedText>
      <View style={styles.footer}>
        <ThemedText style={styles.price}>{formatMoney(book.price)}</ThemedText>
        <Pressable accessibilityLabel={`Add ${book.title} to cart`} style={styles.add} onPress={() => add(book)}>
          <ThemedText style={styles.addText}>+</ThemedText>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 145 },
  pressed: { opacity: 0.75 },
  cover: { height: 190, borderRadius: 16, padding: 14, justifyContent: 'space-between', marginBottom: 10 },
  mark: { color: '#FFF8EE', fontSize: 22, fontWeight: '800' },
  coverTitle: { color: '#FFF8EE', fontSize: 18, lineHeight: 20, fontWeight: '800' },
  coverAuthor: { color: '#FFF8EE', fontSize: 10 },
  title: { color: '#202B2A', fontSize: 14, lineHeight: 19, fontWeight: '800' },
  author: { color: '#77736B', fontSize: 12, marginTop: 3 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  price: { color: '#C35640', fontSize: 14, fontWeight: '800' },
  add: { backgroundColor: '#202B2A', width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  addText: { color: '#FFF8EE', fontSize: 22, lineHeight: 24 },
});
