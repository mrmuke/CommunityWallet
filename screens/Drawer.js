import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'
import Send from './Wallet/Wallet'

const Drawer = createDrawerNavigator();

export default function App({navigation}){

    return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Send" component={Send}/>
      </Drawer.Navigator>
    );
    
}