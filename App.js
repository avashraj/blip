import * as React from 'react';
import { Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { View, StyleSheet, NativeAppEventEmitter } from 'react-native';
import MapViewComponent from './components/MapViewComponent';
import { Mapview } from 'expo';



function Map(){
  return(
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <HomeScreen/> */}
      
      <View style={styles.mapContainer}>
        <MapViewComponent/>
      </View>
    </View>
  );
}



function Plus(){
  return(
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  

    </View>
  );
}
function Profile(){
  return(
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text> Profile</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 7, // Adjust this flex value to allocate less space to the map and more to the bottom bar
  },
}
);
export default function App() {
  return (
<NavigationContainer>
  <Tab.Navigator>
  <Tab.Screen name = 'Map' component = {Map} />
    <Tab.Screen name = 'Plus' component = {Plus} />
    <Tab.Screen name = 'Profile' component = {Profile} />
    
  </Tab.Navigator>
</NavigationContainer>
  );
}
