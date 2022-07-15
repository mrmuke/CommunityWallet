import * as React from 'react'
import { 
    Image,
    SafeAreaView,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,  
} from 'react-native'

import { AuthContext, CommunityContext } from '../../states/Contexts'
import { CommonStyle, colors, sz } from '../../styles/common'
import { getUserInitials } from '../../utils/HelperFunctions'

export function UserScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    const communityContext = React.useContext(CommunityContext).communityContext
    
    /** State var */
    const userData = React.useRef(JSON.parse(authState.user)).current

    const changePassword = () => {
        console.log('changing')
    }

    const handleSignout = () => {
        authContext.signOut()
        communityContext.signOut()
    }

    return (
    <SafeAreaView style={CommonStyle.container}>
    <View style={CommonStyle.verticalSeperator}>
        <View>
            <View style={CommonStyle.infoBox}>
                <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                    <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials(userData.username) }</Text></View>
                    <Text style={[CommonStyle.headerMd, {color: colors.red}]}>Hi, { userData.username }</Text>
                </View>
                <View style={[CommonStyle.spaceBetween, CommonStyle.infoBox]}>
                    <View>
                        <Text style={CommonStyle.headerSm}>Phone Number</Text>
                        <Text style={CommonStyle.infoLg}>{ userData.phoneNumber }</Text>
                    </View>
                    <Image style={{height: sz.xl-5, width: sz.xl-5}} source={require('../../assets/telephone.png')}/>
                </View>
                <View style={CommonStyle.spaceBetween}>
                    <View style={{width: '80%'}}>
                        <Text style={CommonStyle.headerSm}>Wallet Address</Text>
                        <Text style={CommonStyle.infoLg} numberOfLines={1}>{ userData.wasmAddress }</Text>
                    </View>
                    <Image style={{height: sz.xl, width: sz.xl}} source={require('../../assets/address.png')}/>
                </View>
            </View>
        </View>
        <View>
            <TouchableOpacity 
                style={[CommonStyle.longButton, {marginBottom: sz.xs}]}
                onPress={() => { changePassword() }}
            >
                <Text style={[CommonStyle.infoMd, {color: colors.white}]}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[CommonStyle.longButton, {marginBottom: sz.xs}]}
                onPress={() => handleSignout() }
            >
                <Text style={[CommonStyle.infoMd, {color: colors.white}]}>Sign out</Text>
            </TouchableOpacity> 
        </View>
    </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    initials: {
        color: colors.info, 
        fontSize: sz.xl
    },
    initialsBubble: {
        alignItems: 'center', 
        backgroundColor: colors.lighterGray, 
        borderColor: colors.info, 
        borderRadius: sz.xxl, 
        borderWidth: 1,
        justifyContent: 'center', 
        height: sz.xxl,
        marginRight: sz.sm,
        width: sz.xxl, 
    },
})