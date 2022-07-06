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
import { ReqListContext } from '../../../utils/Contexts'
import { CommonStyle, colors, sz } from '../../../styles/common'

export function ReqDataScreen({ route, navigation }) {
    /** Contexts */
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
                <View style={[CommonStyle.infoBox, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={{width: '10%'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '80%', alignItems: 'center'}}>
                        <Text style={{color: colors.lightGray, fontSize: sz.xl}}></Text>
                    </View>
                    <View style={{width: '10%'}}></View>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={{color: colors.lightGray, fontSize: sz.xl}}>Request for</Text>
                    <Text style={[CommonStyle.mediumName, {color: colors.gold}]}>{request.name}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <Text>{request.response1}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 2</Text>
                    <Text>{request.response2}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 3</Text>
                    <Text>{request.response3}</Text>
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
    }
})