import axios from 'axios'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as React from 'react'
import {
    Animated,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import Modal from 'react-native-modal'

import { errorShake } from '../../../components/Animations'
import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { HorizontalPicker } from '../../../components'
import { WalletContext } from '../../../states/Contexts'
import { showMessage } from 'react-native-flash-message'

export function SendScreen({navigation}) {
    /** Contexts and States */
    const walletState = React.useContext(WalletContext).walletState

    /** State variables */
    const [balances, setBalances] = React.useState([])
    const [buttonActive, setButtonActive] = React.useState(false)
    const [hasCameraPermission, setHasCameraPermission] = React.useState(null)
    const [memo, setMemo] = React.useState()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [recipientAddress, setRecipientAddress] = React.useState('1yqrrf9uu698agpzzwk2s5mxd45yq0par3drak6')
    const [scanned, setScanned] = React.useState(false)
    const [selectedToken, setSelectedToken] = React.useState()
    const [boundsOrigin, setBoundsOrigin] = React.useState({x: 0, y: 0})
    const [boundsSize, setBoundsSize] = React.useState({height: 0, width: 0})
    const shaking1 = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        if (walletState.balanceParent && walletState.balanceChildren) {
            setBalances([walletState.balanceParent, ...walletState.balanceChildren])
        }
    }, [walletState])

    React.useEffect(() => {
        recipientAddress.length != 0 && selectedToken ? setButtonActive(true) : setButtonActive(false)
    }, [recipientAddress, selectedToken])

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })()
    }, [])

    const handleContinue = () => {
        axios.post(`${API_URL}/user/getOneByWasmAddress`, {wasmAddress: `wasm${recipientAddress}`})
        .then(res => {
            navigation.navigate('Send Amount', {memo, recipientId: res.data.data._id, selectedToken})
        })
        .catch(err => {
            errorShake(shaking1)
            showMessage({
                type: 'danger',
                message: 'User not found!'
            })
        })
    }

    const handleBarCodeScanned = ({bounds, data}) => {
        setModalVisible(false)
        setBoundsOrigin(bounds.origin)
        setBoundsSize(bounds.size)
        setRecipientAddress(data)
    }

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
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Animated.View style={[CommonStyle.spaceBetween, {alignItems: 'baseline', transform: [{translateX: shaking1}]}]}>
                    <TouchableOpacity 
                        style={{marginRight: sz.xs}}
                        onPress={() => {setModalVisible(true)}}
                    >
                        <Image source={require('../../../assets/qrcode.png')} style={{height: sz.lg, width: sz.lg}}/>
                    </TouchableOpacity>
                    <Text style={[CommonStyle.headerSm, {color: 'black', fontStyle: 'italic', marginRight: sz.xxxs}]}>wasm</Text>
                        <TextInput
                            onChangeText={t => setRecipientAddress(t)}
                            numberOfLines={1}
                            placeholder={'...'}
                            scrollEnabled={false}
                            style={[CommonStyle.headerSm, {color: 'black', width: '100%'}]}
                            value={recipientAddress}
                        />
                </Animated.View>
            </ScrollView>
            <View style={[CommonStyle.divider, {marginTop: 0}]}/>
        </View>
        <View style={CommonStyle.infoBox}>
            <Text style={[CommonStyle.infoLg, {color: colors.lightGray, marginBottom: sz.xs}]}>Message</Text>
            <TextInput
                onChangeText={t => setMemo(t)}
                multiline={true}
                placeholder={'Optional'}
                style={[CommonStyle.headerSm, {color: 'black', width: '100%'}]}
                value={memo}
            />
            <View style={[CommonStyle.divider, {marginTop: 0}]}/>
        </View>
        <TouchableOpacity 
            disabled={!buttonActive}
            onPress={handleContinue}
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
            style={[CommonStyle.modalContainer, {alignItems: 'center', justifyContent: 'center'}]}
        >
        {
            hasCameraPermission ? (
                    <BarCodeScanner
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        type={'back'}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}
                    >
                        <View style={
                            [styles.scannerBoundingBox, {
                                top: boundsOrigin.y, 
                                left: boundsOrigin.x, 
                                height: boundsSize.height, 
                                width: boundsSize.width}
                            ]}
                        />
                        <TouchableOpacity style={[styles.cancelScannerButton]}>
                            <Text style={[CommonStyle.headerSm, {color: colors.white}]}>Close</Text>
                        </TouchableOpacity>
                    </BarCodeScanner>
            ) : (
                <View style={{height: sz.xxxl*3, width: sz.xxxl*2, backgroundColor: colors.white, borderRadius: sz.sm}}>
                    <Text style={CommonStyle.infoLg}>Enable camera access</Text>
                </View>
            )
        }

        </Modal>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    cancelScannerButton: {
        left: sz.lg,
        position: 'absolute',
        top: sz.xl,
        zIndex: 10,
    },
    scannerBoundingBox: {
        position: 'absolute',
        zIndex: 10,
        borderRadius: sz.lg,
        borderWidth: 2,
        borderColor: colors.white,
    }
})