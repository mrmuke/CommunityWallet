import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Drawer from './screens/Drawer'
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIwcuAX4RLMczJFAhlrVechxp9EEn7szQ",
  authDomain: "communitywallet-ed36c.firebaseapp.com",
  projectId: "communitywallet-ed36c",
  storageBucket: "communitywallet-ed36c.appspot.com",
  messagingSenderId: "697161665894",
  appId: "1:697161665894:web:83280e7c5a650375448ca7",
  measurementId: "G-5E83HSB3X0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Drawer" component={Drawer}/>
        
      </Stack.Navigator></NativeBaseProvider>
    </NavigationContainer>
  );

}

