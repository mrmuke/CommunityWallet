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
import { CommunityContext } from '../../../states/Contexts'

export function CommunityScreen({ navigation }) {
    /** Contexts */
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [adminList, setAdminList] = React.useState()
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))
    const [memberList, setMemberList] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(false)
    const [permissionData, setPermissionData] = React.useState(JSON.parse(communityState.currentPermission))
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
       getUserData()
    }, [])

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
     * Displayed out user data 
     * @param {*} user User data to be displayed
     * @returns View of layed out user data
     */
    const userView = user => {
        return (
            <TouchableOpacity key={user._id} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                    <Text style={[CommonStyle.infoLg, {marginRight: sz.sm, fontWeight: sz.bold}]}>{ user.username }</Text>
                    <Text style={CommonStyle.infoLg}>{ user.wasmAddress }</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * Navigation for the community stack
     * @param {*} screen Screen to navigate to
     */
    const modalNavigate = screen => {
        navigation.navigate(screen)
        setModalVisible(false)
    }

    return (
        <View>
        <SafeAreaView style={CommonStyle.container}>
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
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.headerSm}>Parent Token</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.headerSm}>Child Tokens</Text>
                </View>
                {
                    permissionData.permissionLevel == 'admin-master' ? (
                        <TouchableOpacity 
                            onPress={() => modalNavigate('Manage Tokens')}
                            style={[CommonStyle.longButton, CommonStyle.spaceBetween, {paddingLeft: sz.sm, paddingRight: sz.sm}]}
                        >
                            <Image style={{height: sz.lg, width: sz.lg}} source={require('../../../assets/tab/keyFocused.png')}></Image>
                            <Text style={[CommonStyle.infoMd, {color: colors.white}]}>Manage Tokens</Text>
                            <View style={{width: sz.lg}}></View>
                        </TouchableOpacity>

                    ) : (<></>)
                }
            </View>
            <ScrollView 
                style={{height: '100%'}}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getUserData}/>}
            >
                <View style={CommonStyle.infoBox}>
                    <View style={CommonStyle.infoBox}>
                        <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold, color: 'black'}]}>Administrator</Text>
                        {
                            !adminList ? (
                                <BulletList/>
                            ) :
                            (adminList.length == 0) ? (
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
                            ) :
                            (memberList.length == 0) ? (
                                <Text style={CommonStyle.infoMd}>No administrator</Text>
                            ) : (
                                memberList.map(admin => userView(admin))
                            )
                        }
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
                    style={[CommonStyle.longButton, {marginBottom: sz.sm}]} 
                    onPress={() => modalNavigate('Request Community')} 
                >
                    <Text style={{color: colors.white}}>Request to create a community</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[CommonStyle.longButton]} 
                    onPress={() => modalNavigate('Request List')}
                >
                    <Text style={{color: colors.white}}>See your community requests</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
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
})