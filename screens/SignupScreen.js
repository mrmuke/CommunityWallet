import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HStack, Switch } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
import tokens from '../i18n/tokens'
import { useTranslation } from 'react-i18next'

import { API_URL } from '../utils/API_URL'
import { AuthContext } from '../utils/AuthContext'

/** Translations */
const {
    verificationCode_P,
    wrongVerificationCode_P,
    signUp_P,
    aCodeHasBeenSent_P,
    pleaseEnterCode_P,
    verficationCodeInput_P,
    goBack_P,
    verify_W,
    alreadyHaveAccount_P,
    phoneNumber_W,
    username_W,
    password_W,
    confirmPassword_P,
    communityName_W,
    communityCode_W,
    submitSignUp_P,
    numTokens_P,
    isAdmin_W,
    phoneNumber_EP,
    username_EP,
    password_EP,
    confirmPassword_EP,
    communityName_EP,
    communityCode_EP,
    notUnique_EP,
    numTokens_EP
} = tokens.screens.signup

export function SignupScreen({ navigation }) {
    /** i18n */
    const { t } = useTranslation()
    const wrongVerificationCodePhrase = t(wrongVerificationCode_P)
    const signUpPhrase = t(signUp_P)
    const aCodeHasBeenSentPhrase = t(aCodeHasBeenSent_P)
    const pleaseEnterCodePhrase = t(pleaseEnterCode_P)
    const verficationCodeInputPhrase = t(verficationCodeInput_P)
    const goBackPhrase = t(goBack_P)
    const verifyWord = t(verify_W)
    const submitSignUpPhrase = t(submitSignUp_P)
    const alreadyHaveAccountPhrase = t(alreadyHaveAccount_P)
    const phoneNumberWord = t(phoneNumber_W)
    const usernameWord = t(username_W)
    const passwordWord = t(password_W)
    const confirmPasswordPhrase = t(confirmPassword_P)
    const phoneError = t(phoneNumber_EP)
    const usernameError = t(username_EP)
    const passwordError = t(password_EP)
    const confirmPasswordError = t(confirmPassword_EP)

    /** Authentication Context */
    const { authContext } = React.useContext(AuthContext)

    /** State Variables */
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [error, setError] = React.useState([])
    const [loading, setLoading]=React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [username, setUsername]=React.useState('')
    const [verificationCode, setVerificationCode] = React.useState('')
    const [verifyCode, setVerifyCode] = React.useState('')
    const [verifying, setVerifying] = React.useState(false)

    const submitCheck = async () => {
        axios.post(API_URL + '/user/checkCreate', { username, phoneNumber })
        .then(res => {
            console.log(res.data)
            const errResList = res.data.data
            let errMessage
            if (errResList != 0) {
                (errResList[0] === 'phonenumber') ? errMessage = 'Phone number already in use!' : errMessage = 'Username already in user!' // ! i18nize
                showMessage({
                    message: errMessage,
                    type: "danger"
                })
            }

            let errList = []
            if (username.length < 5) { errList.push("username") }
            if (phoneNumber.length < 10) { errList.push("phone") }
            if (password.length < 8) { errList.push("password") }
            if (password != confirmPassword) { errList.push("confirm") }
            if(errList.length != 0) {
                setError(errList || errResList != 0)
                return
            }

            setError([])
    
            const min = 123456
            const max = 999999
            const random = Math.floor(Math.random() * (max - min) + min)
            setVerifyCode(random)
            setVerifying(true)
        })

        // axios.post("https://rest.nexmo.com/sms/json", { "from": "18447608059", "text": verificationCodePhrase + ' ' + random, "to": phoneNumber, "api_key": "1a7462e6", "api_secret": "jvvTsbFHah9H6fMU" }).then(response => {
            // setVerifyCode(random)
            // setVerifying(true)
        // })
        //mongo set info
    }

    const register = () => {
        if (verifyCode == verificationCode) {
            setLoading(true)
            axios.post(API_URL + '/user/create', { password, phoneNumber, username })
            .then(res => {
                authContext.signUp({
                    mnemonic: res.data.mnemonic,
                    password: password,
                    phoneNumber: res.data.data.phoneNumber,
                    username: username,
                    evmosAddress: res.data.data.evmosAddress,
                    ethAddress: res.data.data.ethAddress,
                    wasmAddress: res.data.data.wasmAddress,
                    ixoAddress: res.data.data.ixoAddress,
                })
                .catch(err => {
                    console.log(err)
                })
            })
        } else {
            showMessage({
                message: wrongVerificationCodePhrase,
                type: 'error'
            })
        }
    }

    /** Errors for formatting and etc. */
    const getErrorStyle = str => {
        if (error.includes(str)) {
            return {...styles.inputView, ...styles.error}
        } else {
            return {...styles.inputView}
        }
    }

    const getErrorMessage = (text, errorMessage) => {
        return ( <Text style={styles.errorText}><Text style={styles.errorTextBold}>{ text }</Text>{ errorMessage }</Text> )
    }

    if (verifying) {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>{ signUpPhrase }</Text>
                {loading ?
                    <ActivityIndicator/>
                :
                    <>
                    <Text style={styles.verifaction}>{aCodeHasBeenSentPhrase} {phoneNumber}. {'\n'}{pleaseEnterCodePhrase} : {verifyCode}</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            keyboardType="numeric"
                            style={styles.inputText}
                            placeholder={verficationCodeInputPhrase}
                            placeholderTextColor="#003f5c"
                            onChangeText={text => { setVerificationCode(text) }}
                            value={verificationCode}
                        />
                    </View>
                    <TouchableOpacity onPress={() => setVerifying(false)} >
                        <Text style={styles.forgot}>{ goBackPhrase }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => register()} style={styles.loginBtn}>
                        <Text style={styles.loginText}>{ verifyWord }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.signup}>{ alreadyHaveAccountPhrase }!</Text>
                    </TouchableOpacity>
                    </>
                }
          </View>
        )
      }
      return (
        <KeyboardAvoidingView 
            style={styles.kb} 
            behavior="padding" 
            enabled 
            keyboardVerticalOffset={10}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.logo}>{ signUpPhrase }</Text>
                <View style={getErrorStyle("phone")}>
                    <TextInput
                        keyboardType="numeric"
                        style={styles.inputText}
                        placeholder={phoneNumberWord + "..."}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setPhoneNumber(text)}
                        value={phoneNumber} 
                    />
                </View>
                <View style={getErrorStyle("username")}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={usernameWord + "..."}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setUsername(text)}
                        value={username}
                    />
                </View>
                <View style={getErrorStyle("password")}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder={passwordWord + "..."}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />
                </View>
                <View style={getErrorStyle("confirm")}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder={confirmPasswordPhrase + "..."}
                        placeholderTextColor="#003f5c"
                        onChangeText={text => setConfirmPassword(text)}
                        value={confirmPassword} 
                    />
                </View>
                <View style={{width:"80%"}}>
                        { (()=>{
                            let arr = []
                            if (error.includes("phone")) {
                                arr.push(getErrorMessage(phoneNumberWord, phoneError))
                            }
                            if (error.includes("username")) {
                                arr.push(getErrorMessage(usernameWord, usernameError))
                            }
                            if (error.includes("password")) {
                                arr.push(getErrorMessage(passwordWord, passwordError))
                            }
                            if (error.includes("confirm")) {
                                arr.push(getErrorMessage(confirmPasswordPhrase, confirmPasswordError))
                            }
                            return arr
                        })() }
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {submitCheck()}}>
                        <Text style={styles.loginText}>{ submitSignUpPhrase }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen') }}>
                        <Text style={styles.signup}>{ alreadyHaveAccountPhrase }</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
      )
}

const styles = StyleSheet.create({
    kb: { 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center' 
    },
    container: {
        paddingVertical:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#eb6060',
        marginBottom: 40
    },
    inputView: {
        width: '80%',
        backgroundColor: '#e9ecfb',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20
    },
    inputText: {
        height: 50,
        color: 'black'
    },
    forgot: {
        color: '#eb6060',
        fontSize: 11
    },
    signup: {
        color: '#eb6060',
        fontSize: 12,
        top: -10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10
    },
    loginBtn: {
        width: '80%',
        backgroundColor: '#6474E5',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 23,
        marginBottom: 0
    },
    loginText: {
        color: 'white'
    },
    verifaction: {
        fontSize: 14,
        color: 'black',
        width: '100%',
        textAlign: 'center',
        marginBottom: 35
    },
    error: {
        borderColor:'#cc0000',
        borderWidth:2,
    },
    errorText: {
        fontSize: 12, 
        color: '#cc0000', 
        marginBottom: 5
    },
    errorTextBold: {
        fontWeight: 'bold'
    }
})