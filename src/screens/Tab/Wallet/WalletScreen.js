import * as React from 'react'
import { 
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
} from 'react-native'
import Reanimated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated'
import { BulletList, Code } from 'react-content-loader/native'

import { AuthContext, WalletContext } from '../../../states/Contexts'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { getDate } from '../../../utils/HelperFunctions'
import { InitialsBubble } from '../../../components'

export function WalletScreen({ navigation }) {
    /** Contexts */
    const authState = React.useContext(AuthContext).authState

    const walletContext = React.useContext(WalletContext).walletContext
    const walletState = React.useContext(WalletContext).walletState

    /** State variables */
    const [balanceChildren, setBalanceChildren] = React.useState()
    const [balanceParent, setBalanceParent] = React.useState()
    const [buttonYPos, setButtonYPos] = React.useState(1000)
    const [receivedTransactions, setReceivedTransactions] = React.useState()
    const [sentTransactions, setSentTransactions] = React.useState()
    const refreshing = React.useRef(false).current
    const userData = React.useRef(JSON.parse(authState.user)).current

    console.log(buttonYPos)

    /** Animations */
    const buttonOffset = useSharedValue(100)
    const buttonAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ 
                translateY: withTiming(buttonOffset.value, {
                    duration: 500,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            }]
        }
    })
    const headerOffset = useSharedValue(-100)
    const headerAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ 
                translateY: withTiming(headerOffset.value, {
                    duration: 500,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            }]
        }
    })

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
        const createdAt = transaction.createdAt
        const isReceiver = transaction.receiver._id === userData._id.toString()
        const memo = transaction.memo
        const receiverName = transaction.receiver.username
        const senderName = transaction.sender.username
        return (
            <View key={transaction._id} style={CommonStyle.spaceBetween}>
                <View style={[CommonStyle.sideBySide, {width: '70%'}]}>
                    <InitialsBubble username={isReceiver ? senderName : receiverName}/>
                    <View style={{marginLeft: sz.xs, paddingTop: sz.xxs}}>
                        {
                            isReceiver ? (
                                <View style={CommonStyle.sideBySide}>
                                    <Text style={[CommonStyle.infoLg, {color: 'black', fontWeight: sz.bold}]}>{senderName} </Text>
                                    <Text style={[CommonStyle.infoLg, {color: 'black'}]}>sent to you</Text>
                                </View>
                            ) : (
                                <View style={CommonStyle.sideBySide}>
                                    <Text style={[CommonStyle.infoLg, {color: 'black'}]}>You sent to </Text>
                                    <Text style={[CommonStyle.infoLg, {color: 'black', fontWeight: sz.bold}]}>{receiverName}</Text>
                                </View>
                            )
                        }
                        {
                            createdAt ? (
                                <Text style={CommonStyle.infoMd}>{getDate(createdAt)}</Text>
                                ) : <Text></Text>
                            }
                        {
                            memo ? (
                                <Text numberOfLines={1} style={[CommonStyle.headerSm, {color: colors.info, fontWeight: sz.plain}]}>{memo}</Text>
                            ) : <></>
                        }
                        <View style={CommonStyle.divider}/>
                    </View>
                </View>
                <Text style={[CommonStyle.headerSm, {width: '50%', color: isReceiver ? colors.green : colors.red}]}>{isReceiver ? '+' : '-'}{transaction.amount} {transaction.token.symbol}</Text>
            </View>
        )
    }

    return (
    <SafeAreaView style={[CommonStyle.container, {height: '100%'}]}>
        <Reanimated.View style={[headerAnimatedStyles, {alignItems: 'center', height: sz.xl, justifyContent: 'center'}]}>
            <Text style={[CommonStyle.infoLg]}>Wallet</Text>
        </Reanimated.View>
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={walletContext.reloadData}/>}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            style={{paddingTop: sz.sm}}
            onScroll={e => {
                const y = e.nativeEvent.contentOffset.y
                y > buttonYPos ? buttonOffset.value=0 : buttonOffset.value=100
                y > 50 ? headerOffset.value=0 : headerOffset.value=-100
            }}
        >
        <View style={CommonStyle.infoBox}>
            <Text style={[CommonStyle.headerLg, {color: colors.clicky2}]}>Wallet</Text>
        </View>
            <View style={{marginBottom: sz.sm}}>
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
            <TouchableOpacity 
                onLayout={event => setButtonYPos(event.nativeEvent.layout.y + event.nativeEvent.layout.height*2)}
                onPress={() => navigation.navigate('Send Tokens')}
                style={[ CommonStyle.longButton, CommonStyle.infoBox]}
            >
                <View style={[CommonStyle.spaceBetween, {paddingLeft: sz.sm, paddingRight: sz.sm}]}>
                    <Image style={{height: sz.lg, width: sz.lg}} source={require('../../../assets/sendFocused.png')}/>
                    <Text style={[CommonStyle.infoLg, {color: colors.white}]}>Send</Text>
                    <View style={{width: sz.lg}}/>
                </View>
            </TouchableOpacity>
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xs}]}>Transactions</Text>
                {
                    !sentTransactions || !receivedTransactions ? (
                        <Code/>
                    ) : 
                    [...sentTransactions, ...receivedTransactions].length == 0 ? (
                        <Text style={CommonStyle.infoMd}>No transactions</Text>
                    ) : (
                        [...sentTransactions, ...receivedTransactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(transaction => transactionView(transaction))
                    )
                }
            </View>
        </ScrollView>
        <Reanimated.View style={buttonAnimatedStyles}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Send Tokens')}
                style={[ CommonStyle.longButton, {position: 'absolute', bottom: sz.xs, width: '100%'}]}
            >
                <View style={[CommonStyle.spaceBetween, {paddingLeft: sz.sm, paddingRight: sz.sm}]}>
                    <Image style={{height: sz.lg, width: sz.lg}} source={require('../../../assets/sendFocused.png')}/>
                    <Text style={[CommonStyle.infoLg, {color: colors.white}]}>Send</Text>
                    <View style={{width: sz.lg}}/>
                </View>
            </TouchableOpacity>
        </Reanimated.View>
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