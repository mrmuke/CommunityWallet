import { createStackNavigator } from '@react-navigation/stack'

import { CommunityScreen } from '../screens/Tab/Community/CommunityScreen'
import { CommunityRequestScreen } from '../screens/Tab/Community/RequestCommunityScreen'
import { CommunityRequestListScreen } from '../screens/Tab/Community/CommunityRequestListScreen'
import { CommunityRequestDataScreen } from '../screens/Tab/Community/CommunityRequestDataScreen'

const Stack = createStackNavigator()

export function CommunityStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Community' component={CommunityScreen}/>
            <Stack.Screen name='Request Community' component={CommunityRequestScreen}/>
            <Stack.Screen name='Request List' component={CommunityRequestListScreen}/>
            <Stack.Screen name='Request' component={CommunityRequestDataScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}