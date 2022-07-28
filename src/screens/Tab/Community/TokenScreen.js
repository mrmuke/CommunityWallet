import * as React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { CommunityContext, TokenContext } from '../../../states/Contexts'


export function TokenScreen({ route, navigation }) {
    /** States and contexts */
    const communityState = React.useContext(CommunityContext).communityState
    const tokenState = React.useContext(TokenContext).tokenState

    /** State variables */
    const token = React.useRef(tokenState.parentToken._id === route.params.token._id ? 
        tokenState.parentToken : 
        tokenState.childTokens.find(tok => route.params.token._id === tok._id)
    ).current

    return (
    <SafeAreaView style={CommonStyle.container}>
        <View style={CommonStyle.verticalSeperator}>
            <Text>{token.name}</Text>
            {
            JSON.parse(communityState.currentPermission).permissionLevel == 'admin-master' ? (
                <View style={[CommonStyle.spaceBetween, {marginBottom: sz.sm}]}>
                    <TouchableOpacity style={styles.mintBurnButtons} onPress={() => navigation.navigate('Adjust Supply', {tokenData: token, action: 'mint'})}>
                        <Text style={{color: colors.white}}>Mint more</Text>
                    </TouchableOpacity>    
                    <TouchableOpacity style={styles.mintBurnButtons} onPress={() => navigation.navigate('Adjust Supply', {tokenData: token, action: 'burn'})}>
                        <Text style={{color: colors.white}}>Burn</Text>
                    </TouchableOpacity>
                </View>
            ) : <></>
            }
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mintBurnButtons: {
        alignItems: 'center',
        backgroundColor: colors.clicky1,
        borderRadius: sz.sm,
        height: sz.xl,
        justifyContent: 'center',
        width: '47.5%',
    }
})