import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { appStorage } from './firebaseConfig'; // Make sure this points to your Firebase config initialization

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
  const [originalFileName, setOriginalFileName] = useState(''); // Store the original file name

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled && pickerResult.assets && pickerResult.assets[0].uri) {
      setImageUri(pickerResult.assets[0].uri);
      setOriginalFileName(pickerResult.assets[0].fileName || 'Unnamed_File'); // Set the original file name or a default
    } else {
      console.log("Image picking was cancelled or no URI found");
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No image selected', 'Please select an image first.');
      return;
    }
  
    const response = await fetch(imageUri);
    const blob = await response.blob();
  
    // Attempt to use the original filename if available, otherwise fallback to a timestamp
    const fileName = originalFileName || `image_${new Date().getTime()}.jpg`;
    const storageReference = ref(appStorage, `images/${fileName}`);
  
    try {
      await uploadBytes(storageReference, blob);
      const downloadURL = await getDownloadURL(storageReference);
      console.log('Download URL:', downloadURL);
      Alert.alert('Upload successful!', 'The image has been uploaded with its original name.');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Upload failed', 'There was a problem uploading your image.');
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
      <Button title="Upload Location and Image" onPress={uploadImage} />
    </View>
  );
}
