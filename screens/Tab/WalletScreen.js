import * as React from 'react'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { 
    SafeAreaView,
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { API_URL } from '../../utils/API_URL'
import { AuthContext, CommunityContext } from '../../utils/Contexts'
import { CommonStyle, colors, sz } from '../../styles/common'

export function WalletScreen() {
    // /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState

    const fakeBalanceData = [
        {
            address: 'wasm34rjnjk23413435',
            balance: 598,
            name: 'North Chicago Token',
            symbol: 'NOGO',
            parentToken: true
        },
        {
            address: 'wasmkajdsf134mlksdf',
            balance: 11,
            name: 'Potato Token',
            symbol: 'TATO',
            parentToken: false
        },
        {
            address: 'wasm234nkjsdf923434',
            balance: 29,
            name: 'Chicken Token wefasefadsf',
            symbol: 'CHIK',
            parentToken: false
        },
    ]

    const fakeTransactionData = [
        {
            amount: '13',
            memo: 'Happy birthday',
            receiver: 'wasm2352134',
            sender: '',
            token: 'wasmkajdsf134mlksdf',
            _id: '9838139df8',
        },
        {
            amount: '45',
            memo: 'For haircut',
            receiver: {

            },
            sender: {

            },
            token: 'wasmkajdsf134mlksdf',
            _id: 'asdfnjk3413',
        },
        {
            amount: '13',
            memo: 'Happy birthday',
            receiver: {

            },
            sender: {

            },
            token: 'wasm34rjnjk23413435',
            _id: 'adsf3413kll',
        }
    ]

    /** State variables */
    const [userData, setUserData] = React.useState(JSON.parse(authState.user))
    const [balances, setBalances] = React.useState(fakeBalanceData)
    const [transactions, setTransactions] = React.useState(fakeTransactionData)
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))

    // React.useEffect(() => {
    //     console.log(communityState)
    //     setCommunityData(JSON.parse(communityState.currentCommunity))
    //     console.log(communityData._id)

    //     Promise.all([
    //         axios.post(`${API_URL}/user/balancesOneCommunity`, { communityId: communityData._id }),
    //         axios.post(`${API_URL}/user/transactions`)
    //     ])
    //     .then(resps => {
    //         setBalances(resps[0].data.data)
    //         setTransactions(resps[1].data.data)
    //     })
    // }, [communityState])

    /** View machines */
    const childBalanceView = token => {
        if (!token.parentToken) {
            return (
                <View key={token.address} style={{flexDirection: 'row', marginBottom: sz.sm, width: '100%', borderBottomWidth: 1, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={{fontSize: sz.md}} numberOfLines={1}>{ token.name }</Text>
                        <Text style={{fontSize: sz.lg}}>{ token.symbol }</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: sz.xl}}>{ token.balance }</Text>
                    </View>
                </View>
            )
        }
    }
    const transactionView = transaction => {
        if (transaction.sender._id == userData._id.toString()) {
            return (
                <View key={transaction._id}>
                    <View>
                        <Text>{transaction.username} paid you <Text>{transaction.amount}</Text></Text>
                        <Text>{transaction.createdDate}</Text>
                    </View>
                    <View>
                        <Text>{ transaction.memo }</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View key={transaction._id}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>You paid you <Text>{transaction.receiver.username}</Text></Text>
                        <Text>{transaction.amount}</Text>
                    </View>
                    <View>
                        <Text>{transaction.createdDate}</Text>
                        <Text>{ transaction.memo }</Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={[CommonStyle.container, {height: '100%'}]}>
            <ScrollView>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.bigName}>Wallet</Text>
                </View>
                <View style={{marginBottom: sz.xxl}}>
                    <Text style={[CommonStyle.infoHeader, {marginBottom: sz.sm}]}>Balances</Text>
                    {
                        balances.map(bal => childBalanceView(bal))
                    }
                </View>
                <View style={CommonStyle.infoBox}>
                    <TouchableOpacity style={CommonStyle.longButton}>
                        <Text style={{color: colors.white}}>Send</Text>
                    </TouchableOpacity>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Transactions</Text>
                    {
                        transactions.map(tx => transactionView(tx))
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})