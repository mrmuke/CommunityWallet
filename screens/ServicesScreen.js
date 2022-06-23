import { Image, StyleSheet, Text, View, SafeAreaView } from 'react-native'

export function ServicesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.bigName}>Services!</Text>
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
    }
})