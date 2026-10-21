import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { BookCard } from '@/components/book-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/context/cart-context';
import { getBooks } from '@/services/api';
import type { Book } from '@/types/book';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

const categories = ['All books', 'Fiction', 'Business', 'Mindfulness'];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All books');
  const [books, setBooks] = useState<Book[]>([]);
  const { count } = useCart();
  const insets = useSafeAreaInsets();

  useEffect(() => { getBooks().then(setBooks); }, []);
  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesCategory = category === 'All books' || book.category === category;
    return matchesCategory && `${book.title} ${book.author}`.toLowerCase().includes(query.trim().toLowerCase());
  }), [books, category, query]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={[styles.safeArea, { paddingTop: Math.max(insets.top, 16) }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + BottomTabInset + 28 }}>
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.eyebrow}>PAPER TRAIL BOOKS</ThemedText>
              <ThemedText style={styles.greeting}>Find your next{'\n'}great read.</ThemedText>
            </View>
            <Pressable accessibilityLabel="Shopping cart" style={styles.cartButton} onPress={() => router.push('/cart')}>
              <ThemedText style={styles.cartIcon}>+</ThemedText>
              {count > 0 && <View style={styles.badge}><ThemedText style={styles.badgeText}>{count}</ThemedText></View>}
            </Pressable>
          </View>
          <View style={styles.searchBox}>
            <ThemedText style={styles.searchIcon}>⌕</ThemedText>
            <TextInput accessibilityLabel="Search books" placeholder="Search by title or author" placeholderTextColor="#8E8B84" value={query} onChangeText={setQuery} style={styles.searchInput} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
            {categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.category, item === category && styles.categoryActive]}><ThemedText style={[styles.categoryText, item === category && styles.categoryTextActive]}>{item}</ThemedText></Pressable>)}
          </ScrollView>
          <View style={styles.promo}>
            <View style={styles.promoCopy}>
              <ThemedText style={styles.promoLabel}>WEEKEND PICK</ThemedText>
              <ThemedText style={styles.promoTitle}>Stories that{'\n'}stay with you.</ThemedText>
              <ThemedText style={styles.promoCaption}>Free delivery on orders over 500.000 đ</ThemedText>
              <Pressable style={styles.promoButton} onPress={() => setCategory('Fiction')}><ThemedText style={styles.promoButtonText}>Browse fiction</ThemedText></Pressable>
            </View>
            <View style={styles.promoBook}><ThemedText style={styles.promoBookSmall}>THE</ThemedText><ThemedText style={styles.promoBookBig}>JOY{'\n'}OF</ThemedText><ThemedText style={styles.promoBookSmall}>READING</ThemedText></View>
          </View>
          <View style={styles.sectionHeader}><ThemedText style={styles.sectionTitle}>Popular this week</ThemedText><ThemedText style={styles.resultCount}>{filteredBooks.length} books</ThemedText></View>
          <View style={styles.bookGrid}>{filteredBooks.map((book) => <BookCard key={book.id} book={book} onPress={() => router.push(`/book/${book.id}`)} />)}</View>
          {filteredBooks.length === 0 && <ThemedText style={styles.empty}>No books found. Try another search.</ThemedText>}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F2EA' },
  safeArea: { flex: 1, paddingHorizontal: 20, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  eyebrow: { color: '#C35640', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  greeting: { color: '#202B2A', fontSize: 34, lineHeight: 36, fontWeight: '800' },
  cartButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#202B2A', alignItems: 'center', justifyContent: 'center' },
  cartIcon: { color: '#F6F2EA', fontSize: 27, lineHeight: 27 },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#D85F45', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#FFF8EE', fontSize: 11, fontWeight: '800' },
  searchBox: { height: 54, borderRadius: 16, backgroundColor: '#FFFDF8', borderWidth: 1, borderColor: '#E7E0D4', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 18 },
  searchIcon: { color: '#C35640', fontSize: 28, marginRight: 10 },
  searchInput: { flex: 1, color: '#202B2A', fontSize: 15 },
  categories: { gap: 8, paddingBottom: 24 },
  category: { paddingHorizontal: 15, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: '#DDD6C9' },
  categoryActive: { backgroundColor: '#202B2A', borderColor: '#202B2A' },
  categoryText: { color: '#77736B', fontSize: 13, fontWeight: '700' },
  categoryTextActive: { color: '#FFF8EE' },
  promo: { minHeight: 194, backgroundColor: '#D85F45', borderRadius: 22, padding: 20, flexDirection: 'row', overflow: 'hidden', marginBottom: 30 },
  promoCopy: { flex: 1, zIndex: 1 },
  promoLabel: { color: '#F9D9C7', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginBottom: 12 },
  promoTitle: { color: '#FFF8EE', fontSize: 25, lineHeight: 27, fontWeight: '800', marginBottom: 9 },
  promoCaption: { color: '#F9D9C7', fontSize: 12, marginBottom: 15 },
  promoButton: { alignSelf: 'flex-start', backgroundColor: '#FFF8EE', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 9 },
  promoButtonText: { color: '#C35640', fontSize: 12, fontWeight: '800' },
  promoBook: { width: 92, height: 128, backgroundColor: '#F4D5A4', transform: [{ rotate: '9deg' }], padding: 10, justifyContent: 'space-between', alignSelf: 'center' },
  promoBookSmall: { color: '#8E4E3A', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  promoBookBig: { color: '#8E4E3A', fontSize: 20, lineHeight: 20, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 },
  sectionTitle: { color: '#202B2A', fontSize: 20, fontWeight: '800' },
  resultCount: { color: '#8E8B84', fontSize: 12 },
  bookGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  empty: { color: '#77736B', textAlign: 'center', marginTop: 30 },
});
