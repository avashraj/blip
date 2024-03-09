import React from 'react';
import { View, StyleSheet } from 'react-native';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      {/* Your buttons or other UI elements will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50, // Set the height for your bottom bar
    backgroundColor: '#E0E0E0', // Light grey background for contrast
    flexDirection: 'row', // Aligns children (e.g., buttons) in a row
    justifyContent: 'space-around', // Evenly spaces children within the line
    alignItems: 'center', // Centers children vertically
  }
});

export default BottomBar;


