import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommunityCodeScreen } from '../screens/Community/CommunityCodeScreen'
import { CommunityListScreen } from '../screens/Community/CommunityListScreen'

const Stack = createNativeStackNavigator()

export function CommunitySignUpStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CommunityListScreen"
                component={ CommunityListScreen }
            />
            <Stack.Screen
                name="CommunityCodeScreen"
                component={ CommunityCodeScreen }
            />
        </Stack.Navigator>
    )
}