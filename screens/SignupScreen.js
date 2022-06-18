import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HStack, Switch } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
import tokens from '../i18n/tokens'
import { useTranslation } from 'react-i18next'

import API_URL from '../API_URL'
import AuthContext from '../auth-context'

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

    async function register() {
        var curError = []
        if (username.length < 5) {
            curError.push("username")
          }
        if (phoneNumber.length < 10) {
          curError.push("phone")
        }
        if (password.length < 8) {
            curError.push("password")
        }
        if (password != confirmPassword) {
          curError.push("confirm")
        }
        
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

    checkVerify = () => {
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
}