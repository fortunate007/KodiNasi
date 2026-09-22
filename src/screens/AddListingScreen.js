import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../theme/colors';

export default function AddListingScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [estate, setEstate] = useState('');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    // TODO: connect to Express/Prisma backend -> POST /api/listings
    // Also wire Cloudinary here for photo upload
    Alert.alert('Listing saved (demo)', `${title} in ${estate} added successfully.`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Listing</Text>
      <TextInput style={styles.input} placeholder="Title e.g. Modern 1BR Apartment" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Estate e.g. Kilimani" value={estate} onChangeText={setEstate} />
      <TextInput style={styles.input} placeholder="Price per month (KSh)" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Bedrooms (0 for bedsitter)" keyboardType="numeric" value={bedrooms} onChangeText={setBedrooms} />
      <TextInput
        style={[styles.input, { height: 90 }]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Listing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.light },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: colors.dark },
  input: {
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white,
    borderRadius: 10, padding: 14, marginBottom: 14, fontSize: 15,
  },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
