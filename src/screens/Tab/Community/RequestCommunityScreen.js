import * as React from 'react'
import axios from 'axios'
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Modal from 'react-native-modal'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'

export function RequestScreen({ navigation }) {
    const [screenActive, setScreenActive] = React.useState(true)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [resLoading, setResLoading] = React.useState(true)

    const [name, setName] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [response1, setResponse1] = React.useState('')
    const [response2, setResponse2] = React.useState('')
    const [response3, setResponse3] = React.useState('')

    const handleSubmit = () => {
        setScreenActive(false)
        setModalVisible(true)
        const msg = {
            communityName: name,
            communityLocation: location,
            response1: response1,
            response2: response2,
            response3: response3,
        }
        axios.post(`${API_URL}/communityrequest/create`, msg)
        .then(res => {
            setResLoading(false)
        })
        .catch(err => {
            setScreenActive(true)
            setResLoading(false)
            setModalVisible(false)
            showMessage({
                message: 'Something went wrong',
                type: 'danger'
            })
        })
    }

    return (
        <KeyboardAvoidingView 
            behavior='padding' 
            enabled 
            pointerEvents={screenActive ? 'auto' : 'none'}
        >
            <ScrollView style={CommonStyle.container} showsVerticalScrollIndicator={false}>
                <View style={[CommonStyle.infoBox, {marginTop: sz.lg}]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.mediumName}>Request a Community</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Community Name</Text>
                    <TextInput 
                        style={[styles.smallTextInput, styles.textInput]} 
                        numberOfLines={1}
                        onChangeText={text => setName(text)}
                    />
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Location</Text>
                    <TextInput 
                        style={[styles.smallTextInput, styles.textInput]} 
                        numberOfLines={1}
                        onChangeText={text => setLocation(text)}
                    />
                </View>
                <View style={[CommonStyle.infoBox, {width: '100%', height: sz.xxxs, backgroundColor: colors.lighterGray, borderRadius: sz.sm, marginTop: sz.sm}]}></View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        onChangeText={text => setResponse1(text)}
                        style={[styles.largeTextInput, styles.textInput]}
                    />
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 2</Text>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        onChangeText={text => setResponse2(text)}
                        style={[styles.largeTextInput, styles.textInput]}
                    />
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 3</Text>
                    <TextInput
                        multiline
                        numberOfLines={40}
                        onChangeText={text => setResponse3(text)}
                        style={[styles.largeTextInput, styles.textInput]}
                    />
                </View>
                <View style={[CommonStyle.infoBox, {marginTop: sz.sm}]}>
                    <TouchableOpacity style={CommonStyle.longButton} onPress={() => handleSubmit()}>
                        <Text style={{color: colors.white}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal
                isVisible={modalVisible}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropOpacity={0.5}
                hideModalContentWhileAnimating={true}
                style={styles.modalContainer}
            >
                {
                    resLoading ? (
                        <View>
                            <ActivityIndicator size='large' />
                        </View> 
                    ) : (
                        <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', backgroundColor: colors.white, height: 100, width: 200, borderRadius: sz.lg}}>
                            <View style={CommonStyle.infoBox}>
                                <Text style={CommonStyle.infoText}>Your request has been sent!</Text>
                            </View>
                            <View style={CommonStyle.infoBox}>
                                <TouchableOpacity 
                                    style={{borderRadius: sz.lg, heigth: 50, width: 100, alignItems: 'center', backgroundColor: colors.clicky2}} 
                                    onPress={() => {
                                        setModalVisible(false)
                                        navigation.goBack()
                                    }}
                                >
                                    <Text style={{color: colors.white}}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = new StyleSheet.create({
    largeTextInput: {
        height: 100,
    },
    modalContainer: {
        margin: 0,
        width: '100%',
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'black',
        padding: sz.md,
        borderRadius: sz.lg,
        height: 100,
        width: 100,

    },
    smallTextInput: {
        height: sz.xl,
    },
    textInput: {
        borderColor: colors.lightGray,
        borderRadius: sz.xs,
        borderWidth: 1,
        padding: sz.xs,
    },
})