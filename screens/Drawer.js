import React from 'react';
import { StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Wallet'
import Services from './Wallet/Services'
import CreateServices from './Wallet/CreateServices';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}){

    return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Send" component={Send}/>
        <Drawer.Screen name="Services" component={Services}/>
        <Drawer.Screen name="Create" component={CreateServices}/>
      </Drawer.Navigator>
    );
    
}
