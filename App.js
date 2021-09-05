import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import Login from './screens/Login'
import Signup from './screens/Signup'
import Drawer from './screens/Drawer'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Drawer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

/*
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
*/