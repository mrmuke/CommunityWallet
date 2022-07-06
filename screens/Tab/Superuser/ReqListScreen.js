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
import ContentLoader from 'react-content-loader/native'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { ReqListContext } from '../../../utils/Contexts'
 
export function ReqListScreen({ navigation }) {
    /** Contexts and States */
    // const reqListContext = React.useContext(ReqListContext).reqListContext
    const reqListState = React.useContext(ReqListContext).reqListState

    /** State variabels */
    const [completedReq, setCompletedReq] = React.useState()
    const [incompleteReq, setIncompleteReq] = React.useState()

    React.useEffect(() => {
        if (reqListState.communityRequestList) {
            setCompletedReq(reqListState.communityRequestList.filter(req => req.completed).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))) // setting the completed community requests to its own array
            setIncompleteReq(reqListState.communityRequestList.filter(req => !req.completed).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))) // likewise for the incomplete community requests
        }
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
                onPress={() => navigation.navigate('Request', {request: req})}
            >
                <View style={CommonStyle.spaceBetween}>
                    <View style={CommonStyle.sideBySide}>
                        <View style={[styles.responseCircle, {backgroundColor: req.completed ? (req.approved ? colors.green : colors.red) : colors.lighterGray}]}></View>
                        <Text style={[CommonStyle.infoLg, CommonStyle.infoHighlight, {color: 'black'}]}>{req.name}</Text>
                        <Text style={[CommonStyle.infoLg]}> by </Text>
                        <Text style={[CommonStyle.infoLg, CommonStyle.infoHighlight]}>{req.requester.username}</Text>
                    </View>
                    <View>
                        <Text style={[CommonStyle.infoMd]}>{getDate(req.createdAt)}</Text>
                    </View>
                </View>
                <View style={CommonStyle.divider}></View>
            </TouchableOpacity>
        )
    }

    const getDate = str => {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const date = new Date(str)
        return `${monthNames[date.getMonth()]} ${date.getDate()}`
    }

    return (
        <SafeAreaView style={CommonStyle.container}>
        <ScrollView style={{height: '100%'}}>
            <View style={CommonStyle.infoBox}>
                <Text style={[CommonStyle.headerMd, {color: colors.red}]}>Request List</Text>
            </View>
            <View style={CommonStyle.infoBox}>
                <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween]}>
                    <Text style={[CommonStyle.headerSm, {color: colors.lightGray}]}>Requests to review</Text>
                    <TouchableOpacity onPress={() => setIncompleteReq([...incompleteReq.reverse()])}>
                        <Image style={styles.sortButton} source={require('../../../assets/sort.png')}/>
                    </TouchableOpacity>                
                </View>
                {
                    !incompleteReq ? (
                        <ContentLoader/>
                    ) :
                    incompleteReq.length == 0 ? (
                        <Text style={CommonStyle.infoLg}>All requests reviewed!</Text>
                    ) : (
                        incompleteReq.map(req => reqView(req))
                    )
                }
            </View>
            <View style={CommonStyle.infoBox}>
                <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween]}>
                    <Text style={[CommonStyle.headerSm, {color: colors.lightGray}]}>Completed requests</Text>
                    <TouchableOpacity onPress={() => setCompletedReq([...completedReq.reverse()])}>
                        <Image style={styles.sortButton} source={require('../../../assets/sort.png')}/>
                    </TouchableOpacity>
                </View>
                {
                    !completedReq ? (
                        <ContentLoader/>
                    ) :
                    completedReq.length == 0 ? (
                        <Text style={CommonStyle.infoLg}>No completed requests</Text>
                    ) : (
                        completedReq.map(req => reqView(req))
                    )
                }
            </View>
            
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    responseCircle: {
        borderRadius: sz.md,
        height: sz.md, 
        marginRight: sz.xs,
        width: sz.md, 
    },
    sortButton: {
        width: sz.lg,
        height: sz.md,
        padding: 0,
    },
})