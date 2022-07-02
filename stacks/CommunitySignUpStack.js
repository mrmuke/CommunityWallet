import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CommunityCodeScreen } from '../screens/CommunitySignUp/CommunityCodeScreen'

const Stack = createNativeStackNavigator()

export function CommunitySignUpStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="CommunityCodeScreen"
                component={ CommunityCodeScreen }
            />
        </Stack.Navigator>
    )
}