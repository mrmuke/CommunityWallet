import * as React from 'react'
import axios from 'axios'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,

} from 'react-native'
import { showMessage } from 'react-native-flash-message'

import { API_URL } from '../utils/API_URL'
import { CommonStyle, colors, sz } from '../styles/common'

export function CommunityRequestListScreen() {
    const [requestList, setRequestList] = React.useState()

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
        console.log(requestList)
    })

    const requestView = request => {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
            <Text style={CommonStyle.bigName}>Requests</Text>
            <ScrollView style={{height: '100%'}}>
                {
                    !requestList ? (
                        <Text style={CommonStyle.infoText}>Could not load</Text>
                    ) :
                    (requestList.length == 0) ? (
                        <Text style={CommonStyle.infoText}>No community requests</Text>
                    ) : (
                        requestList.forEach(request => requestView(request))
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})