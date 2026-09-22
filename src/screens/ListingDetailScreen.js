import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function ListingDetailScreen({ route }) {
  const { listing } = route.params;

  const call = () => Linking.openURL(`tel:${listing.phone}`);
  const whatsapp = () => Linking.openURL(`https://wa.me/${listing.phone.replace('+', '')}`);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: listing.image }} style={styles.image} />
      <View style={{ padding: 18 }}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.estate}>{listing.estate}, Nairobi</Text>
        <Text style={styles.price}>KSh {listing.price.toLocaleString()} / month</Text>
        <Text style={styles.bedrooms}>
          {listing.bedrooms === 0 ? 'Bedsitter / Single room' : `${listing.bedrooms} Bedroom(s)`}
        </Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{listing.description}</Text>
        <Text style={styles.sectionTitle}>Landlord</Text>
        <Text style={styles.description}>{listing.landlord}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={call}>
            <Ionicons name="call" size={18} color={colors.white} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]} onPress={whatsapp}>
            <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  image: { width: '100%', height: 260 },
  title: { fontSize: 22, fontWeight: '800', color: colors.dark },
  estate: { color: colors.gray, marginTop: 4, fontSize: 15 },
  price: { color: colors.primary, fontWeight: '700', fontSize: 20, marginTop: 10 },
  bedrooms: { color: colors.dark, marginTop: 4 },
  sectionTitle: { fontWeight: '700', fontSize: 16, marginTop: 18, marginBottom: 6, color: colors.dark },
  description: { color: colors.gray, lineHeight: 20 },
  actionRow: { flexDirection: 'row', marginTop: 26, gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12 },
  actionText: { color: colors.white, fontWeight: '700' },
});
