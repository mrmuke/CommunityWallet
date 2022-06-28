import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CommunityScreen } from "../screens/CommunityScreen"
import { ServicesScreen } from "../screens/ServicesScreen"
import { UserScreen } from "../screens/UserScreen"
import { WalletScreen } from "../screens/WalletScreen"

import { colors, sz } from "../styles/common"

const Tab = createBottomTabNavigator()

export function WalletStack() {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false, 
                tabBarStyle: { 
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    elevation: 0,
                    position: 'absolute',
                    height: sz.xxl
                },
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name='Services'
                component={ ServicesScreen }
            />
            <Tab.Screen
                name='Community'
                component={ CommunityScreen }
            />
            <Tab.Screen
                name='User'
                component={ UserScreen }
                options={{ tabBarStyle: { borderTopWidth: 1 } }}
            />
        </Tab.Navigator>
    )
}