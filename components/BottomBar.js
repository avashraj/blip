import React from 'react';
import { View, StyleSheet } from 'react-native';
import PlusButton from './PlusButton';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50, // Set the height for your bottom bar
    backgroundColor: '#000000', // Light grey background for contrast
    flexDirection: 'row', // Aligns children (e.g., buttons) in a row
    alignItems: 'center', // Centers children vertically
    justifyContent: 'space-between', // Evenly spaces children within the line
    paddingHorizontal: 10
  }
});

export default BottomBar;


