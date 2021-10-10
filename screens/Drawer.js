import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Wallet'
import Services from './Wallet/Services'
import CreateServices from './Wallet/CreateServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../auth-context';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
  const {authContext} = React.useContext(AuthContext);

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
              onPress={() => { authContext.signOut() }}
            />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Send" component={Send}/>
        <Drawer.Screen name="Services" component={Services}/>
        <Drawer.Screen name="Create" component={CreateServices}/>

    </Drawer.Navigator>
  );
}
