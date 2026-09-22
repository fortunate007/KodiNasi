import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import listings from '../data/mockListings';
import colors from '../theme/colors';

export default function TenantHomeScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return listings;
    const q = query.toLowerCase();
    return listings.filter(
      (l) => l.estate.toLowerCase().includes(q) || l.title.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find a home in Nairobi</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color={colors.gray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search estate e.g. Kilimani, Kasarani..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListingDetail', { listing: item })}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={{ flex: 1, padding: 12 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardEstate}>{item.estate}</Text>
              <Text style={styles.cardPrice}>KSh {item.price.toLocaleString()} /mo</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No listings match that search.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light, padding: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.dark, marginBottom: 14 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 16,
    borderWidth: 1, borderColor: colors.border,
  },
  searchInput: { marginLeft: 8, flex: 1, fontSize: 15 },
  card: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 14,
    marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.border,
  },
  cardImage: { width: 110, height: 110 },
  cardTitle: { fontWeight: '700', fontSize: 15, color: colors.dark },
  cardEstate: { color: colors.gray, marginTop: 2 },
  cardPrice: { color: colors.primary, fontWeight: '700', marginTop: 6 },
  empty: { textAlign: 'center', color: colors.gray, marginTop: 40 },
});
