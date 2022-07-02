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

export function RequestListScreen({ navigation }) {
    const [requestList, setRequestList] = React.useState([])

    React.useEffect(() => {
        axios.post(`${API_URL}/user/communityrequests`)
        .then(res => {
            setRequestList(res.data.data)
        })
        .catch(err => {
            showMessage({
                message: 'Could not load requests',
                type: 'danger'
            })
        })
    }, [])

    const requestView = request => {
        return (
            <TouchableOpacity 
                key={request._id.toString()} 
                style={CommonStyle.infoBox} 
                onPress={() => navigation.navigate('Request', { request: request })}
            >
                <Text style={CommonStyle.infoHeader}>Request for: { request.name }</Text>
                <Text style={CommonStyle.infoText}>Status: {request.completed ? 'Complete' : 'Incomplete'}</Text>
                <Text style={CommonStyle.infoText}>Approved: {!request.completed ? 'Pending' : request.approved ? 'True' : 'False'}</Text>
                <View style={[CommonStyle.infoBox, {width: '100%', height: sz.xxxs, backgroundColor: colors.lightGray, borderRadius: sz.sm, marginTop: sz.sm}]}></View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
            <View style={[CommonStyle.infoBox, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
                <View style={{width: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '80%', alignItems: 'center'}}>
                    <Text style={CommonStyle.mediumName}>Requests</Text>
                </View>
                <View style={{width: '10%'}}></View>
            </View>
            <ScrollView style={{height: '100%'}}>
                <View>
                    {
                        !requestList ? (
                            <Text>Could not load requests</Text>
                        ) :
                        (requestList.length == 0) ? (
                            <Text>No community requests</Text>
                        ) : 
                        (
                            requestList.map(request => requestView(request))
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})