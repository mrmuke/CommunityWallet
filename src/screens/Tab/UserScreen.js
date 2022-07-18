import * as React from 'react'
import { 
    Image,
    SafeAreaView,
    Text, 
    TouchableOpacity,
    View,  
} from 'react-native'
import Modal from 'react-native-modal'
import QRCode from 'react-qr-code'

import { CommonStyle, colors, sz } from '../../styles/common'
import { MenuButton } from '../../components'
import { AuthContext, CommunityContext } from '../../states/Contexts'



export function UserScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState
    
    /** State var */
    const [modalVisible, setModalVisible] = React.useState(false)
    const userData = React.useRef(JSON.parse(authState.user)).current
    
    const changePassword = () => {
        console.log('changing')
    }

    const handleSignout = () => {
        authContext.signOut()
        communityContext.signOut()
    }

    return (
    <>
    <SafeAreaView style={CommonStyle.container}>
        <View style={[CommonStyle.spaceBetween, CommonStyle.infoBox, {alignItems: 'center'}]}>
            <Text style={[CommonStyle.headerMd, {color: colors.red}]}>{userData.username}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={{height: sz.lg, width: sz.lg}} source={require('../../assets/menu.png')}></Image>
            </TouchableOpacity>
        </View>
        <View style={[CommonStyle.spaceBetween, CommonStyle.infoBox]}>
            <View>
                <Text style={CommonStyle.headerSm}>Phone Number</Text>
                <Text style={CommonStyle.infoLg}>{ userData.phoneNumber }</Text>
            </View>
            <Image style={{height: sz.xl-5, width: sz.xl-5}} source={require('../../assets/telephone.png')}/>
        </View>
        <View style={[CommonStyle.spaceBetween, CommonStyle.infoBox]}>
            <View style={{width: '80%'}}>
                <Text style={CommonStyle.headerSm}>Wallet Address</Text>
                <Text style={CommonStyle.infoLg} numberOfLines={1}>{ userData.wasmAddress }</Text>
            </View>
            <Image style={{height: sz.xl, width: sz.xl}} source={require('../../assets/address.png')}/>
        </View>
        <QRCode value={userData.wasmAddress} />
    </SafeAreaView>
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
        <View style={CommonStyle.modalContent}>
            <View style={[CommonStyle.infoBox, CommonStyle.pullDownBar]}/>
            <MenuButton message={'Change password'}/>
            <MenuButton message={'Sign out'} onPress={handleSignout}/>
        </View>
    </Modal>
    </>
    )
}