import { Image, StyleSheet, Text, View, List, SafeAreaView, TouchableOpacity } from 'react-native'
import { CommunityContext } from '../utils/Contexts'
import * as React from 'react'


export function CommunityScreen() {
    /** Contexts */
    const commContext = React.useContext(CommunityContext).communityContext
    const commState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [commData, setCommData] = React.useState({})

    React.useEffect(() => {
        setCommData(JSON.parse(commState.currentCommunity))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.notSoBigName}>You are in,</Text>
                <Text style={styles.bigName}>{ commData.name }</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.infoHeader}>Code</Text>
                <Text>{ commData.code }</Text>
            </View>
            <View>
                <Text style={styles.infoHeader}>User List</Text>
                <Text>list of users</Text>
            </View>
            <View>
                    <TouchableOpacity
                        style={styles.buttons}
                        onPress={() => { exitProcedure() }}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    notSoBigName: {
        fontSize: 30,
        color: '#B7B7B7',
        fontWeight: 'bold'
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