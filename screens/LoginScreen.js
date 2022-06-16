import axios from 'axios'
import * as React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View,  } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-web'

import { AuthContext } from '../utils/AuthContext'

export function LoginScreen() {
    const authContext = React.useContext(AuthContext)

    const [username, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    
    const handleLogin = () => {
        axios.post(`${API_URL}/user/login`, { password, username })
        .then(res => {
            authContext.logIn({
                mnemonic: res.data.data.mnemonic,
                password: password
            })
        })
        .catch(err => {
            showMessage({
                message: "ERROR",
                type: "danger",
            })
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.logo}>{baoWord}</Text>
            <View style={styles.inputView}>
                <TextInput
                    keyboardType="numeric"
                    style={styles.inputText}
                    placeholder={phoneNumberWord + "..."}
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPhoneNumber(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder={passwordWord + "..."}
                    placeholderTextColor="#003f5c"
                    onChangeText={text => setPassword(text)}
                />
            </View>


            <TouchableOpacity>
                <Text style={styles.forgot}>{forgotPasswordPhrase}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={submit} style={styles.loginBtn}>
                <Text style={styles.loginText}>{loginWord}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate("Signup") }}>
                <Text style={styles.signup}>{signUpPhrase}</Text>
             </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding: 20,
    },
    error:{
        borderColor:"#cc0000",
        borderWidth:2,
    },
    inputText: {
        height: 50,
        color: "black",
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
    }
})