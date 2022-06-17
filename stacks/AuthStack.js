import { LoginScreen } from "../screens/LoginScreen"
import { SignupScreen } from "../screens/SignupScreen"

export function Auth() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={ LoginScreen }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={ SignupScreen }
                options={{
                    title: 'Register', //Set Header Title
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
      </Stack.Navigator>
    )
}