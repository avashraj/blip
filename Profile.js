import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { appAuth } from './firebaseConfig';

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
  const user = appAuth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(appAuth); // Sign out the user
      console.log('User signed out successfully');
      // Navigation back to the login screen is handled by your authentication state listener in App.js
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Error', 'Failed to sign out.');
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text>Email: {user.email}</Text>
      ) : (
        <Text>User not signed in</Text>
      )}
      <Button
        title="Logout"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </View>
  );
}
