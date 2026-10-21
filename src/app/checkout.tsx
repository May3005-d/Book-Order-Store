import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from '@/context/cart-context';
import { createOrder } from '@/services/api';

export default function CheckoutScreen() {
  const { items, clear } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submit = async () => {
    if (!name.trim() || !phone.trim() || !address.trim() || items.length === 0) {
      Alert.alert('Missing information', 'Please fill in all delivery details.');
      return;
    }
    setSubmitting(true);
    try {
      await createOrder({ customer: { name, phone, address }, items: items.map((item) => ({ bookId: item.id, quantity: item.quantity })) });
      clear();
      router.replace('/order-success');
    } catch {
      Alert.alert('Order failed', 'Please check that the backend is running and try again.');
    } finally { setSubmitting(false); }
  };
  return <ThemedView style={styles.container}><ScrollView contentContainerStyle={styles.content}><ThemedText style={styles.title}>Delivery details</ThemedText><ThemedText style={styles.label}>Full name</ThemedText><TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nguyen Van A" /><ThemedText style={styles.label}>Phone number</ThemedText><TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="090..." /><ThemedText style={styles.label}>Address</ThemedText><TextInput style={[styles.input, styles.multiline]} value={address} onChangeText={setAddress} multiline placeholder="Your delivery address" /><Pressable disabled={submitting} style={styles.button} onPress={submit}><ThemedText style={styles.buttonText}>{submitting ? 'Placing order...' : 'Place order'}</ThemedText></Pressable></ScrollView></ThemedView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F6F2EA' }, content: { padding: 24, paddingTop: 60 }, title: { color: '#202B2A', fontSize: 30, fontWeight: '900', marginBottom: 28 }, label: { color: '#202B2A', fontWeight: '800', marginBottom: 8, marginTop: 16 }, input: { backgroundColor: '#FFFDF8', borderColor: '#E7E0D4', borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16 }, multiline: { height: 100, textAlignVertical: 'top' }, button: { backgroundColor: '#202B2A', borderRadius: 16, alignItems: 'center', padding: 16, marginTop: 28 }, buttonText: { color: '#FFF8EE', fontWeight: '800', fontSize: 16 } });
