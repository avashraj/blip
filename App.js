import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { appAuth } from './firebaseConfig'; // Adjust the import path as necessary
import Login from './Login'; // Adjusted import
import Map from './Map'; // Adjusted import
import Plus from './Plus'; // Adjusted import
import Profile from './Profile'; // Adjusted import

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(appAuth, user => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe; // for cleanup
  }, []);

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Plus" component={Plus} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

