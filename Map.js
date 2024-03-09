// Map.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Map() {
  return (
    <View style={styles.mapContainer}>
      <Text>Map View Placeholder</Text>
    </View>
  );
}
