// Login.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from './firebaseConfig'; // Ensure this is correctly imported based on your project structure
import * as Location from 'expo-location';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getLocationPermission() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable location services to use the app.');
      }
    }

    getLocationPermission();
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(appAuth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(appAuth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Email' 
        value={email} 
        style={styles.input} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <TextInput 
        placeholder='Password' 
        value={password} 
        secureTextEntry 
        style={styles.input} 
        onChangeText={setPassword} 
      />
      <Button title="Login" onPress={signIn} />
      <Button title="Sign Up" onPress={signUp} />

      {loading && <ActivityIndicator size="large" />}
    </View>
  );
}
