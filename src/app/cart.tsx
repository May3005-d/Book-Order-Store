import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/context/cart-context';
import { formatMoney } from '@/utils/format-money';

export default function CartScreen() {
  const { items, total, setQuantity, remove } = useCart();
  return <ThemedView style={styles.container}><ScrollView contentContainerStyle={styles.content}>
    <Pressable onPress={() => router.back()}><ThemedText style={styles.back}>‹ Continue shopping</ThemedText></Pressable><ThemedText style={styles.title}>Your cart</ThemedText>
    {items.length === 0 ? <ThemedText style={styles.empty}>Your cart is empty.</ThemedText> : items.map((item) => <View key={item.id} style={styles.item}><View style={{ flex: 1 }}><ThemedText style={styles.itemTitle}>{item.title}</ThemedText><ThemedText style={styles.price}>{formatMoney(item.price)}</ThemedText></View><View style={styles.quantity}><Pressable onPress={() => setQuantity(item.id, item.quantity - 1)}><ThemedText style={styles.control}>−</ThemedText></Pressable><ThemedText>{item.quantity}</ThemedText><Pressable onPress={() => setQuantity(item.id, item.quantity + 1)}><ThemedText style={styles.control}>+</ThemedText></Pressable></View><Pressable onPress={() => remove(item.id)}><ThemedText style={styles.remove}>Remove</ThemedText></Pressable></View>)}
    {items.length > 0 && <><View style={styles.total}><ThemedText style={styles.totalLabel}>Total</ThemedText><ThemedText style={styles.totalValue}>{formatMoney(total)}</ThemedText></View><Pressable style={styles.button} onPress={() => router.push('/checkout')}><ThemedText style={styles.buttonText}>Checkout</ThemedText></Pressable></>}
  </ScrollView></ThemedView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F6F2EA' }, content: { padding: 24, paddingTop: 60 }, back: { color: '#C35640', fontWeight: '800', marginBottom: 24 }, title: { color: '#202B2A', fontSize: 32, fontWeight: '900', marginBottom: 24 }, empty: { color: '#77736B', textAlign: 'center', marginTop: 50 }, item: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E7E0D4' }, itemTitle: { color: '#202B2A', fontWeight: '800' }, price: { color: '#C35640', fontWeight: '800', marginTop: 5 }, quantity: { flexDirection: 'row', gap: 10, alignItems: 'center' }, control: { color: '#C35640', fontSize: 22 }, remove: { color: '#8E8B84', fontSize: 11 }, total: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28 }, totalLabel: { color: '#202B2A', fontSize: 18, fontWeight: '800' }, totalValue: { color: '#C35640', fontSize: 20, fontWeight: '900' }, button: { backgroundColor: '#202B2A', borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 20 }, buttonText: { color: '#FFF8EE', fontWeight: '800' } });
