import React from 'react';
import { StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home'
import Wallet from './Wallet'
import Login from './Login'
import Signup from './Signup';
import AdminNavigator from './AdminNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}){

    return (
      <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Dashboard" component={Home}/>
        <Drawer.Screen name="Wallet" component={Wallet}/>
        <Drawer.Screen name="Login" component={Login}/>
        <Drawer.Screen name="Signup" component={Signup}/>
        <Drawer.Screen name="Admin Navigator" component={AdminNavigator}/>
      </Drawer.Navigator>
    );
    
}
