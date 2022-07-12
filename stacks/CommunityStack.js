import { createStackNavigator } from '@react-navigation/stack'

import { CommunityScreen } from '../screens/Tab/Community/CommunityScreen'
import { ManageTokensScreen } from '../screens/Tab/Community/ManageTokensScreen'
import { RequestScreen } from '../screens/Tab/Community/RequestCommunityScreen'
import { RequestListScreen } from '../screens/Tab/Community/RequestListScreen'
import { RequestDataScreen } from '../screens/Tab/Community/RequestDataScreen'

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
                    <Stack.Screen name='Manage Tokens' component={ManageTokensScreen}/>
                    <Stack.Screen name='Request Community' component={RequestScreen}/>
                    <Stack.Screen name='Request List' component={RequestListScreen}/>
                    <Stack.Screen name='Request' component={RequestDataScreen}/>
                </Stack.Navigator>
            </RequestListContext.Provider>
        </TokenContext.Provider>
    )
}