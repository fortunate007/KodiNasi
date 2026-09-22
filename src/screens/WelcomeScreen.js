import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import colors from '../theme/colors';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Logo size={90} />
      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Register', { role: 'tenant' })}
      >
        <Text style={styles.buttonText}>I'm looking for a house</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('Register', { role: 'landlord' })}
      >
        <Text style={styles.buttonText}>I'm a landlord</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 18 }}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.light, justifyContent: 'flex-end' },
  button: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  loginText: { textAlign: 'center', color: colors.gray, marginBottom: 30 },
});
