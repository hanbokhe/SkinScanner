import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen.jsx';
import Details from './components/Details.jsx';

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen name="SkinScanner" component={HomeScreen} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

