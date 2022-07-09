import { createStackNavigator } from '@react-navigation/stack'

import { CommunityScreen } from '../screens/Tab/Community/CommunityScreen'
import { RequestScreen } from '../screens/Tab/Community/RequestCommunityScreen'
import { RequestListScreen } from '../screens/Tab/Community/RequestListScreen'
import { RequestDataScreen } from '../screens/Tab/Community/RequestDataScreen'

import { RequestListContext } from '../states/Contexts'
import { RequestListService } from '../states/RequestListState'

const Stack = createStackNavigator()

export function CommunityStack() {
    /** Initialize the RequestListService for state management */
    const { requestListContext, requestListState } = RequestListService()

    return (
        <RequestListContext.Provider value={{requestListContext, requestListState}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Community' component={CommunityScreen}/>
                <Stack.Screen name='Request Community' component={RequestScreen}/>
                <Stack.Screen name='Request List' component={RequestListScreen}/>
                <Stack.Screen name='Request' component={RequestDataScreen}/>
            </Stack.Navigator>
        </RequestListContext.Provider>
    )
}