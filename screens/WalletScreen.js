import * as SecureStore from 'expo-secure-store'
import * as React from 'react'
import axios from 'axios'
import { Image, List, Modal, StyleSheet, Text, View, SafeAreaView,
ScrollView, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { AuthContext, CommunityContext } from '../utils/Contexts'

import { API_URL } from '../utils/API_URL'
import { CommonStyle } from '../styles/common'

export function WalletScreen() {

    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState


    /** State variables */
    const [balances, setBalances] = React.useState([{key: 1, name: 'ATOM', address: 'wasm34nf1348h'}])
    const [transactions, setTransactions] = React.useState([])
    const [communityData, setCommunityData] = React.useState({})

    React.useEffect(() => {
        console.log(communityState)
        setCommunityData(JSON.parse(communityState.currentCommunity))
        console.log(communityData._id)

        Promise.all([
            axios.post(`${API_URL}/user/balancesOneCommunity`, { communityId: communityData._id }),
            axios.post(`${API_URL}/user/transactions`)
        ])
        .then(resps => {
            setBalances(resps[0].data.data)
            setTransactions(resps[1].data.data)
        })
    }, [communityState])

    const balanceView = token => {
        return (
            <View>
                <View>
                    <Text>{ token.name }</Text>
                    <Text>{ token.symbol }</Text>
                </View>
                <Text>{ token.balance }</Text>
            </View>
        )
    }

    const transactionView = transaction => {
        return (
            <View>
                <View>
                    {
                        transaction.receiver == authState.user.wasmAddress ? (
                            <Text>{ transaction.sender } paid you</Text>
                        ) :
                        (
                            <Text>You paid { transaction.receiver }</Text>
                        )
                    }
                    <Text>{transaction.createdAt}</Text>
                    <Text>{transaction.memo}</Text>
                </View>
                <Text>{ transaction.amount }</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigName}>Wallet</Text>

            <View style={styles.listContainer}>
                <Text style={styles.infoHeader}>Balances</Text>
                <View>
                    {balances.map(balance => balanceView(balance))}
                </View>
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.infoHeader}>Transactions</Text>
                <View>
                    {transactions.map(transaction => transactionView(transaction))}
                </View>
            </View>

            <View style={styles.center}>
                <TouchableOpacity
                    style={styles.sendBtn}
                    onPress={() => {}}
                >
                    <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container : {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    bigName: {
        fontSize: 50,
        color: '#eb6060',
        fontWeight: 'bold',
        marginBottom: 15
    },
    sendBtn: {
        alignItems: "center",
        backgroundColor: "#6474E5",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        marginBottom: 0,
        marginTop: 23,
    },
    btnText: {
        color: '#ffffff'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    infoHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    listContainer: {
        height: '30%',
        marginBottom: 30
    }
})