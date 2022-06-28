import * as React from 'react'
import { 
    Animated,
    Image,
    SafeAreaView,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View,  
} from 'react-native'
import QRCode from 'react-qr-code'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { AuthContext } from '../utils/Contexts'
import { colors, CommonStyle, sz } from '../styles/common'

export function UserScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    
    /** State var */
    const [userData, setUserData] = React.useState({})

    React.useEffect(() => {
        setUserData(JSON.parse(authState.user))
    }, [authState.user])

    const exitProcedure = () => {
        authContext.signOut()
    }

    const changePassword = () => {
        console.log('changing')
    }

    const getUserInitials = () => {
        if (userData.username) return userData.username.substring(0, 1).toUpperCase()
    }

    return (
        <View style={styles.container}>
        <SafeAreaView style={[CommonStyle.container, styles.seperator]}>
            <View>
                <View style={[styles.infoBox, styles.nameBox]}>
                    <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials() }</Text></View>
                    <Text style={CommonStyle.bigName}>Hi, { userData.username }</Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Phone Number</Text>
                    <Text style={CommonStyle.infoText}>{ userData.phoneNumber }</Text>
                </View>
                <View>
                    <Text style={CommonStyle.infoHeader}>Wallet Address</Text>
                    <Text style={CommonStyle.infoText} numberOfLines={1}>{ userData.wasmAddress }</Text>
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
                    onPress={() => { exitProcedure() }}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity> 
            </View>
        </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: colors.white
    },
    container: {
        backgroundColor: colors.white,
        marginBottom: sz.sm
    },
    infoBox: {
        marginBottom: sz.lg
    },
    seperator: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    initials: {
        color: colors.info, 
        fontSize: sz.xl
    },
    initialsBubble: {
        alignItems: 'center', 
        backgroundColor: colors.lightGray, 
        borderColor: colors.info, 
        borderRadius: sz.xl, 
        borderWidth: 1,
        justifyContent: 'center', 
        height: sz.xxl,
        marginRight: sz.sm,
        width: sz.xxl, 
    },
    nameBox: {
        flexDirection: 'row'
    }
})