import * as React from 'react'
import axios from 'axios'
import {
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,

} from 'react-native'
import { BulletList } from 'react-content-loader/native'
import { showMessage } from 'react-native-flash-message'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { RequestListContext } from '../../../states/Contexts'
import { getDate } from '../../../utils/HelperFunctions'

export function RequestListScreen({ navigation }) {
    /** Contexts and States */
    const requestListContext = React.useContext(RequestListContext).requestListContext
    const requestListState = React.useContext(RequestListContext).requestListState

    /** State variables */
    const [requestList, setRequestList] = React.useState()
    const [refreshing, setRefreshing] = React.useState(false)

    React.useEffect(() => {
        if (!requestListState.isLoading) {
           setRequestList(requestListState.communityRequestList)
        }
    }, [requestListState])

    /**
     * This function is a view for each requests in the request list
     * @param {*} request Request data so the view can display appropriate information
     * @returns The view
     */
    const requestView = request => {
        return (
            <TouchableOpacity 
                key={request._id.toString()} 
                style={CommonStyle.infoBox} 
                onPress={() => navigation.navigate('Request', { request: request  })}
            >
                <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <Text style={CommonStyle.headerSm}>{request.name}</Text>
                    <Text style={CommonStyle.infoMd}>{getDate(request.createdAt)}</Text>
                </View>
                <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <View style={CommonStyle.sideBySide}>
                        <Text style={[CommonStyle.infoLg, {fontWeight: sz.bold}]}>Status: </Text>
                        <Text style={CommonStyle.infoLg}>{request.completed ? (request.approved ? (request.created ? 'Created' : 'Approved') : 'Not approved') : 'Pending'}</Text>
                    </View>
                    <View style={[styles.responseCircle, {backgroundColor: request.completed ? (request.approved ? (request.created ? colors.pink : colors.green) : colors.red) : colors.lighterGray}]}></View>
                </View>
                {   
                    (request.completed && request.approved && !request.created) ? (
                        <View>
                            <View style={styles.createText}>
                                <Text style={[CommonStyle.infoMd, {color: colors.white}]}>Ready to create</Text>
                            </View>
                        </View>
                    ) : (<></>)
                }
                <View style={CommonStyle.divider}></View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.container}>                
            <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                <View style={{width: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '90%', alignItems: 'center'}}>
                    <Text style={[CommonStyle.headerMd, {color: colors.red}]}>Community Requests</Text>
                </View>
            </View>
            <ScrollView 
                style={{height: '100%'}} 
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={requestListContext.reloadRequestList}/>}
            >
                <View>
                    {
                        !requestList ? (
                            <BulletList/>
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
    createText: {
        alignItems: 'center',
        backgroundColor: colors.clicky1,
        borderRadius: sz.xs,
        justifyContent: 'center',
        height: sz.lg, 
        marginTop: sz.xxs,
        paddingLeft: sz.xs,
        paddingRight: sz.xs,
    },
    responseCircle: {
        borderRadius: sz.md,
        height: sz.md, 
        marginRight: sz.xs,
        width: sz.md, 
    },
})