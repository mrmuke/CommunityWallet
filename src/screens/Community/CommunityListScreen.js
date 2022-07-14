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

import { CommonStyle, colors, sz } from '../../styles/common'
import { AuthContext, CommunityContext } from '../../states/Contexts'

export function CommunityListScreen({ navigation }) {
    /** Contexts and States */
    const authContext = React.useContext(AuthContext).authContext
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [communityList, setCommunityList] = React.useState()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalButtonAct, setModalButtonAct] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        if (communityState.communityList) {
            setCommunityList(JSON.parse(communityState.communityList))
        }
    }, [communityState])

    /** Close community context/state first then auth context/state  */
    const handleSignout = () => {
        authContext.signOut()
        communityContext.signOut()
    }

    /**
     * Handling the enter community using community data. This will change the state of the current community within the app
     * @param {*} community community that user will be entering
     */
    const handleEnterCommunity = community => {
        const permission = {...community, communityId: community.communityId._id}
        const comm = community.communityId
        communityContext.enterCommunity(comm, permission)
    }

    /**
     * Each community user is part of will be displayed with one of these elements
     * @param {*} community community that user is part of
     * @returns View of the basic info of user's relation to the community
     */
    const communityInfoView = community => {
        return (
            <TouchableOpacity 
                key={community._id} 
                style={styles.communityButton}
                onPress={() => handleEnterCommunity(community)}
            >
                <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <Text style={CommonStyle.headerSm}>{community.communityId.name}</Text>
                    <Text style={CommonStyle.infoLg}>{community.permissionLevel}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
        <SafeAreaView style={[CommonStyle.container, CommonStyle.verticalSeperator, {justifyContent: 'space-between'}]}>
            <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                <Text style={[CommonStyle.headerMd, {color: colors.gold}]}>Your communities</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image style={{height: sz.lg, width: sz.lg}} source={require('../../assets/menu.png')}></Image>
                </TouchableOpacity>
            </View>
            <ScrollView 
                style={CommonStyle.infoBox}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={communityContext.fetchCommunities}/>}
            >
                {
                    !communityList ? (
                            <BulletList/>
                    ) :
                    communityList.length == 0 ? (
                        <View>
                            <Text style={CommonStyle.infoMd}>You are not part of any communities. Sign up for one!</Text>
                        </View>
                    ) : (
                        communityList.map(community => communityInfoView(community))
                    )
                }
            </ScrollView>
            <View style={{marginBottom: sz.sm}}>
                <TouchableOpacity 
                    style={CommonStyle.longButton}
                    onPress={() => navigation.navigate('CommunityCodeScreen')}
                    >
                    <Text style={{color: colors.white}}>Join a new community</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        <Modal
            isVisible={modalVisible}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            backdropOpacity={0.5}
            hideModalContentWhileAnimating={true}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            onSwipeStart={() => setModalButtonAct(false)}
            onSwipeCancel={() => setModalButtonAct(false)}
            onModalShow={() => setModalButtonAct(true)}
            swipeDirection='down'
            style={styles.modalContainer}
        >   
            <View style={styles.modalContent}>
                <View style={[CommonStyle.infoBox, styles.pullDownBar]}></View>
                <TouchableOpacity 
                    style={[CommonStyle.longButton, {marginBottom: sz.sm}]} 
                    disabled={modalButtonAct}
                    onPress={() => handleSignout()} 
                >
                    <Text style={{color: colors.white}}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    communityButton: {
        alignContent: 'center',
        alignItems: 'center',
        borderColor: colors.lighterGray,
        borderRadius: sz.sm,
        borderWidth: 1,
        height: sz.xxl,
        justifyContent: 'center',
        paddingLeft: sz.xs,
        paddingRight: sz.xs
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
        height: 50
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: sz.xl,
        borderTopRightRadius: sz.xl,
        padding: sz.sm,
        paddingTop: sz.lg,
    },
    pullDownBar: {
        alignSelf: 'center',
        backgroundColor: 'black',
        borderRadius: 3,
        height: sz.xxs,
        width: sz.xl,
    },
})