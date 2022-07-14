import { createStackNavigator } from '@react-navigation/stack'

import { CommunityScreen } from '../screens/Tab/Community/CommunityScreen'
import { RequestScreen } from '../screens/Tab/Community/RequestCommunityScreen'
import { RequestListScreen } from '../screens/Tab/Community/RequestListScreen'
import { RequestDataScreen } from '../screens/Tab/Community/RequestDataScreen'
import { TokenScreen } from '../screens/Tab/Community/TokenScreen'

import { MintAmountScreen } from '../screens/Tab/Community/MintAmountScreen'
import { MintMoreScreen } from '../screens/Tab/Community/MintMoreScreen'
import { MintSymbolScreen } from '../screens/Tab/Community/MintSymbolScreen'
import { RequestListContext, TokenContext } from '../states/Contexts'
import { RequestListService } from '../states/RequestListState'
import { TokenService } from '../states/TokenState'

const Stack = createStackNavigator()

export function CommunityStack() {
    /** Initialize the state management services */
    const { requestListContext, requestListState } = RequestListService()
    const { tokenContext, tokenState } = TokenService()

    return (
        <TokenContext.Provider value={{tokenContext, tokenState}}>
            <RequestListContext.Provider value={{requestListContext, requestListState}}>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name='Community' component={CommunityScreen}/>
                    <Stack.Screen name='Mint Symbol' component={MintSymbolScreen} options={{gestureEnabled: false}}/>
                    <Stack.Screen name='Mint More' component={MintMoreScreen} options={{gestureEnabled: false}}/>
                    <Stack.Screen name='Mint Amount' component={MintAmountScreen} options={{gestureEnabled: false}}/>
                    <Stack.Screen name='Request Community' component={RequestScreen}/>
                    <Stack.Screen name='Request List' component={RequestListScreen}/>
                    <Stack.Screen name='Request' component={RequestDataScreen}/>
                    <Stack.Screen name='Token' component={TokenScreen}/>
                </Stack.Navigator>
            </RequestListContext.Provider>
        </TokenContext.Provider>
    )
}