import * as React from 'react'
import axios from 'axios'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'

export function ReqListScreen({ navigation }) {
    const [compReq, setCompReq] = React.useState([])
    const [incompReq, setIncompReq] = React.useState([])

    React.useEffect(() => {
        axios.post(`${API_URL}/communityrequest/all`)
        .then(res => {
            let complete = []
            let incomplete = []
            res.data.data.forEach(req => {
                if (req.completed) complete.push(req)
                else incomplete.push(req)
            })
            setCompReq(complete)
            setIncompReq(incomplete)
        })
    }, [])

    const reqView = req => {
        return (
            <TouchableOpacity 
                key={req._id} 
                style={CommonStyle.infoBox} 
                onPress={() => navigation.navigate('Request', { request: req })}
            >
                <Text style={CommonStyle.infoHeader}>Request for: { req.name }</Text>
                <Text style={CommonStyle.infoText}>Status: {req.completed ? 'Complete' : 'Incomplete'}</Text>
                <Text style={CommonStyle.infoText}>Approved: {!req.completed ? 'Pending' : req.approved ? 'True' : 'False'}</Text>
                <View style={[CommonStyle.infoBox, {width: '100%', height: sz.xxxs, backgroundColor: colors.lightGray, borderRadius: sz.sm, marginTop: sz.sm}]}></View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
        <ScrollView style={{height: '100%'}}>
            <View style={CommonStyle.infoBox}>
                <Text style={CommonStyle.bigName}>Request List</Text>
            </View>
            <View>
                <Text>Requests to review</Text>
                {
                    incompReq.map(req => reqView(req))
                    
                }
            </View>
            <View>
                <Text>Completed requests</Text>
                {
                    compReq.map(req => reqView(req))
                }
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})