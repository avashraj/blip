import React from "react";
import MapView from 'react-native-maps'
import { StyleSheet, Dimensions } from "react-native";

const MapViewComponent = () => {
    return (
        <MapView style={styles.map} />
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default MapViewComponent;