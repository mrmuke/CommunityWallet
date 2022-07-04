import { createStackNavigator } from '@react-navigation/stack'

import { ReqListScreen } from '../screens/Tab/Superuser/ReqListScreen'
import { ReqDataScreen } from '../screens/Tab/Superuser/ReqDataScreen'

const Stack = createStackNavigator()

export function SuperuserStack() { 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Request List' component={ReqListScreen}/>
            <Stack.Screen name='Request' component={ReqDataScreen}/>
        </Stack.Navigator>
    )
}