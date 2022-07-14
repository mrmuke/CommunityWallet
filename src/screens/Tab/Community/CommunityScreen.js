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
import { TokenCardLoader } from '../../../components/TokenCardLoader'

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
        getUserData()
        if (!tokenState.isLoading) {
            setParentToken(tokenState.parentToken)
            setChildTokens(tokenState.childTokens)
        }
    }, [tokenState])

    /** Getting user data from the server */
    const getUserData = () => {
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
     * Function that will return initials of name
     * @param {*} name Name that will be initialized
     * @returns first two intials (if applicable) of username
     */
    const getUserInitials = name => {
        return name.split(' ').map((e, i, a) => (i == 0 ) ? e[0].toUpperCase() : (i+1 == a.length && i != 0) ? e[0].toUpperCase() : '').join('')
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
    const tokenView = token => {
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
                        <Text 
                            style={[CommonStyle.infoMd, {color: 'black'}]}
                            numberOfLines={1}
                        >{token.address}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * Used to display user views
     * @param {*} user User data whose data is to be displayed
     * @returns User data wrapped in TouchableOpacity with redirect to user info page
     */
     const userView = user => {
        return (
            <TouchableOpacity key={user._id} style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%'}}>
                <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                    <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials(user.username) }</Text></View>
                    <Text style={[CommonStyle.infoLg, {marginRight: sz.sm, fontWeight: sz.bold}]}>{ user.username }</Text>
                    <Text style={CommonStyle.infoLg} numberOfLines={1} >{ user.wasmAddress }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
        <SafeAreaView>
            <ScrollView 
                style={{height: '100%'}}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => {
                        tokenContext.reloadTokens()
                        getUserData
                    }}
                />}
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
                    <View style={CommonStyle.infoBox}>
                        <ScrollView
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}
                            style={styles.tokenScroll}
                        >
                            <View>
                                <Text style={[CommonStyle.headerSm, {marginBottom: sz.xxs}]}>Parent Token</Text>
                                {
                                    !parentToken ? (
                                        <TokenCardLoader style={{marginRight: sz.md}}/>
                                    ) : 
                                    (parentToken == 'Not found') ? (
                                        <TouchableOpacity 
                                            style={[styles.tokenCard, {justifyContent: 'center', alignItems: 'center'}]}
                                            onPress={() => navigation.navigate('Mint Symbol', { tokenType: 'Parent' })}
                                        >
                                            <Image style={{width: sz.lg, height: sz.lg}} source={require('../../../assets/plus.png')}/>
                                        </TouchableOpacity>     
                                    ) : (
                                        tokenView(parentToken)
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
                                            {childTokens.map(token => tokenView(token))}
                                            <TouchableOpacity 
                                                style={[styles.tokenCard, {justifyContent: 'center', alignItems: 'center'}]}
                                                onPress={() => navigation.navigate('Mint Symbol', { tokenType: 'Child' })}
                                            >
                                                <Image style={{width: sz.lg, height: sz.lg}} source={require('../../../assets/plus.png')}/>
                                            </TouchableOpacity>  
                                        </View>
                                        
                                    )
                                }
                            </View>
                            
                        </ScrollView>   
                       
                    </View>
                    <View style={[CommonStyle.infoBox, {marginTop: sz.xs}]}>
                        <View style={CommonStyle.infoBox}>
                            <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold, color: 'black'}]}>Administrator</Text>
                            {
                                !adminList ? (
                                    <BulletList/>
                                    ) : (adminList.length == 0) ? (
                                        <Text style={CommonStyle.infoMd}>No administrator</Text>
                                    ) : (
                                        adminList.map(admin => userView(admin))
                                    )
                            }
                        </View>
                        <View style={CommonStyle.infoBox}>
                            <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold, color: 'black'}]}>Members</Text>
                            {
                                !memberList ? (
                                    <BulletList/>
                                ) : (memberList.length == 0) ? (
                                    <Text style={CommonStyle.infoMd}>No administrator</Text>
                                ) : (
                                        memberList.map(admin => userView(admin))
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
            style={styles.modalContainer}
        >   
            <View style={styles.modalContent}>
                <View style={[CommonStyle.infoBox, styles.pullDownBar]}></View>
                <TouchableOpacity 
                    style={[styles.menuButtons, {marginBottom: sz.sm}]} 
                    onPress={communityContext.exitCommunity} 
                >
                    <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                        <Image style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} source={require('../../../assets/exit.png')}/>
                        <View style={{width: '100%'}}>
                            <View style={{height:sz.xxxs, marginBottom: sz.xs}}></View>
                            <Text style={[CommonStyle.infoLg]}>Exit community</Text>
                            <View style={[CommonStyle.divider, {marginTop: sz.xs}]}></View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.menuButtons, {marginBottom: sz.sm}]} 
                    onPress={() => modalNavigate('Request Community')} 
                >
                    <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                        <Image style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} source={require('../../../assets/docs.png')}/>
                        <View style={{width: '100%'}}>
                            <View style={{height:sz.xxxs, marginBottom: sz.xs}}></View>
                            <Text style={[CommonStyle.infoLg]}>Request community</Text>
                            <View style={[CommonStyle.divider, {marginTop: sz.xs}]}></View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.menuButtons]} 
                    onPress={() => modalNavigate('Request List')}
                >
                    <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                        <Image style={{width: sz.xl, height: sz.xl, marginRight: sz.sm}} source={require('../../../assets/list.png')}/>
                        <View style={{width: '90%'}}>
                            <View style={{height:sz.xxxs, marginBottom: sz.xs}}></View>
                            <Text style={[CommonStyle.infoLg]}>Your community requests</Text>
                            <View style={[CommonStyle.divider, {marginTop: sz.xs}]}></View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    initialsBubble: {
        alignItems: 'center', 
        backgroundColor: colors.lighterGray, 
        borderColor: colors.info, 
        borderRadius: sz.lg, 
        borderWidth: 1,
        justifyContent: 'center', 
        height: sz.xl,
        marginRight: sz.xs,
        width: sz.xl, 
    },
    modalContainer: {
        margin: 0,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: colors.white,
        paddingTop: sz.lg,
        borderTopLeftRadius: sz.xl,
        borderTopRightRadius: sz.xl,
        padding:sz.sm
    },
    pullDownBar: {
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 3,
        height: sz.xxs,
        width: sz.xl,
    },
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
        paddingBottom: sz.md, 
        paddingTop: sz.xxs, 
    }
})