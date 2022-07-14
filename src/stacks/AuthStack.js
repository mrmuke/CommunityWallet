import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen } from "../screens/Auth/LoginScreen"
import { SignupScreen } from "../screens/Auth/SignupScreen"


const Stack = createNativeStackNavigator()

export function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen
                name="LoginScreen"
                component={ LoginScreen }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignupScreen"
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