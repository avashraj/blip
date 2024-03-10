import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
  },
  calloutView: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    maxWidth: 150, // Adjust the size of the callout
  },
  calloutImage: {
    width: 140, // Adjust the size of the image
    height: 100, // Adjust the size of the image
    resizeMode: 'cover',
  },
  calloutText: {
    paddingTop: 5,
  },
});

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "locations"));
        const locationsArray = [];
        querySnapshot.forEach((doc) => {
          let location = doc.data();
          location.id = doc.id;
          locationsArray.push(location);
        });
        setLocations(locationsArray);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
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
            title={location.name} // This title shows up in the default tooltip, might be redundant with a custom callout
          >
            <Callout tooltip>
              <View style={styles.calloutView}>
                <Image source={{ uri: location.imageUrl }} style={styles.calloutImage} />
                <Text style={styles.calloutText}>{location.name}</Text>
                <Text style={styles.calloutText}>{location.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
