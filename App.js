import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from './firebaseConfig';
import Login from './Login';
import Map from './Map';
import Plus from './Plus';
import Profile from './Profile';
import LocationPermissions from './LocationPermissions';

import { Ionicons } from '@expo/vector-icons';

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
            <Tab.Navigator
              screenOptions={{
                headerShown: false, // This will hide the header for all screens
              }}
            >
              <Tab.Screen
                name="Map"
                component={Map}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="map-outline" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Plus"
                component={Plus}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-circle-outline" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </>
      )}
    </NavigationContainer>
  );
}
