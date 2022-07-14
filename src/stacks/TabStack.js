import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { 
    Image, 
    StyleSheet 
} from 'react-native'

import { CommunityStack } from './CommunityStack'
import { SuperuserStack } from './SuperuserStack'
import { ServicesScreen } from '../screens/Tab/ServicesScreen'
import { UserScreen } from '../screens/Tab/UserScreen'
import { WalletScreen } from '../screens/Tab/WalletScreen'
import { colors, sz } from '../styles/common'

const Tab = createBottomTabNavigator()

export function TabStack(superuser) {
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
                component={ CommunityStack }
                options={{
                    tabBarStyle: { borderTopWidth: 1 },
                    tabBarIcon: ({focused, color, size}) => (
                        (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/communityFocused.png')}/>) 
                        : (<Image style={styles.iconImage} source={require('../assets/tab/community.png')}/>)
                        )
                    }}
            />
            {
                superuser ? (
                    <Tab.Screen
                        name='Superuser'
                        component={ SuperuserStack }
                        options={{ 
                            tabBarStyle: { borderTopWidth: 1 },
                            tabBarIcon: ({focused, color, size}) => (
                                (focused) ? (<Image style={styles.iconImage} source={require('../assets/tab/keyFocused.png')}/>) 
                                : (<Image style={styles.iconImage} source={require('../assets/tab/key.png')}/>)
                                )
                            }}
                    />
                ) : 
                (<></>)
            }
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