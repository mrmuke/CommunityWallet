import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { CommunityScreen } from '../screens/CommunityScreen'
import { CommunityRequestScreen } from '../screens/CommunityRequestScreen'
import { Image, StyleSheet } from 'react-native'
import { ServicesScreen } from '../screens/ServicesScreen'
import { UserScreen } from '../screens/UserScreen'
import { WalletScreen } from '../screens/WalletScreen'

import { colors, sz } from '../styles/common'

const Tab = createBottomTabNavigator()
const CommunityStack = createStackNavigator()

function CommunityStackScreen() {
    return (
        <CommunityStack.Navigator screenOptions={{headerShown: false}}>
            <CommunityStack.Screen name="Community" component={CommunityScreen} />
            <CommunityStack.Screen name="Community Request" component={CommunityRequestScreen} />
        </CommunityStack.Navigator>
    )
}

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
                name='Wallet'
                component={ WalletScreen }
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/walletFocused.png')}/>) 
                        : (<Image style={styles.iconImage} source={require('../assets/tab/wallet.png')}/>)
                    )
                }}
            />
            <Tab.Screen
                name='Services'
                component={ ServicesScreen }
                options={{
                    tabBarIcon: ({focused, color, size}) => (
                        (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/serviceFocused.png')}/>) 
                        : (<Image style={styles.iconImage} source={require('../assets/tab/service.png')}/>)
                        )
                    }}
            />
            <Tab.Screen
                name='Community Stack'
                component={ CommunityStackScreen }
                options={{
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({focused, color, size}) => (
                        (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/communityFocused.png')}/>) 
                        : (<Image style={styles.iconImage} source={require('../assets/tab/community.png')}/>)
                        )
                    }}
            />
            <Tab.Screen
                name='User'
                component={ UserScreen }
                options={{ 
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({focused, color, size}) => (
                        (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/userFocused.png')}/>) 
                        : (<Image style={styles.iconImage} source={require('../assets/tab/user.png')}/>)
                        )
                    }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    iconImage: { 
        width: sz.xl, 
        height: sz.xl,
    }
})