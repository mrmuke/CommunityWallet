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

import { AuthContext, WalletContext } from '../../../states/Contexts'
import { CommonStyle, colors, sz } from '../../../styles/common'

export function WalletScreen({ navigation }) {
    /** Contexts */
    const authState = React.useContext(AuthContext).authState

    const walletContext = React.useContext(WalletContext).walletContext
    const walletState = React.useContext(WalletContext).walletState

    /** State variables */
    const [balanceChildren, setBalanceChildren] = React.useState()
    const [balanceParent, setBalanceParent] = React.useState()
    const refreshing = React.useRef(false).current
    const [receivedTransactions, setReceivedTransactions] = React.useState()
    const [sentTransactions, setSentTransactions] = React.useState()
    const userData = React.useRef(JSON.parse(authState.user)).current

    React.useEffect(() => {
        setBalanceChildren(walletState.balanceChildren)
        setBalanceParent(walletState.balanceParent)
        setReceivedTransactions(walletState.receivedTransactions)
        setSentTransactions(walletState.sentTransactions)
    }, [walletState])

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

    return (
    <SafeAreaView style={[CommonStyle.container, {height: '100%'}]}>
        <>
            <Text style={[CommonStyle.headerLg, {color: colors.red}]}>Wallet</Text>
        </>
        <ScrollView 
            showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={walletContext.reloadData}/>}
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
                    !sentTransactions || !receivedTransactions ? (
                        <Code/>
                    ) : 
                    [...sentTransactions, ...receivedTransactions].length == 0 ? (
                        <Text style={CommonStyle.infoMd}>No transactions</Text>
                    ) : (
                        [...sentTransactions, ...receivedTransactions].map(transaction => transactionView(transaction))
                    )
                }
            </View>
        </ScrollView>
        <TouchableOpacity 
            onPress={() => navigation.navigate('Send Tokens')}
            style={[CommonStyle.longButton, {position: 'absolute', bottom: sz.xs, width: '100%'}]}
        >
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