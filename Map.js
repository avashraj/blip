import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native'; // Ensure Image and Text are imported
import MapView, { Marker, Callout } from 'react-native-maps';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebaseConfig';


const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "locations"), (querySnapshot) => {
      const locationsArray = [];
      querySnapshot.forEach((doc) => {
        let location = {
          id: doc.id,
          ...doc.data(),
        };
        // Ensure latitude and longitude are numbers
        location.latitude = Number(location.latitude);
        location.longitude = Number(location.longitude);
        locationsArray.push(location);
      });
      setLocations(locationsArray);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView style={StyleSheet.absoluteFillObject}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
            description={location.description}
          >
            <Callout>
              <View>
                <Image source={{ uri: location.imageUrl }} style={{ width: 100, height: 100 }} />
                <Text>{location.name}</Text>
                <Text>{location.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
