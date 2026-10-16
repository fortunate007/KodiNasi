import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import colors from '../theme/colors';

// Accepts 07xx/01xx, 254..., +254...; returns +254XXXXXXXXX or null
export function normalizePhone(input) {
  const d = input.replace(/[\s\-()]/g, '');
  if (/^\+254[17]\d{8}$/.test(d)) return d;
  if (/^254[17]\d{8}$/.test(d)) return '+' + d;
  if (/^0[17]\d{8}$/.test(d)) return '+254' + d.slice(1);
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen({ route, navigation }) {
  const role = route.params?.role || 'tenant';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Enter your full name';
    if (email.trim() && !EMAIL_RE.test(email.trim())) e.email = 'Enter a valid email';
    if (!normalizePhone(phone)) e.phone = 'Enter a valid Kenyan number, e.g. 0712345678';
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (confirm !== password) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase() || null,
      phone: normalizePhone(phone),
      password,
      role: role.toUpperCase(),
    };
    // TODO: POST /api/auth/register with payload, then go to a Verify screen (OTP)
    console.log('register payload', { ...payload, password: '***' });
    navigation.replace(role === 'landlord' ? 'LandlordDashboard' : 'TenantHome');
  };

  const Err = ({ k }) => (errors[k] ? <Text style={styles.error}>{errors[k]}</Text> : null);

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>
        Register as {role === 'landlord' ? 'a Landlord' : 'a Tenant'}
      </Text>

      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <Err k="name" />

      <TextInput style={styles.input} placeholder="Phone (07... or +2547...)" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <Err k="phone" />

      <TextInput style={styles.input} placeholder="Email (optional)" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Err k="email" />

      <View style={styles.pwRow}>
        <TextInput style={[styles.input, styles.pwInput]} placeholder="Password (min 8 characters)" secureTextEntry={!showPw} autoCapitalize="none" value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={() => setShowPw(!showPw)} style={styles.toggle}>
          <Text style={styles.toggleText}>{showPw ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <Err k="password" />

      <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={!showPw} autoCapitalize="none" value={confirm} onChangeText={setConfirm} />
      <Err k="confirm" />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: colors.light, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 24, color: colors.dark },
  input: {
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white,
    borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 15,
  },
  pwRow: { position: 'relative' },
  pwInput: { paddingRight: 64 },
  toggle: { position: 'absolute', right: 14, top: 14 },
  toggleText: { color: colors.primary, fontWeight: '700' },
  error: { color: '#C62828', fontSize: 13, marginTop: -8, marginBottom: 12 },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
