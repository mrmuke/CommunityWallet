import * as React from 'react'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { KeyboardAvoidingView, StyleSheet, Text, View,  } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

import { API_URL } from '../utils/API_URL'
import { AuthContext } from '../utils/Contexts'
import tokens from '../i18n/tokens'

/** Translation tokens */
const { wrongCredentials_P, bao_W, phoneNumber_P, password_W, forgotPassword_P, login_W, signUp_P } = tokens.screens.login

export function LoginScreen({ navigation }) {
    /** i18n */
    const { t } = useTranslation()

    /** Authentication Context */
    const authContext = React.useContext(AuthContext).authContext

    /** State variables */
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [initialSubmit, setInitialSubmit] = React.useState(false)
    const [inputErrors, setInputErrors] = React.useState([])

    React.useEffect(() => {
        console.log(initialSubmit)
        if (initialSubmit) { pushInputErrors() }
    }, [phoneNumber, password, initialSubmit])

    /** Checking inputs */
    const inputsFilled = () => {
        return (phoneNumber.length == 0 || password.length == 0)
    }
    const pushInputErrors = () => {
        setInputErrors([])
        let errList = []
        if (phoneNumber.length == 0) { errList.push('phoneNumber') }
        if (password.length == 0) { errList.push('password') }
        setInputErrors(errList)
    }
    const getInputStyle = str => {
        console.log(inputErrors)
        if (inputErrors.includes(str)) {
            return {...styles.inputView, ...styles.error}
        } else {
            return styles.inputView
        }
    }

    /** Submit button styles and enabling */
    const getSubmitStyle = () => {
        if (inputsFilled()) {
            return {...styles.loginBtn, ...styles.disabledButton}
        } else {
            return styles.loginBtn
        }
    }
    
    /** Handle login request */
    const handleLogin = () => {
        setInitialSubmit(true)
        axios.post(`${API_URL}/user/login`, { password, phoneNumber })
        .then(res => {
            authContext.logIn({
                mnemonic: res.data.data.mnemonic,
                password: password,
                phoneNumber: res.data.data.phoneNumber,
                username: res.data.data.username,
                evmosAddress: res.data.data.evmosAddress,
                ethAddress: res.data.data.ethAddress,
                wasmAddress: res.data.data.wasmAddress,
                ixoAddress: res.data.data.ixoAddress
            })
        })
        .catch(err => {
            showMessage({
                message: t(wrongCredentials_P),
                type: "danger"
            })
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.logo}>{ t(bao_W) }</Text>
            <View style={getInputStyle('phoneNumber')}>
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputText}
                    placeholder={ t(phoneNumber_P) + "..." }
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPhoneNumber(text)}
                />
            </View>
            <View style={getInputStyle('password')}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder={ t(password_W) + "..." }
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>{ t(forgotPassword_P) }</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleLogin} 
                style={getSubmitStyle()}
                disabled={inputsFilled()}
            >
                <Text style={styles.loginText}>{ t(login_W) }</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("SignupScreen") }}>
                <Text style={styles.signup}>{ t(signUp_P) }</Text>
             </TouchableOpacity>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        color: "#eb6060",
        fontSize: 50,
        fontWeight: "bold",
        marginBottom: 40
    },
    inputView: {
        backgroundColor: "#e9ecfb",
        borderRadius: 25,
        justifyContent: "center",
        height: 50,
        marginBottom: 10,
        padding: 20,
        width: "80%",
    },
    error:{
        borderColor:"#cc0000",
        borderWidth:2,
    },
    inputText: {
        color: "black",
        height: 50,
    },
    forgot: {
        color: "#eb6060",
        fontSize: 11
    },
    signup: {
        color: "gray",
        textDecorationLine: "underline",
        fontSize: 12,
        marginTop: 40,
        paddingBottom: 10,
        paddingTop: 10,
        top: -10,
    },
    loginBtn: {
        alignItems: "center",
        backgroundColor: "#6474E5",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        marginBottom: 0,
        marginTop: 23,
        width: "80%",
    },
    loginText: {
        color: "white"
    },
    disabledButton: {
        backgroundColor: '#aab3f1'
    }
})