import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Send'
import Services from './Wallet/Services'
import CreateServices from './Wallet/CreateServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../auth-context';
import Wallet from './Wallet/Wallet';
import i18n from '../i18n/index'
import tokens from '../i18n/tokens';

const { home_W, send_W, wallet_W, services_W, logout_W } = tokens.tabs
const homeWord = i18n.t(home_W)
const sendWord = i18n.t(send_W)
const walletWord = i18n.t(wallet_W)
const servicesWord = i18n.t(services_W)
const logoutWord = i18n.t(logout_W)

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
  const { authContext } = React.useContext(AuthContext);

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
            label={homeWord}
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
            label={sendWord}
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
            label={walletWord}
            onPress={() => { props.navigation.navigate('Wallet') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="shopping"
                color={color}
                size={size}
              />
            )}
            label={servicesWord}
            onPress={() => { props.navigation.navigate('Services') }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="logout"
                color={color}
                size={size}
              />
            )}
            label={logoutWord}
            onPress={() => { authContext.signOut() }}
          />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Send" component={Send} />
      <Drawer.Screen name="Services" component={Services} />
      <Drawer.Screen name="Create" component={CreateServices} />
      <Drawer.Screen name="Wallet" component={Wallet} />
    </Drawer.Navigator>
  );
}
