import axios from 'axios'
import * as React from 'react'
import { BulletList } from 'react-content-loader/native'
import {
    Image,
    RefreshControl,
    SafeAreaView, 
    ScrollView,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
} from 'react-native'
import Modal from 'react-native-modal'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { CommunityContext, TokenContext } from '../../../states/Contexts'

export function ManageTokensScreen({ navigation }) {
    /** Contexts and States */
    const tokenContext = React.useContext(TokenContext).tokenContext
    const tokenState = React.useContext(TokenContext).tokenState

    /** State variables */
    const [parentToken, setParentToken] = React.useState(tokenState.parentToken)
    const [childTokens, setChildTokens] = React.useState(tokenState.childTokens)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalInfo, setModalInfo] = React.useState()

    /**
     * Component to display respective token information. On press will display modal to mint and burn said token.
     * @param {*} token Token to be listed
     * @returns Token view component
     */
    const tokenListView = token => {
        return (
            <TouchableOpacity key={token._id} onPress={() => setModalVisible(true)}>
                <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <View>
                        <Text style={[CommonStyle.headerMd, {fontWeight: sz.plain}]}>{token.symbol}</Text>
                        <Text style={CommonStyle.infoLg}>{token.name}</Text>
                    </View>
                    <View>
                        <Text>{token.address}</Text>
                    </View>
                </View>
                <View style={CommonStyle.divider}></View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
        <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween, {alignItems: 'center'}]}>
            <View style={{width: '10%'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{width: '80%', alignItems: 'center'}}>
                <Text style={[CommonStyle.headerMd, {color: colors.red}]}>Manage Tokens</Text>
            </View>
            <View style={{width: '10%'}}></View>
        </View>
        <ScrollView 
            style={{height: '100%'}}
            showsVerticalScrollIndicator={false}
        >
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.headerSm, {color: 'black'}]}>Parent Token</Text>
                {
                    tokenListView(parentToken)
                }
            </View>
            <View style={[CommonStyle.infoBox, {marginTop: sz.md}]}>
                <Text style={[CommonStyle.headerSm, {color: 'black', marginBottom: sz.sm}]}>Child Tokens</Text>
                {
                    (!childTokens.map || childTokens.length == 0) ? (
                        <Text style={CommonStyle.infoMd}>No child tokens currently.</Text>
                    ) : 
                    (
                        childTokens.map(token => tokenListView(token))
                    )
                }
            </View>
            <TouchableOpacity style={CommonStyle.longButton}>
                <Text style={{color: colors.white}}>Mint New Token</Text>
            </TouchableOpacity>
        </ScrollView>
        <Modal
            isVisible={modalVisible}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            backdropOpacity={0.5}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection='down'
            style={styles.modalContainer}
        >   
            <View style={styles.modalContent}>
                <View style={[CommonStyle.infoBox, styles.pullDownBar]}></View>

                <Text>hello</Text>
            </View>
        </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mintBurnButtons: {
        width: '47.5%', 
        backgroundColor: colors.clicky1, 
        height: sz.xl, 
        borderRadius: sz.sm,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        margin: 0,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.white,
        paddingTop: sz.lg,
        borderTopLeftRadius: sz.xl,
        borderTopRightRadius: sz.xl,
        padding:sz.sm,
        height: '95%',
    },
    pullDownBar: {
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 3,
        height: sz.xxs,
        width: sz.xl,
    },
})