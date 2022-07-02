import * as React from 'react'
import { 
    Image,
    SafeAreaView,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,  
} from 'react-native'
import QRCode from 'react-qr-code'

import { AuthContext } from '../../utils/Contexts'
import { colors, CommonStyle, sz } from '../../styles/common'

export function UserScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    
    /** State var */
    const [userData, setUserData] = React.useState(JSON.parse(authState.user))

    const changePassword = () => {
        console.log('changing')
    }

    const getUserInitials = () => { if (userData.username) return userData.username.substring(0, 1).toUpperCase() }

    return (
        <SafeAreaView style={CommonStyle.container}>
        <View style={styles.seperator}>
            
            <View>
                <View style={[styles.infoBox, {alignItems: 'center', justifyContent: 'flex-start'}]}>
                    <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials() }</Text></View>
                    <Text style={CommonStyle.bigName}>Hi, { userData.username }</Text>
                </View>
                <View style={styles.infoBox}>
                    <View>
                        <Text style={CommonStyle.infoHeader}>Phone Number</Text>
                        <Text style={CommonStyle.infoText}>{ userData.phoneNumber }</Text>
                    </View>
                    <Image style={{height: sz.xl-5, width: sz.xl-5}} source={require('../../assets/telephone.png')}/>
                </View>
                <View style={[styles.infoBox, {marginBottom: 0}]}>
                    <View style={{width: '80%'}}>
                        <Text style={CommonStyle.infoHeader}>Wallet Address</Text>
                        <Text style={CommonStyle.infoText} numberOfLines={1}>{ userData.wasmAddress }</Text>
                    </View>
                    <Image style={{height: sz.xl, width: sz.xl}} source={require('../../assets/address.png')}/>
                </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                { !userData.wasmAddress ? (<></>) : (<QRCode size={128} value={userData.wasmAddress}/>) }
            </View>
            <View>
                <TouchableOpacity 
                    style={[CommonStyle.longButton, {marginBottom: sz.sm}]}
                    onPress={() => { changePassword() }}
                >
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={CommonStyle.longButton}
                    onPress={() => authContext.signOut() }
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity> 
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white
    },
    container: {
        backgroundColor: colors.white,
        marginBottom: sz.sm,
    },
    infoBox: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom: sz.md,
    },
    initials: {
        color: colors.info, 
        fontSize: sz.xxl
    },
    initialsBubble: {
        alignItems: 'center', 
        backgroundColor: colors.lightGray, 
        borderColor: colors.info, 
        borderRadius: sz.xxl, 
        borderWidth: 1,
        justifyContent: 'center', 
        height: sz.xxxl,
        marginRight: sz.sm,
        width: sz.xxxl, 
    },
    seperator: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
})