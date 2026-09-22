import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');

  const handleLogin = () => {
    // TODO: connect to Express/Prisma backend -> POST /api/auth/login
    if (role === 'landlord') {
      navigation.replace('LandlordDashboard');
    } else {
      navigation.replace('TenantHome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleBtn, role === 'tenant' && styles.roleBtnActive]}
          onPress={() => setRole('tenant')}
        >
          <Text style={role === 'tenant' ? styles.roleTextActive : styles.roleText}>Tenant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleBtn, role === 'landlord' && styles.roleBtnActive]}
          onPress={() => setRole('landlord')}
        >
          <Text style={role === 'landlord' ? styles.roleTextActive : styles.roleText}>Landlord</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.light, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: colors.dark },
  roleRow: { flexDirection: 'row', marginBottom: 20, backgroundColor: colors.white, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  roleBtn: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 10 },
  roleBtnActive: { backgroundColor: colors.primary },
  roleText: { color: colors.gray, fontWeight: '600' },
  roleTextActive: { color: colors.white, fontWeight: '700' },
  input: {
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white,
    borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 15,
  },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
