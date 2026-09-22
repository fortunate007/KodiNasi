import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function RegisterScreen({ route, navigation }) {
  const role = route.params?.role || 'tenant';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // TODO: connect to Express/Prisma backend -> POST /api/auth/register
    if (role === 'landlord') {
      navigation.replace('LandlordDashboard');
    } else {
      navigation.replace('TenantHome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Register as {role === 'landlord' ? 'a Landlord' : 'a Tenant'}
      </Text>
      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone (+2547...)" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.light, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24, color: colors.dark },
  input: {
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white,
    borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 15,
  },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
