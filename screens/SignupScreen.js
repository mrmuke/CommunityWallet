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
    const verificationCodePhrase = t(verificationCode_P)
    const wrongVerificationCodePhrase = t(wrongVerificationCode_P)
    const signUpPhrase = t(signUp_P)
    const aCodeHasBeenSentPhrase = t(aCodeHasBeenSent_P)
    const pleaseEnterCodePhrase = t(pleaseEnterCode_P)
    const verficationCodeInputPhrase = t(verficationCodeInput_P)
    const goBackPhrase = t(goBack_P)
    const verifyWord = t(verify_W)
    const alreadyHaveAccountPhrase = t(alreadyHaveAccount_P)
    const phoneNumberWord = t(phoneNumber_W)
    const usernameWord = t(username_W)
    const passwordWord = t(password_W)
    const confirmPasswordPhrase = t(confirmPassword_P)
    const communityNameWord = t(communityName_W)
    const communityCodeWord = t(communityCode_W)
    const submitSignUpPhrase = t(submitSignUp_P)
    const phoneError = t(phoneNumber_EP)
    const usernameError = t(username_EP)
    const passwordError = t(password_EP)
    const confirmPasswordError = t(confirmPassword_EP)
    const communityNameError = t(communityName_EP)
    const communityCodeError = t(communityCode_EP)
    const numTokensError = t(numTokens_EP)
    const isAdminWord = t(isAdmin_W)

    /** Authentication Context */
    const { authContext } = React.useContext(AuthContext)

    /** State Variables */
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [code, setCode] = React.useState('')
    const [verificationCode, setVerificationCode] = React.useState('')
    const [verifyCode, setVerifyCode] = React.useState('')
    const [verifying, setVerifying] = React.useState(false)

    const [admin, setAdmin] = React.useState(false)
    const [communityName, setCommunityName] = React.useState('')
    const [loading, setLoading]=React.useState(false)
    const [username, setUsername]=React.useState('')
    const [numTokens, setNumTokens] =React.useState('')
    const [error, setError] = React.useState([])

    const register = async () => {
        var curError = []
        if (username.length < 5) { curError.push("username") }
        if (phoneNumber.length < 10) { curError.push("phone") }
        if (password.length < 8) { curError.push("password") }
        if (password != confirmPassword) { curError.push("confirm") }
        
        if(curError.length != 0) {
          setError(curError)
          return
        }
    
        // ! Should server be the one sending the code???
        setError([])
        var min = 123456
        var max = 999999
        var random = Math.floor(Math.random() * (max - min) + min)
        /* axios.post("https://rest.nexmo.com/sms/json", { "from": "18447608059", "text": verificationCodePhrase + ' ' + random, "to": phoneNumber, "api_key": "1a7462e6", "api_secret": "jvvTsbFHah9H6fMU" }).then(response => { */
          setVerifyCode(random)
          setVerifying(true)
        /* }) */
        //mongo set info
    }

    const checkVerify = () => {
        if (verifyCode == verificationCode) {
            setLoading(true)
            axios.post(API_URL + "/user/create", { phoneNumber, name:username, admin, code, password,communityName,numTokens })
            .then(response => {
                var data = {
                    mnemonic: response.data.mnemonic,
                    password: password,
                    admin: admin
                }
                authContext.signUp(data)
    
            })
            .catch(e => {
                e.response.data == 'Invalid User' ? showMessage({ message: t(notUnique_EP), type: "danger" }) : showMessage({ message: communityCodeWord+communityCodeError })
                setLoading(false)
            })
        }
        else {
            showMessage({
                message: wrongVerificationCodePhrase,
                type: "error",
            })
        }
    }

    const getErrorStyle = str => {
        if (error.includes(str)) {
            return {...styles.inputView,...styles.error}
        } else {
            return {...styles.inputView}
        }
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
                    <Text style={styles.forgot}>{goBackPhrase}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => checkVerify()} style={styles.loginBtn}>
                    <Text style={styles.loginText}>{verifyWord}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.signup}>{alreadyHaveAccountPhrase}!</Text>
                </TouchableOpacity>
                </>
                }
          </View>
        )
      }
      return (
        <KeyboardAvoidingView 
            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }} 
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
                <HStack 
                    justifyContent="space-between" 
                    width={"75%"} 
                    alignItems="center" 
                    marginBottom={5}
                >
                    <Text style={{fontWeight: 'bold'}}>{ isAdminWord }</Text>
                    <Switch isChecked={admin} onToggle={e => setAdmin(e)} />
                </HStack>
                {admin ?
                <>
                    <View style={getErrorStyle("communityName")}>
                        <TextInput
                            style={styles.inputText}
                            placeholder={communityNameWord + "..."}
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setCommunityName(text.replace(/\s/g, ''))}
                            value={communityName}
                        />
                    </View>
                    
                    <View style={getErrorStyle("numTokens")}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={styles.inputText}
                            placeholder={t(numTokens_P) + "..."}
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setNumTokens(text)}
                            value={numTokens} 
                        />
                    </View>
                </>
                :
                <>
                    <View style={getErrorStyle("communityCode")}>
                        <TextInput
                            style={styles.inputText}
                            placeholder={communityCodeWord + "..."}
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setCode(text)}
                            value={code}
                        />
                    </View>
                </>
                }
                <View style={{width:"80%"}}>
                        { (()=>{
                            let arr = []
                            if(error.includes("phone")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{phoneNumberWord}</Text>{ phoneError }</Text>)
                            }
                            if(error.includes("username")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{usernameWord}</Text>{ usernameError }</Text>)
                            }
                            if(error.includes("password")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{passwordWord}</Text>{ passwordError }</Text>)
                            }
                            if(error.includes("confirm")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{confirmPasswordPhrase}</Text>{ confirmPasswordError }</Text>)
                            }
                            if(error.includes("communityName")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{communityNameWord}</Text>{ communityNameError }</Text>)
                            }
                            if(error.includes("communityCode")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{communityCodeWord}</Text>{ communityCodeError }</Text>)
                            }
                            if(error.includes("numTokens")){
                            arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{t(numTokens_P)}</Text>{ numTokensError }</Text>)
                            }
                            return arr
                        })() }
                </View>
                <TouchableOpacity style={styles.loginBtn} onPress={() => { register() }}>
                        <Text style={styles.loginText}>{submitSignUpPhrase}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("LoginScreen") }}>
                        <Text style={styles.signup}>{alreadyHaveAccountPhrase}</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
      )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#eb6060",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#e9ecfb",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "black"
    },
    forgot: {
        color: "#eb6060",
        fontSize: 11
    },
    signup: {
        color: "#eb6060",
        fontSize: 12,
        top: -10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#6474E5",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 23,
        marginBottom: 0
    },
    loginText: {
        color: "white"
    },
    verifaction: {
        fontSize: 14,
        color: "black",
        width: "100%",
        textAlign: "center",
        marginBottom: 35
    },
    error:{
        borderColor:"#cc0000",
        borderWidth:2,
    },
})