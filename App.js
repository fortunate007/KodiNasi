import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TenantHomeScreen from './src/screens/TenantHomeScreen';
import ListingDetailScreen from './src/screens/ListingDetailScreen';
import LandlordDashboardScreen from './src/screens/LandlordDashboardScreen';
import AddListingScreen from './src/screens/AddListingScreen';
import colors from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="TenantHome" component={TenantHomeScreen} options={{ title: 'KodiNasi' }} />
        <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ title: 'Listing Details' }} />
        <Stack.Screen name="LandlordDashboard" component={LandlordDashboardScreen} options={{ title: 'My Dashboard' }} />
        <Stack.Screen name="AddListing" component={AddListingScreen} options={{ title: 'Add Listing' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
