import { Image, StyleSheet, Text, View, List } from 'react-native'
import { TouchableOpacity, SafeAreaView } from 'react-native'
import * as React from 'react'

import { AuthContext, CommunityContext } from '../utils/Contexts'

export function UserScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const authState = React.useContext(AuthContext).authState
    
    const [userData, setUserData] = React.useState({})


    React.useEffect(() => {
        setUserData(JSON.parse(authState.user))
    }, [])

    const exitProcedure = () => {
        authContext.signOut()
    }

    const changePassword = () => {
        console.log('changing')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.bigName}>Hi, { userData.username }</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoHeader}>Phone Number</Text>
                <Text>{ userData.phoneNumber }</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoHeader}>Wallet Address</Text>
                <Text>{ userData.wasmAddress }</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity 
                        style={styles.buttons}
                        onPress={() => { changePassword() }}
                    >
                        <Text style={styles.buttonText}>Change password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => { exitProcedure() }}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    bigName: {
        fontSize: 50,
        color: "#eb6060",
        fontWeight: 'bold'
    },
    infoBox: {
        marginBottom: 20
    },
    infoHeader: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttons: {
        alignItems: "center",
        backgroundColor: "#6474E5",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        marginBottom: 0,
        marginTop: 23,
        width: "80%",
    },
    buttonText: {
        color: '#FFFFFF'
    }
})