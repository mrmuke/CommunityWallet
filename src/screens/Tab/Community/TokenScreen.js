import * as React from 'react'
import {
    SafeAreaView,
    Text,
    View
} from 'react-native'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { TokenContext } from '../../../states/Contexts'

export function TokenScreen({ route, navigation }) {
    /** States and contexts */
    const tokenContext = React.useContext(TokenContext).tokenContext
    const tokenState = React.useContext(TokenContext).tokenState

    /** State variables */
    const [token, setToken] = React.useState(tokenState.parentToken._id === route.params.token._id ? 
        tokenState.parentToken : 
        tokenState.childTokens.find(tok => route.params.token._id === tok._id)
    )

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Text>{token.name}</Text>
        </SafeAreaView>
    )
}