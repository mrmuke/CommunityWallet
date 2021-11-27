import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Home from './Home'
import Send from './Wallet/Send'
import Services from './Wallet/Services'
import CreateServices from './Wallet/CreateServices';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AuthContext from '../auth-context';
import Wallet from './Wallet/Wallet';
import tokens from '../i18n/tokens';
import { Divider, View } from 'native-base';
import LanguageIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';



const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const {t,i18n} = useTranslation()
  const { home_W, send_W, wallet_W, services_W, logout_W,language_W} = tokens.tabs
const homeWord = t(home_W)
const sendWord = t(send_W)
const walletWord = t(wallet_W)
const servicesWord = t(services_W)
const logoutWord = t(logout_W)
  const { authContext } = React.useContext(AuthContext);
  async function switchLanguage(){
    let cur =  await AsyncStorage.getItem('setLanguage')
    let newLang= cur=="en"?"cn":"en"
    console.log(newLang)
    await AsyncStorage.setItem('setLanguage',newLang)
    i18n.changeLanguage(newLang)
  }
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} drawerContent={props => {
      return (
        <DrawerContentScrollView  {...props}>
          <View style={{marginVertical:20}}>
          <Divider/>
          <DrawerItem
          style={{paddingVertical:10}}
            icon={({ color, size }) => (
              <LanguageIcon
                name="language"
                color={color}
                size={size}
              />
            )} label={t(language_W)}
            onPress={() => { switchLanguage()}}
          />
          <Divider/></View>
          
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
