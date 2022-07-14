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
import { MenuButton, TokenCardLoader, UserView1 } from '../../../components'
import { CommunityContext, TokenContext } from '../../../states/Contexts'
import { getUserInitials } from '../../../utils/HelperFunctions'


export function CommunityScreen({ navigation }) {
    /** Contexts */
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState
    const tokenContext = React.useContext(TokenContext).tokenContext
    const tokenState = React.useContext(TokenContext).tokenState

    /** State variables */
    const [adminList, setAdminList] = React.useState()
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))
    const [childTokens, setChildTokens] = React.useState()
    const [memberList, setMemberList] = React.useState()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [parentToken, setParentToken] = React.useState()
    const [permissionData, setPermissionData] = React.useState(JSON.parse(communityState.currentPermission))
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        getMemberData()
        if (!tokenState.isLoading) {
            setParentToken(tokenState.parentToken)
            setChildTokens(tokenState.childTokens)
        }
    }, [tokenState])

    /** Getting user data from the server */
    const getMemberData = () => {
        const msg = { communityId: communityData._id.toString() }
        Promise.all([
            axios.post(`${API_URL}/community/listAdministrators`, msg),
            axios.post(`${API_URL}/community/listMembers`, msg),
        ])
        .then(resps => {
            setAdminList(resps[0].data.data)
            setMemberList(resps[1].data.data)
        })
    }

    /**
     * Navigation for the community stack
     * @param {*} screen Screen to navigate to
     */
     const modalNavigate = screen => {
        setModalVisible(false)
        navigation.navigate(screen)
    }    

    /**
     * Used to display the communities tokens
     * @param {*} token Token whose data is to be displayed
     * @returns View containing the token data 
     */
    const tokenCardView = token => {
        return (
        <TouchableOpacity
            style={[styles.tokenCard]} 
            key={token._id}
            onPress={() => navigation.navigate('Token', {token})}
        >
            <View style={CommonStyle.verticalSeperator}>
                <Text style={CommonStyle.infoMd}>{token.name}</Text>
                <View>
                    <Text style={CommonStyle.headerSm}>{token.symbol}</Text>
                    <Text style={[CommonStyle.infoMd, {color: 'black'}]} numberOfLines={1}>{token.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )
    }

    return (
    <>
    <SafeAreaView>
    <ScrollView 
        style={{height: '100%'}}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {tokenContext.reloadTokens(); getMemberData();}}/>}
    >
    <View style={CommonStyle.container}>
        <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
            <Text style={[CommonStyle.headerMd, {color: colors.red}]}>{communityData.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image style={{height: sz.lg, width: sz.lg}} source={require('../../../assets/menu.png')}></Image>
            </TouchableOpacity>
        </View>
        <View style={[CommonStyle.infoBox, CommonStyle.sideBySide]}>
            <Text style={[CommonStyle.headerSm, {color: colors.lightGray}]}>Code: </Text>
            <Text style={[CommonStyle.headerSm, {fontWeight: sz.plain, color: colors.lightGray}]}>{ communityData.code }</Text>
        </View>
        <ScrollView
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            style={[CommonStyle.infoBox, styles.tokenScroll]}
        >
            <View>
                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xxs}]}>Parent Token</Text>
                {
                !parentToken ? (
                    <TokenCardLoader style={{marginRight: sz.md}}/>
                ) : 
                (parentToken == 'Not found' && permissionData.permissionLevel == 'admin-master') ? (
                    <TouchableOpacity 
                        style={[styles.tokenCard, {justifyContent: 'center', alignItems: 'center'}]}
                        onPress={() => navigation.navigate('Mint Symbol', { tokenType: 'Parent' })}
                    >
                        <Image style={{width: sz.lg, height: sz.lg}} source={require('../../../assets/plus.png')}/>
                    </TouchableOpacity>     
                ) : (
                    tokenCardView(parentToken)
                )
                }
            </View>
            <View>
                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xxs}]}>Child Tokens</Text>
                {
                !childTokens ? (
                    <TokenCardLoader style={{marginRight: sz.md}}/>
                ) : (
                    <View style={CommonStyle.sideBySide}>
                        {childTokens.map(token => tokenCardView(token))}
                        {
                        (permissionData.permissionLevel == 'admin-master') ? (
                            <TouchableOpacity 
                                style={[styles.tokenCard, {justifyContent: 'center', alignItems: 'center'}]}
                                onPress={() => navigation.navigate('Mint Symbol', { tokenType: 'Child' })}
                            >
                                <Image style={{width: sz.lg, height: sz.lg}} source={require('../../../assets/plus.png')}/>
                            </TouchableOpacity>  
                        ) : <></>
                        }
                    </View>
                )
                }
            </View>
        </ScrollView>   
        <View style={[CommonStyle.infoBox, {marginTop: sz.xs}]}>
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold, color: 'black'}]}>Administrator</Text>
                {
                !adminList ? (
                    <BulletList/>
                    ) : (adminList.length == 0) ? (
                        <Text style={CommonStyle.infoMd}>No administrator</Text>
                    ) : (
                        adminList.map(admin => UserView1({user: admin}))
                    )
                }
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold, color: 'black'}]}>Members</Text>
                {
                !memberList ? (
                    <BulletList/>
                ) : (memberList.length == 0) ? (
                    <Text style={CommonStyle.infoMd}>No members</Text>
                ) : (
                        memberList.map(member => UserView1({user: member}))
                )
                }
            </View>
        </View>
    </View>
    </ScrollView>
    </SafeAreaView>

    <Modal
        isVisible={modalVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        hideModalContentWhileAnimating={true}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection='down'
        style={CommonStyle.modalContainer}
    >   
        <View style={CommonStyle.modalContent}>
            <View style={[CommonStyle.infoBox, CommonStyle.pullDownBar]}></View>
            <MenuButton 
                image={<Image style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} 
                source={require('../../../assets/exit.png')}/>} message={'Exit community'} 
                onPress={communityContext.exitCommunity}
            />
            <MenuButton 
                image={<Image style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} 
                source={require('../../../assets/docs.png')}/>} 
                message={'Request community'} 
                onPress={() => modalNavigate('Request Community')}
            />
            <MenuButton image={<Image 
                style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} 
                source={require('../../../assets/list.png')}/>} 
                message={'Request list'} 
                onPress={() => modalNavigate('Request List')}
            />
        </View>
    </Modal>
    </>
    )
}

const styles = StyleSheet.create({
    tokenCard: {
        backgroundColor: colors.white, 
        borderRadius: sz.md,
        height: 125, 
        marginRight: sz.md,
        paddingBottom: sz.sm,
        paddingLeft: sz.xs,
        paddingRight: sz.xs,
        paddingTop: sz.sm,
        shadowColor: 'black', 
        shadowOffset: {width: -2, height: 4}, 
        shadowOpacity: 0.15, 
        shadowRadius: sz.xxs, 
        width: 100, 
    },
    tokenScroll: {
        marginLeft: -sz.md,
        marginRight: -sz.md,
        paddingLeft: sz.md,
        paddingRight: sz.md,
        paddingBottom: sz.md, 
        paddingTop: sz.xxs, 
    }
})