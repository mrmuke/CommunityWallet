import { Image, StyleSheet, Text, View, List } from 'react-native'
import { TouchableOpacity } from 'react-native'
import * as React from 'react'

import { AuthContext } from '../utils/Contexts'

export function UserScreen() {

    const authContext = React.useContext(AuthContext).authContext

    return (
        <View>
            <Text>Text</Text>
            <Text>Address3418sdf4d88hisf83</Text>
            <View >
                <TouchableOpacity onPress={() => { authContext.signOut() }}>
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    
})