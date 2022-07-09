import FlashMessage from 'react-native-flash-message'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AuthContext, CommunityContext } from './states/Contexts'
import { authenticate } from './states/AuthState'
import { AuthStack } from './stacks/AuthStack'
import { CommunityService } from './states/CommunityState'
import { CommunitySignUpStack } from './stacks/CommunitySignUpStack'
import { TabStack } from './stacks/TabStack'
import { SplashScreen } from './screens/Components/SplashScreen'
import { MyTheme } from './styles/theme'
import './i18n/index'

import axios from 'axios'

export default function App() {
  const { authContext, authState } = authenticate()
  const { communityContext, communityState } = CommunityService(authContext, authState)

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
                  TabStack(JSON.parse(authState.user).superuser)
                )
              }
            </CommunityContext.Provider>
        </AuthContext.Provider>
        <FlashMessage position="top"/>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}