import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from './firebaseConfig'; // Adjust the import path as necessary
import Login from './Login'; // Adjusted import
import Map from './Map'; // Adjusted import
import Plus from './Plus'; // Adjusted import
import Profile from './Profile'; // Adjusted import
import LocationPermissions from './LocationPermissions'; // Import LocationPermissions component

import {Ionicons} from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [location, setLocation] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, user => {
      setIsLoggedIn(!!user);
      setShowLocationPermission(!!user); // Set showLocationPermission to true when user is logged in
    });
    return unsubscribe; // for cleanup
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          {!location ? ( // Render LocationPermissions component if showLocationPermission is true
            <LocationPermissions location={location} setLocation={setLocation} />
          ) : (
            <Tab.Navigator>
              <Tab.Screen name="Map" component={Map} 
              options={{
            tabBarIcon:({color, size})=>(
              <Ionicons  name="map-outline" size={30} color ="#000000"/>
            )
          }}
          />
          

          <Tab.Screen name="Plus" component={Plus} 
          options={{ tabBarIcon:({color, size}) =>(
            <Ionicons name="add-circle" size = {30} color = "#000000" />
          )
        }}
          />

          <Tab.Screen name="Profile" component={Profile} 
           options={{
            tabBarIcon:({color, size}) =>(
              <Ionicons name="person-circle-outline" size = {30} color = "#000000" />
            )
          }}
          />
            </Tab.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
}
