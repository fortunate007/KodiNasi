import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import listings from '../data/mockListings';
import colors from '../theme/colors';

export default function LandlordDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>My Listings</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddListing')}>
          <Ionicons name="add" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={{ flex: 1, padding: 12 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardEstate}>{item.estate}</Text>
              <Text style={styles.cardPrice}>KSh {item.price.toLocaleString()} /mo</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 22, fontWeight: '800', color: colors.dark },
  addBtn: { backgroundColor: colors.primary, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  card: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: 14,
    marginBottom: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.border,
  },
  cardImage: { width: 100, height: 100 },
  cardTitle: { fontWeight: '700', fontSize: 15, color: colors.dark },
  cardEstate: { color: colors.gray, marginTop: 2 },
  cardPrice: { color: colors.primary, fontWeight: '700', marginTop: 6 },
});
