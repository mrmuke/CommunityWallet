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

export function ReqDataScreen({ route, navigation }) {
    const { request } = route.params

    const handleReqRes = bool => {
        const msg = {
            requestId: request._id, 
            verdict: bool
        }
        axios.post(`${API_URL}/communityrequest/respond`, msg)
        .then(res => {

        })
        .catch(err => {
            showMessage({
                message: 'Something went wrong',
                color: 'danger'
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
                        <Text style={{color: colors.lighterGray, fontSize: sz.xl}}></Text>
                    </View>
                    <View style={{width: '10%'}}></View>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={{color: colors.lighterGray, fontSize: sz.xl}}>Request for</Text>
                    <Text style={CommonStyle.mediumName}>{request.name}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <Text>{request.response1}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <Text>{request.response2}</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <Text>{request.response3}</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity 
                    style={[styles.circleButton, {marginBottom: sz.sm}]}
                    onPress={() => handleReqRes(true)}
                >
                    <Text style={{color: colors.white}}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.circleButton, CommonStyle.infoBox]}
                    onPress={() => handleReqRes(false)}
                >
                    <Text style={{color: colors.white}}>Deny</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    circleButton: {
        height: sz.xxl * 2,
        width: sz.xxl * 2,
        borderRadius: sz.xxl,
        backgroundColor: colors.clicky2,
        alignItems: 'center',
        justifyContent: 'center'
    }
})