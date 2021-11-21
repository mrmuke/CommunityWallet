import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'
import API_URL from '../API_URL';
import AuthContext from '../auth-context';
import { showMessage } from 'react-native-flash-message';
import i18n from '../i18n/index'
import tokens from '../i18n/tokens'

const { bao_W, forgotPassword_P, login_W, signUp_P } = tokens.screens.login
const baoWord = i18n.t(bao_W)
const forgotPasswordPhrase = i18n.t(forgotPassword_P)
const loginWord = i18n.t(login_W)
const signUpPhrase = i18n.t(signUp_P)

export default function Login({ navigation }) {
  const { authContext } = React.useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  function submit() {

    axios.post(API_URL + "/user/login", { phoneNumber, password }).then(response => {
      console.log(response.data)
      let data = {
        mnemonic: response.data.mnemonic,
        password: password,
        admin: response.data.admin
      }
      authContext.signIn(data)

    }).catch(e => {
      showMessage({
        message: "Wrong Number or Password",
        type: "danger",
      });
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{baoWord}</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPhoneNumber(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>{forgotPasswordPhrase}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={submit} style={styles.loginBtn}>
        <Text style={styles.loginText}>{loginWord}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Signup");
      }}>
        <Text style={styles.signup}>{signUpPhrase}</Text>
      </TouchableOpacity>
    </View>
  );
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
  }
});