import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Send'
import Signup from './Signup';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}){

    return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Send" component={Send}/>
        <Drawer.Screen name="Signup" component={Signup}/>
      </Drawer.Navigator>
    );
    
}
