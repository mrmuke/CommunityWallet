import { createStackNavigator } from '@react-navigation/stack'

import { ReqListScreen } from '../screens/Tab/Superuser/ReqListScreen'
import { ReqDataScreen } from '../screens/Tab/Superuser/ReqDataScreen'

import { ReqListContext } from '../states/Contexts'
import { ReqListService } from '../states/ReqListState'

const Stack = createStackNavigator()

export function SuperuserStack() { 
    /** Initialize the ReqListService for state management for state management of request lists */
    const { reqListContext, reqListState } = ReqListService()

    return (
        <ReqListContext.Provider value={{reqListContext, reqListState}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='Request List' component={ReqListScreen}/>
                <Stack.Screen name='Request' component={ReqDataScreen}/>
            </Stack.Navigator>
        </ReqListContext.Provider>
    )
}