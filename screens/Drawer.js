import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Send'
import Wallet from './Wallet/Wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {

  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => { props.navigation.navigate('Home') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="send"
                  color={color}
                  size={size}
                />
              )}
              label="Send"
              onPress={() => { props.navigation.navigate('Send') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="wallet"
                  color={color}
                  size={size}
                />
              )}
              label="Wallet"
              onPress={() => { props.navigation.navigate('Wallet') }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="logout"
                  color={color}
                  size={size}
                />
              )}
              label="Logout"
              onPress={() => { AsyncStorage.removeItem('wallet'); navigation.navigate('Auth') }}
            />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Send" component={Send} />
      <Drawer.Screen name="Wallet" component={Wallet} />

    </Drawer.Navigator>
  );

}
