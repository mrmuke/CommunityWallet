import * as React from 'react'
import axios from 'axios'
import {
    Dimensions,
    Image,
    SafeAreaView, 
    ScrollView,
    SectionList,
    StyleSheet, 
    Text, 
    TouchableOpacity,
    View, 
} from 'react-native'
import Modal from 'react-native-modal'

import { API_URL } from '../utils/API_URL'
import { CommunityContext } from '../utils/Contexts'
import { CommonStyle, colors, sz } from '../styles/common'


export function CommunityScreen({ navigation }) {
    /** Contexts */
    const communityContext = React.useContext(CommunityContext).communityContext
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))
    const [adminData, setAdminData] = React.useState()
    const [memberList, setMemberList] = React.useState([])
    

    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalButtonAct, setModalButtonAct] = React.useState(false)

    React.useEffect(() => {
        const msg = { communityId: communityData._id.toString() }
        Promise.all([
            axios.post(`${API_URL}/community/communitylistAdministrators`, msg),
            axios.post(`${API_URL}/community/listMembers`, msg)
        ])
        .then(resps => {
            setAdminData(resps[0][0])
            setMemberList(resps[1])
        })
    }, [])

    const memberInfoView = member => {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>{ member.username }</View>
                <View>{ member.address }</View>
            </View>
        )
    }

    return (
        <View>
        <SafeAreaView style={CommonStyle.container}>
        <ScrollView style={{height: '100%'}}>
            <View>
                <View style={CommonStyle.infoBox}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={CommonStyle.bigHeader}>You are in,</Text>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Image style={{height: sz.lg, width: sz.lg}} source={require('../assets/menu.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <Text style={CommonStyle.bigName}>{ communityData.name }</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={[CommonStyle.infoBox, {marginRight: sz.xl}]}>
                        <Text style={CommonStyle.infoHeader}>Code</Text>
                        <Text style={[CommonStyle.infoText, {fontSize: sz.xl}]}>{ communityData.code }</Text>
                    </View>
                    <View style={CommonStyle.infoBox}>
                        <Text style={CommonStyle.infoHeader}>Administrator</Text>
                        <Text style={[CommonStyle.infoText, {fontWeight: '600'}]}>Admin</Text>
                    </View>
                </View>
                <View>
                    <Text style={CommonStyle.infoHeader}>User List</Text>
                    <View>

                    </View>
                    <Text style={CommonStyle.infoText}>l</Text>
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
            onBackdropPress={() => setModalVisible(!modalVisible)}
            onSwipeComplete={() => setModalVisible(!modalVisible)}
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
                    onPress={() => {
                        navigation.navigate('Community Request')
                        setModalVisible(false)
                    }} 
                >
                    <Text style={{color: colors.white}}>Request to create a community</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[CommonStyle.longButton]} disabled={modalButtonAct}>
                    <Text style={{color: colors.white}}>Exit community</Text>
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