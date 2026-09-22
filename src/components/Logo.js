import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function Logo({ size = 64, showTagline = true }) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { width: size, height: size, borderRadius: size / 2 }]}>
        <Ionicons name="home" size={size * 0.55} color={colors.white} />
      </View>
      <Text style={styles.wordmark}>
        <Text style={{ color: colors.primary }}>Kodi</Text>
        <Text style={{ color: colors.accent }}>Nasi</Text>
      </Text>
      {showTagline && <Text style={styles.tagline}>Nyumba yako, popote Nairobi</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  iconWrap: {
    backgroundColor: '#0B6E4F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  wordmark: { fontSize: 28, fontWeight: '800', letterSpacing: 0.5 },
  tagline: { fontSize: 12, color: colors.gray, marginTop: 4 },
});
