import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommunityScreen } from "../screens/CommunityScreen"
import { ServicesScreen } from "../screens/ServicesScreen"
import { UserScreen } from "../screens/UserScreen"
import { WalletScreen } from "../screens/WalletScreen"

const Tab = createBottomTabNavigator()

export function WalletStack() {
    return (
        <Tab.Navigator>
            {/* <Tab.Screen
                name="Wallet"
                component={ WalletScreen }
            /> */}
            <Tab.Screen
                name="Services"
                component={ ServicesScreen }
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Community"
                component={ CommunityScreen }
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="User"
                component={ UserScreen }
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    )
}