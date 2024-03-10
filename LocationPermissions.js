import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, Alert } from 'react-native'; // Import Alert from react-native
import Device from 'expo-device';
import * as Location from 'expo-location';

export default function LocationPermissions(props) {
  const [errorMsg, setErrorMsg] = useState(null);
  const location = props.location
  const setLocation = props.setLocation

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          'Location Permission Required',
          'This app needs access to your location to function properly. Please grant permission.',
          [
            {
              text: 'OK',
              onPress: () => console.log('Permission denied'),
            },
          ],
          { cancelable: false }
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
