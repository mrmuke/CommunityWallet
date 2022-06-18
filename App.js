import { AuthContext } from './utils/AuthContext'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

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
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
