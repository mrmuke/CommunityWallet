import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WalletScreen } from './screens/WalletScreen'
import { ServicesScreen } from './screens/ServicesScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SigninScreen } from './screens/SigninScreen'

import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// function authenticate() {
//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) { 
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userMnemonic: action.mnemonic,
//             isLoading: false
//           }
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userMnemonic: action.mnemonic 
//           }
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userMnemonic: null
//           }
//       }
//     }
//   )
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Signin' component={ SigninScreen }/>
        {/* { state.userMnemonic == null || state.userMnemonic == undefined ? (
        ) : (
          <Tab.Navigator>
            <Tab.Screen name='Wallet' component={ WalletScreen }></Tab.Screen>
            <Tab.Screen name='Services' component={ ServicesScreen }></Tab.Screen>
          </Tab.Navigator>
        ) } */}
      </Stack.Navigator>  
    </NavigationContainer>
  )
}
