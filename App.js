import { AuthContext } from './utils/AuthContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { authenticate } from './utils/Authenticate'
import { LoginScreen } from './screens/LoginScreen'
import { SplashScreen } from './screens/SplashScreen'
import { WalletScreen } from './screens/WalletScreen'
import './i18n/index'

const Stack = createNativeStackNavigator()

export default function App() {
  const { authContext, state } = authenticate()

  if (state.isLoading) { return <SplashScreen/> }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthContext.Provider value={{authContext, state}}>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {
              !state.mnemonic ? (
                <Stack.Screen name='Auth' component={ LoginScreen } />
              ) : (
                <Stack.Screen name='Wallet' component={ WalletScreen } />
              )
            }
          </Stack.Navigator>
        </AuthContext.Provider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
