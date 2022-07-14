import axios from 'axios'
import * as React from 'react'
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import ConfettiCannon from 'react-native-confetti-cannon'
import { RequestListContext } from '../../../states/Contexts'

export function RequestDataScreen({ route, navigation }) {
    /** Contexts and States */
    const requestListContext = React.useContext(RequestListContext).requestListContext
    const requestListState = React.useContext(RequestListContext).requestListState

    /** State variables */
    const [requestList, setRequestList] = React.useState(requestListState.communityRequestList) // put requestList as a state to enable rerender when data changes
    const [request, setRequest] = React.useState(requestList.find(req => route.params.request._id === req._id)) // request that was passed down through navigation
    const [screenActive, setScreenActive] = React.useState(true)
    const [activateConfetti, setActivateConfetti] = React.useState(false)

    /**
     * This function creates a community from a community request 
     * @param {*} req this is the approved request that will be created into a community!
     */
     const handleCreateCommunity = req => {
        setScreenActive(false)
        const msg = { requestId: req._id }
        axios.post(`${API_URL}/community/createFromRequest`, msg)
        .then(res => {
            requestListContext.createdCommunityFromRequest(request._id)
            setActivateConfetti(true)
            setScreenActive(true)
        })
        .catch(err => {
            console.log(err)
            showMessage({
                message: 'Something went wrong! Check your network connection.',
                type: 'danger'
            })
        })
    }

    return (
        <SafeAreaView 
            style={CommonStyle.container}
            pointerEvents={screenActive ? 'auto' : 'none'}
        >
            <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                <View style={{width: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '80%', alignItems: 'center'}}>
                    <Text style={[CommonStyle.headerMd, {color: colors.gold}]}>{request.name}</Text>
                </View>
                <View style={{width: '10%'}}></View>
            </View>
            <ScrollView style={{height: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.headerSm}>Location</Text>
                    <Text style={CommonStyle.infoLg}>{request.location}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <View style={CommonStyle.infoBox}>
                        <Text style={CommonStyle.headerSm}>Response 1</Text>
                        <Text style={CommonStyle.infoLg}>{request.response1}</Text>
                    </View>
                    <View style={CommonStyle.infoBox}>
                        <Text style={CommonStyle.headerSm}>Response 2</Text>
                        <Text style={CommonStyle.infoLg}>{request.response2}</Text>
                    </View>
                    <View style={CommonStyle.infoBox}>
                        <Text style={CommonStyle.headerSm}>Response 3</Text>
                        <Text style={CommonStyle.infoLg}>{request.response3}</Text>
                    </View>
                </View>
                <View style={[ CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                    <View style={[styles.completedResponseMessageBox, {backgroundColor: request.completed ? (request.approved ? colors.green : colors.red) : colors.lightGray}]}></View>
                    <Text style={CommonStyle.infoLg}>{request.completed ? (request.approved ? 'Approved' : 'Denied') : 'Pending Approval'}</Text>
                </View>
                {
                    (request.completed && request.approved && !request.created) ? (
                        <View style={CommonStyle.infoBox}>
                            <TouchableOpacity style={CommonStyle.longButton} onPress={() => handleCreateCommunity(request)}>
                                <Text style={{color: colors.white}}>Create!</Text>
                            </TouchableOpacity>
                            <Text style={[CommonStyle.infoMd, {textAlign: 'center', marginTop: sz.xs}]}>Your community is approved and ready to be created!</Text>
                        </View>
                    ) : (
                        <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                            <View style={[styles.completedResponseMessageBox, {backgroundColor: colors.pink}]}></View>
                            <Text style={CommonStyle.infoLg}>Created</Text>
                        </View>
                    )
                }
            </ScrollView>
            <View>
                {
                    activateConfetti ? (
                        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
                    ) : (
                        <></>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    completedResponseMessageBox: {
        borderRadius: sz.xl,
        height: sz.xl, 
        justifyContent: 'center',
        marginRight: sz.sm,
        width: sz.xl,
    },
})