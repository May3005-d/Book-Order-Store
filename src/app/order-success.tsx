import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function OrderSuccessScreen() {
  return <ThemedView style={styles.container}><ThemedText style={styles.icon}>✓</ThemedText><ThemedText style={styles.title}>Order confirmed!</ThemedText><ThemedText style={styles.copy}>Thank you for shopping with Paper Trail Books. We will contact you when your order ships.</ThemedText><Pressable style={styles.button} onPress={() => router.replace('/')}><ThemedText style={styles.buttonText}>Back to home</ThemedText></Pressable></ThemedView>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F6F2EA', alignItems: 'center', justifyContent: 'center', padding: 30 }, icon: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#3D786C', color: '#FFF8EE', fontSize: 48, textAlign: 'center', lineHeight: 72, fontWeight: '900' }, title: { color: '#202B2A', fontSize: 30, fontWeight: '900', marginTop: 24 }, copy: { color: '#77736B', textAlign: 'center', lineHeight: 24, marginTop: 12 }, button: { backgroundColor: '#202B2A', borderRadius: 16, paddingHorizontal: 24, paddingVertical: 15, marginTop: 28 }, buttonText: { color: '#FFF8EE', fontWeight: '800' } });
