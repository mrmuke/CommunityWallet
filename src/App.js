import { registerRootComponent } from 'expo'
import { NativeBaseProvider } from 'native-base'
import FlashMessage from 'react-native-flash-message'
import { NavigationContainer } from '@react-navigation/native'

import { AuthStack } from './stacks/AuthStack'
import { authenticate } from './states/AuthState'
import { CommunitySignUpStack } from './stacks/CommunitySignUpStack'
import { AuthContext, CommunityContext } from './states/Contexts'
import { CommunityService } from './states/CommunityState'
import './i18n/index'
import { SplashScreen } from './components/Screens/SplashScreen'
import { TabStack } from './stacks/TabStack'
import { MyTheme } from './styles/theme'


function App() {
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

export default registerRootComponent(App)
