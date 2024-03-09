// Profile.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { appAuth } from './firebaseConfig'; // Ensure this path matches the location of your Firebase configuration

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default function Profile() {
  const handleLogout = async () => {
    try {
      await signOut(appAuth); // Sign out the user
      console.log('User signed out successfully');
      // Navigation back to the login screen is handled by your authentication state listener in App.js
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Profile View Placeholder</Text>
      <Button
        title="Logout"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </View>
  );
}
