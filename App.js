import { AuthContext } from './utils/AuthContext'
import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native-web'

import { authenticate } from './utils/Authenticate'
import { AuthStack } from './stacks/AuthStack'
import { WalletStack } from './stacks/WalletStack'
import { SplashScreen } from './screens/SplashScreen'
import './i18n/index'

export default function App() {
  const { authContext, state } = authenticate()

  if (state.isLoading) { return <SplashScreen/> }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthContext.Provider value={{authContext, state}}>
          {
            !state.mnemonic ? (
              AuthStack()
            ) : (
              WalletStack()
            )
          }
        </AuthContext.Provider>
        <FlashMessage position="top" />
      </NativeBaseProvider>
    </NavigationContainer>
  )
}