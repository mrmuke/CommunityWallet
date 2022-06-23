import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext, CommunityContext } from './utils/Contexts'
import { authenticate } from './utils/Authenticate'
import { AuthStack } from './stacks/AuthStack'
import { initCommunity } from './utils/Community'
import { CommunityStack } from './stacks/CommunityStack'
import { WalletStack } from './stacks/WalletStack'
import { SplashScreen } from './screens/SplashScreen'
import './i18n/index'

export default function App() {
  const { authContext, authState } = authenticate()
  const { communityContext, communityState } = initCommunity()

  if (authState.isLoading) { return <SplashScreen/> }

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthContext.Provider value={{authContext, authState}}>
            <CommunityContext.Provider value={{communityContext, communityState}}>
              {
                !authState.user ? (
                  AuthStack()
                ) : 
                !communityState.currentCommunity ? (
                  CommunityStack()
                ) : (
                  WalletStack()
                )
              }
            </CommunityContext.Provider>
        </AuthContext.Provider>
        <FlashMessage position="top"/>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}