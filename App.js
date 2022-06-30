import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext, CommunityContext } from './utils/Contexts'
import { authenticate } from './utils/AuthUtils'
import { AuthStack } from './stacks/AuthStack'
import { initCommService } from './utils/CommunityUtils'
import { CommunitySignUpStack } from './stacks/CommunitySignUpStack'
import { WalletStack } from './stacks/WalletStack'
import { SplashScreen } from './screens/SplashScreen'
import { MyTheme } from './styles/theme'
import './i18n/index'

export default function App() {
  const { authContext, authState } = authenticate()
  const { communityContext, communityState } = initCommService()

  if (authState.isLoading) { return <SplashScreen/> }

  return (
    <NavigationContainer theme={MyTheme}>
      <NativeBaseProvider>
        <AuthContext.Provider value={{authContext, authState}}>
            <CommunityContext.Provider value={{communityContext, communityState}}>
              {
                !authState.user ? (
                  AuthStack()
                ) : 
                !communityState.currentCommunity ? (
                  CommunitySignUpStack()
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