import { createStackNavigator } from '@react-navigation/stack'

import { RequestListScreen } from '../screens/Tab/Superuser/RequestListScreen'

const Stack = createStackNavigator()

export function SuperuserStack() { 
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Request List" component={RequestListScreen}/>
        </Stack.Navigator>
    )
}