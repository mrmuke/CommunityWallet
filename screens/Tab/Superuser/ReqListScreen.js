import * as React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { ReqListContext } from '../../../utils/Contexts'
import { ReqListService } from '../../../utils/ReqListUtils'
 
export function ReqListScreen({ navigation }) {
    /** Context */
    const reqListContext = React.useContext(ReqListContext).reqListContext
    const reqListState = React.useContext(ReqListContext).reqListState

    /** State variabels */
    const [completedReq, setCompletedReq] = React.useState([])
    const [incompleteReq, setIncompleteReq] = React.useState([])
    React.useEffect(() => {
        console.log(reqListState.communityRequestList)
        
        setCompletedReq(reqListState.communityRequestList.filter(req => req.completed)) // setting the completed community requests to its own array
        setIncompleteReq(reqListState.communityRequestList.filter(req => !req.completed)) // likewise for the incomplete community requests
    }, [reqListState])

    /**
     * Components to display community requests.
     * @param {*} req object containing all the details of the request
     */
    const reqView = req => {
        return (
            <TouchableOpacity 
                key={req._id} 
                style={CommonStyle.infoBox} 
                onPress={() => navigation.navigate('Request', { request: req })}
            >
                <Text style={CommonStyle.infoHeader}>Request for: { req.name }</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={CommonStyle.infoText}>Requester: </Text>
                    <View>
                        <Text style={CommonStyle.infoText}>{ req.requester.username }</Text>
                        <Text style={CommonStyle.infoText}>{ req.requester.phoneNumber }</Text>
                    </View>
                </View>
                <View style={[CommonStyle.infoBox, {width: '100%', height: sz.xxxs, backgroundColor: colors.lighterGray, borderRadius: sz.sm, marginTop: sz.sm}]}></View>
            </TouchableOpacity>
        )
    }

    return (
        <ReqListContext.Provider value={{reqListContext, reqListState}}>
            <SafeAreaView style={CommonStyle.container}>
            <ScrollView style={{height: '100%'}}>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.bigName}>Request List</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={[CommonStyle.bigHeader, CommonStyle.infoBox]}>Requests to review</Text>
                    {
                        (incompleteReq.length == 0) ? (
                            <Text styl={CommonStyle.infoText}>All requests reviewed!</Text>
                        ) : (
                            incompleteReq.map(req => reqView(req)) // List all incomplete requests to review
                        )
                    }
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={[CommonStyle.bigHeader, CommonStyle.infoBox]}>Completed requests</Text>
                    {
                        (completedReq.length == 0) ? (
                            <Text style={CommonStyle.infoText}>No completed requests</Text>
                        ) : (
                            completedReq.map(req => reqView(req)) // List all completed requests
                        )
                    }
                </View>
            </ScrollView>
            </SafeAreaView>
        </ReqListContext.Provider>
    )
}

const styles = StyleSheet.create({
    
})