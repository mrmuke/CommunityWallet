import { Image, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-web'
import { AuthContext } from '../utils/AuthContext'
import { useState } from 'react'
import axios from 'axios'

export function SigninScreen() {
    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = () => {
        axios.post(`${API_URL}/user/login`, { password, username })
        .then(res => {
            const data = {
                mnemonic: res.data.data.mnemonic,
                password: password
            }
        })
    }

    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior = "padding"
        >
            <View style={ styles.inputContainer }>
                <TextInput
                    // onChangeText = {() => {  }}
                    placeholder="Username"
                    style={ styles.input }
                    // value={ }
                />
                <TextInput
                    // onChangeText = {() => {  }}
                    placeholder="Password"
                    secureTextEntry
                    style={ styles.input }
                    // value={ }
                />
            </View>
            <View style={ styles.buttonContainer }>
                <TouchableOpacity
                    onPress={() => {  }}
                    style={ styles.button }
                >
                    <Text style={ styles.buttonText }>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {  }}
                    style={ [styles.button, styles.buttonOutline] }
                >
                    <Text style={ styles.buttonOutlineText }>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {

    },
    input: {

    },
    buttonContainer: {

    },
    button: {

    },
    buttonText: {

    },
    buttonOutline: {

    },
    buttonOutlineText: {

    },
})