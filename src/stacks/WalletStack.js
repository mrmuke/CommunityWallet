import { createStackNavigator } from '@react-navigation/stack'

import { SendScreen } from '../screens/Tab/Wallet/SendScreen'
import { SendAmountScreen } from '../screens/Tab/Wallet/SendAmountScreen'
import { WalletContext } from '../states/Contexts'
import { WalletScreen } from '../screens/Tab/Wallet/WalletScreen'
import { WalletService } from '../states/WalletState'

const Stack = createStackNavigator()

export function WalletStack() {
    const {walletContext, walletState} = WalletService()

    return (
    <WalletContext.Provider value={{walletContext, walletState}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Balance and Transactions' component={WalletScreen}/>
            <Stack.Screen name='Send Tokens' component={SendScreen}/>
            <Stack.Screen name='Send Amount' component={SendAmountScreen}/>
        </Stack.Navigator>
    </WalletContext.Provider>
    )
}