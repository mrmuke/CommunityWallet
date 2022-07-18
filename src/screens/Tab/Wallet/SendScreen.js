import { BarCodeScanner } from 'expo-barcode-scanner'
import * as React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import Modal from 'react-native-modal'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { HorizontalPicker } from '../../../components'
import { WalletContext } from '../../../states/Contexts'




export function SendScreen({navigation}) {
    /** Contexts and States */
    const walletState = React.useContext(WalletContext).walletState

    /** State variables */
    const [balances, setBalances] = React.useState([])
    const [buttonActive, setButtonActive] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [recipientAddress, setRecipientAddress] = React.useState('')
    const [selectedToken, setSelectedToken] = React.useState()

    React.useEffect(() => {
        if (walletState.balanceParent && walletState.balanceChildren) {
            setBalances([walletState.balanceParent, ...walletState.balanceChildren])
        }
    }, [walletState])

    React.useEffect(() => {
        recipientAddress.length != 0 && selectedToken ? setButtonActive(true) : setButtonActive(false)
    }, [recipientAddress, selectedToken])

    return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
    <KeyboardAvoidingView style={[CommonStyle.container, {height: '100%', alignContent: 'center', justifyContent: 'center', flex: 1}]} behavior={'padding'}>
        <View style={CommonStyle.infoBox}>
            <Text style={[CommonStyle.infoLg, {color: colors.lightGray}]}>Choose a token</Text>
            <HorizontalPicker 
                containerStyle={{
                    marginLeft: -sz.md*2,
                    marginRight: -sz.md*2,
                    paddingLeft: sz.md,
                    paddingRight: sz.md,
                }}
                label='symbol'
                selected={selectedToken} 
                setSelected={setSelectedToken} 
                values={balances} 
                valueKeys='symbol' 
            />
        </View>
        <View style={CommonStyle.infoBox}>
            <Text style={[CommonStyle.infoLg, {color: colors.lightGray, marginBottom: sz.xs}]}>Recipient Address</Text>
            <View style={[CommonStyle.spaceBetween, {alignItems: 'baseline'}]}>
                <TouchableOpacity 
                    style={{marginRight: sz.sm}}
                    onPress={() => {setModalVisible(true)}}
                >
                    <Image source={require('../../../assets/qrcode.png')} style={{height: sz.lg, width: sz.lg}}/>
                </TouchableOpacity>
                <Text style={[CommonStyle.headerSm, {color: 'black', fontStyle: 'italic', marginRight: sz.xxxs}]}>wasm</Text>
                <TextInput
                    style={[CommonStyle.headerSm, {color: 'black', width: '100%'}]}
                    onChangeText={t => setRecipientAddress(t)}
                    placeholder={'...'}
                />
            </View>
            <View style={[CommonStyle.divider, {marginTop: 0}]}/>
        </View>
        <TouchableOpacity 
            disabled={!buttonActive}
            onPress={() => navigation.navigate('Send Amount', {recipientAddress, selectedToken})}
            style={[CommonStyle.longButton, {marginTop: sz.md, opacity: buttonActive ? 1.0 : 0.2}]}
        >
            <Text style={{color: colors.white}}>Continue</Text>
        </TouchableOpacity>
        <Modal
            isVisible={modalVisible}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            backdropOpacity={0.5}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection='down'
            style={CommonStyle.modalContainer}
        >

        </Modal>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}