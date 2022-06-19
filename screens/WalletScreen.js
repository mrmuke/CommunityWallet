import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { Image, List, Modal, StyleSheet, Text, View } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useIsFocused } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import { API_URL } from '../utils/API_URL'
import tokens from '../i18n/tokens'

/** Translation tokens */
const { myWallet_P, totalBalance_P, receiveTokens_P, today_W, close_W } = tokens.screens.wallet

export function WalletScreen() {
    /** i18n */
    const { t } = useTranslation()

    /** State variables */
    const [receive, setReceive] = useState(false)
    const [tokens, setTokens] = useState([])
    const [curToken, setCurToken] = useState('')
    const [transactions, setTransactions] = useState([{ amount: 'loading', topic: 'loading...', dateTime: 'loading...' }])
    const [wasmAddress, setWasmAddress] = useState('...')
    const [ixoAddress, setIxoAddress] = useState('...')
    const [evmosAddress, setEvmosAddress] = useState('...')
    const [ethAddress, setEthAddress] = useState('...')
    const [username, setUsername] = useState('...')
    const [phoneNumber, setPhoneNumber] = useState('...')
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            Promise.all([
                getBalances(),
                getTokens(),
                getTransactions(),
                fillData(),
            ])
        }
    }, [isFocused])

    const getBalances = async () => {
        axios.get(API_URL, '/user/...')
        .then(res => {
            
        })
    }

    // const getTokens = async () => {
    //     axios.get(API_URL, '/user/balancesAllCommunities')
    //     .then(res => {
    //         balances = res.data.data.
    //     })
    // }

    const getTransactions = async () => {
        axios.get(API_URL + '/user/wallet')
        .then(res => {
            setTokens(res.data.balances)
            setCurToken(Object.keys(res.data.balances)[0])
            setTransactions(res.data.transactions)
        })
    }

    const fillData = async () => {
        const data = await Promise.all([
            SecureStore.getItemAsync('phoneNumber', data.phoneNumber),
            SecureStore.getItemAsync('username', data.username),
            SecureStore.getItemAsync('evmosAddress', data.evmosAddress),
            SecureStore.getItemAsync('ethAddress', data.ethAddress),
            SecureStore.getItemAsync('wasmAddress', data.wasmAddress),
            SecureStore.getItemAsync('ixoAddress', data.ixoAddress),
        ])
        setPhoneNumber(data[0])
        setUsername(data[1])
        setEvmosAddress(data[2])
        setEthAddress(data[3])
        setWasmAddress(data[4])
        setIxoAddress(data[5])
    }

    return (
        <View>
            <Text>Text</Text>
            <Text>Address3418sdf4d88hisf83</Text>
            <Modal 
                visible={receive} 
                transparent={false} 
                animationType="slide" 
            >
                <View style={styles.qr}>
                    <QRCode size={150} value={address}/>
                    <TouchableOpacity style={styles.qrcodeExitBtn} onPress={() => setReceive(false)}>
                        <Text>{ t(close_W) }</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    qr: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    qrExitBtn: {
        padding: 15
    }
})