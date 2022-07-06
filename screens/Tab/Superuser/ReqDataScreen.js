import * as React from 'react'
import axios from 'axios'
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
import { ReqListContext } from '../../../utils/Contexts'

export function ReqDataScreen({ route, navigation }) {
    /** Contexts and States */
    const reqListContext = React.useContext(ReqListContext).reqListContext
    const reqListState = React.useContext(ReqListContext).reqListState

    /** State variables */
    const [requestList, setRequestList] = React.useState(reqListState.communityRequestList) // put requestList as a state to enable rerender when data changes
    const [request, setRequest] = React.useState(requestList.find(req => route.params.request._id === req._id)) // request that was passed down through navigation

    /**
     * Handling response to community request event
     * @param {*} verdict boolean of  whether or not the request is approved
     */
    const handleReqRes = verdict => {
        const msg = {
            requestId: request._id, 
            verdict: verdict
        }
        axios.post(`${API_URL}/communityrequest/respond`, msg)
        .then(res => {
            reqListContext.updateReqList(request._id, verdict)
        })
        .catch(err => {
            showMessage({
                message: 'Something went wrong',
                type: 'danger'
            })
        })
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
        <ScrollView style={{height: '100%'}}>
            <View style={CommonStyle.infoBox}>
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
                <View style={CommonStyle.infoBox}>
                    <Text style={[CommonStyle.headerSm, {marginBottom: sz.xs}]}>Requested by</Text>
                    <View style={[CommonStyle.sideBySide, CommonStyle.infoBox, {alignItems: 'center'}]}>
                        <View style={styles.initialCircle}>
                            <Text style={styles.initialText}>{request.requester.username.substring(0, 1).toUpperCase()}</Text>
                        </View>
                        <View style={{marginLeft: sz.sm}}>
                            <Text style={CommonStyle.infoLg}>{request.requester.username}</Text>
                            <Text style={CommonStyle.infoLg}>{request.requester.phoneNumber}</Text>
                        </View>
                    </View>
                </View>
                <View style={CommonStyle.infoBox}>
                    <View style={CommonStyle.infoBox}>
                        <Text style={CommonStyle.headerSm}>Proposed Location</Text>
                        <Text style={CommonStyle.infoLg}>{request.location}</Text>
                    </View>
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
            </View>
            <View>
                {
                    request.completed ? (
                        <View style={[styles.completedResponseMessageBox, {backgroundColor: request.approved ? colors.green : colors.red}]}>
                            <Text style={{color: colors.white, fontSize: sz.lg}}>{request.approved ? 'Approved' : 'Denied'}</Text>
                        </View>
                    ) : (
                        <View>
                            <TouchableOpacity 
                                style={[CommonStyle.longButton, CommonStyle.infoBox, {marginBottom: sz.sm, backgroundColor: colors.green}]}
                                onPress={() => handleReqRes(true)}
                            >
                                <Text style={{color: colors.white}}>Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[CommonStyle.longButton, CommonStyle.infoBox, {backgroundColor: colors.red}]}
                                onPress={() => handleReqRes(false)}
                            >
                                <Text style={{color: colors.white}}>Deny</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    completedResponseMessageBox: {
        alignItems: 'center',
        borderRadius: sz.md,
        height: sz.xxxl, 
        justifyContent: 'center',
        width: '100%',
    },
    initialText: {
        color: colors.lightGray,
        fontSize: sz.lg
    },
    initialCircle: {
        alignItems: 'center',
        backgroundColor: colors.lighterGray, 
        borderColor: colors.lightGray, 
        borderWidth: 1,
        borderRadius: sz.xxl, 
        justifyContent: 'center',
        height: sz.xxl, 
        width: sz.xxl, 
    },
})