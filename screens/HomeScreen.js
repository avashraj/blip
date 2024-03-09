import React from 'react';
import { View, StyleSheet, NativeAppEventEmitter } from 'react-native';
import MapViewComponent from '../components/MapViewComponent';
import BottomBar from '../components/BottomBar'; // Assuming you've created this component
import PlusButton from '../components/PlusButton';
import ProfileButton  from '../components/ProfileButton';


const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Map occupies the upper portion of the screen, flex allows it to fill available space */}
      <View style={styles.mapContainer}>
        <MapViewComponent />
      </View>
      <MyTabs />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 7, // Adjust this flex value to allocate less space to the map and more to the bottom bar
  },
  bottomBarContainer: {
    flex: 1, // Increase this flex value to give more space to the bottom bar
    backgroundColor: '#E0E0E0', // Assuming this color makes the bar visible
  },
  // Removed the map style since it should be handled within the MapViewComponent
});

export default HomeScreen;

