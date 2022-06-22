import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext, UserContext, CommunityContext } from './utils/Contexts'
import { authenticate } from './utils/Authenticate'
import { AuthStack } from './stacks/AuthStack'
import { CommunityStack } from './stacks/CommunityStack'
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
          <UserContext.Provider value={state.user}>
            <CommunityContext.Provider value={}>
              {
                !state.mnemonic ? (
                  AuthStack()
                ) : 
                !state.community ? (
                  CommunityStack()
                ) : (
                  WalletStack()
                )
              }
            </CommunityContext.Provider>
          </UserContext.Provider>
        </AuthContext.Provider>
        <FlashMessage position="top"/>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}