import axios from 'axios'
import * as React from 'react'
import { 
    RefreshControl,
    SafeAreaView,
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
} from 'react-native'
import { BulletList, Code } from 'react-content-loader/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { API_URL } from '../../utils/API_URL'
import { AuthContext, CommunityContext } from '../../states/Contexts'
import { CommonStyle, colors, sz } from '../../styles/common'
import { showMessage } from 'react-native-flash-message'

export function WalletScreen() {
    /** Contexts */
    const authState = React.useContext(AuthContext).authState
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [balanceChildren, setBalanceChildren] = React.useState()
    const communityData = React.useRef(JSON.parse(communityState.currentCommunity)).current
    const [balanceParent, setBalanceParent] = React.useState()
    const refreshing = React.useRef(false).current
    const [transactionsReceived, setTransactionsReceived] = React.useState()
    const [transactionsSent, setTransactionsSent] = React.useState()
    const userData = React.useRef(JSON.parse(authState.user)).current
    const bottomTabBarHeight = useBottomTabBarHeight()


    React.useEffect(() => {
        Promise.all([
            axios.post(`${API_URL}/user/balancesOneCommunity`, { communityId: communityData._id }),
            axios.post(`${API_URL}/user/transactions`)
        ])
        .then(resps => {
            const children = resps[0].data.data
            const transactions = resps[1].data.data
            const index = children.findIndex(bal => bal.parentToken)
            const parent =  children.splice(index, 1).pop()
            setBalanceChildren(children)
            setBalanceParent(parent)
            setTransactionsSent(transactions.sentTransactions ? transactions.sentTransactions : [])
            setTransactionsReceived(transactions.receivedTransactions ? transactions.receivedTransactions : [])
        })
        .catch(err => 
            console.log(err))
    }, [])

    const balanceView = token => {
        return (
        <View key={token.address} style={[styles.balanceViewContainer, {marginBottom: token.parentToken ? sz.lg : sz.sm}]}>
            <View>
                <Text style={[CommonStyle.headerSm, {color: 'black', fontWeight: sz.plain}]} numberOfLines={1}>{ token.name }</Text>
                <Text style={CommonStyle.infoLg}>{ token.symbol }</Text>
            </View>
            <View>
                <Text style={[CommonStyle.headerMd, {fontWeight: sz.plain}]}>{ token.balance }</Text>
            </View>
        </View>
        )
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

    const getWalletData = () => {
        Promise.all([
            axios.post(`${API_URL}/user/balancesOneCommunity`, { communityId: communityData._id }),
            axios.post(`${API_URL}/user/transactions`)
        ])
        .then(resps => {
            const children = resps[0].data.data
            const transactions = resps[1].data.data
            const index = children.findIndex(bal => bal.parentToken)
            const parent =  children.splice(index, 1).pop()
            setBalanceChildren(children)
            setBalanceParent(parent)
            setTransactionsSent(transactions.sentTransactions ? transactions.sentTransactions : [])
            setTransactionsReceived(transactions.receivedTransactions ? transactions.receivedTransactions : [])
        })
        .catch(err => 
            showMessage({
                message: 'Something went wrong! Check your network connection.',
                type: 'danger'
            })
        )
    }

    return (
    <SafeAreaView style={[CommonStyle.container, {height: '100%'}]}>
        <>
            <Text style={[CommonStyle.headerLg, {color: colors.red}]}>Wallet</Text>
        </>
        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getWalletData}/>}
        >
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xs}]}>Balances</Text>
                {
                    balanceParent ? (
                        balanceView(balanceParent)
                    ) : <></>
                }
                {
                    !balanceChildren ? (
                        <BulletList/>
                    ) :
                    balanceChildren.length == 0 ? (
                        <Text style={CommonStyle.infoMd}>No balances</Text>
                    ) : 
                    (
                        balanceChildren.map(bal => balanceView(bal))
                    )
                }
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xs}]}>Transactions</Text>
                {
                    !transactionsSent || !transactionsReceived ? (
                        <Code/>
                    ) : 
                    [...transactionsSent, ...transactionsReceived].length == 0 ? (
                        <Text style={CommonStyle.infoMd}>No transactions</Text>
                    ) : (
                        [...transactionsSent, ...transactionsReceived].map(transaction => transactionView(transaction))
                    )
                }
            </View>
        </ScrollView>
        <TouchableOpacity style={[CommonStyle.longButton, {position: 'absolute', bottom: bottomTabBarHeight + sz.xs, width: '100%'}]}>
            <Text style={{color: colors.white}}>Send</Text>
        </TouchableOpacity>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    balanceViewContainer: {
        borderBottomWidth: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
    }
})