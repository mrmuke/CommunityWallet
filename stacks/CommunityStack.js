import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommunityCodeScreen } from '../screens/CommunityCodeScreen'

const Stack = createNativeStackNavigator()

export function CommunityStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CommunityCodeScreen"
                component={ CommunityCodeScreen }
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}