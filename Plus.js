import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { appStorage, firestore } from './firebaseConfig';
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
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default function Plus() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');

  const pickImage = async () => {
    console.log('Requesting media library permissions...');
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "You've refused to allow this app to access your photos!");
      return;
    }
  
    console.log('Launching image picker...');
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    console.log('Image picker result:', JSON.stringify(pickerResult));
  
    if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets[0].uri) {
      setImageUri(pickerResult.assets[0].uri);
      setOriginalFileName(pickerResult.assets[0].fileName || 'Unnamed_File');
      console.log(`Image selected: ${pickerResult.assets[0].uri}`);
    } else {
      console.log("Image picking was cancelled or no URI found");
    }
  };
  

  const getCurrentLocation = async () => {
    console.log('Requesting location permissions...');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    console.log('Getting current location...');
    let location = await Location.getCurrentPositionAsync({});
    console.log(`Current location: ${JSON.stringify(location.coords)}`);
    return location.coords;
  };

  const uploadLocationAndImage = async () => {
    console.log('Starting upload process...');
    if (!imageUri) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }
  
    console.log('Fetching current location...');
    const coords = await getCurrentLocation();
    if (!coords) {
      Alert.alert('Location error', 'Could not fetch location.');
      return;
    }
  
    console.log('Uploading image to storage...');
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const fileName = originalFileName || `image_${new Date().getTime()}.jpg`;
    const storageReference = ref(appStorage, `images/${fileName}`);
  
    try {
      await uploadBytes(storageReference, blob);
      const downloadURL = await getDownloadURL(storageReference);
      
      await addDoc(collection(firestore, "locations"), {
        name,
        description,
        imageUrl: downloadURL,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
  
      Alert.alert('Upload successful!', 'Your location and image have been saved.');
  
      // Resetting the form and image preview to their initial states
      setName('');
      setDescription('');
      setImageUri('');
      setOriginalFileName('');
    } catch (error) {
      console.error('Error uploading data:', error);
      Alert.alert('Upload failed', 'There was a problem uploading your data.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Location Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri ? (
        <View style={styles.imagePreview}>
          <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} />
        </View>
      ) : (
        <Text>No Image Selected</Text>
      )}
      <Button title="Upload Location and Image" onPress={uploadLocationAndImage} />
    </View>
  );
}
