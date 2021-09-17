import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import * as SMS from 'expo-sms'
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

export default function Signup({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [communityCode, setCommunityCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [verifying, setVerifying] = useState(false)

  async function register() {
    const newWallet = await DirectSecp256k1HdWallet.generate()
    const isAvailable = await SMS.isAvailableAsync()
    
    if (isAvailable) {
      var min = 123456
      var max = 999999
      var randomCode = Math.floor(Math.random() * (max - min) + min)

      await SMS.sendSMSAsync(
        [phoneNumber],
        'Your verification code is: ' + randomCode
      )

      setVerifyCode(randomCode)
      setVerifying(true)
    }

    //firebase set info
    const firebaseConfig = {
      apiKey: "AIzaSyA7wegayCQfvGgQexHZrEuHXOZJmlFSdm8",
      authDomain: "walletdev-c7351.firebaseapp.com",
      projectId: "walletdev-c7351",
      databaseURL: "https://walletdev-c7351-default-rtdb.firebaseio.com/",
      storageBucket: "walletdev-c7351.appspot.com",
      messagingSenderId: "296209260053",
      appId: "1:296209260053:web:087097dd79269edd65b81c"
    }
    
    const app = initializeApp(firebaseConfig)
    const db = getDatabase()

    const wallet = await DirectSecp256k1HdWallet.generate()
    const mnemonic = await wallet.mnemonic
    console.log(wallet)

  }

  function checkVerify() {
    if (verifyCode == verificationCode) {

    }
  }

  if (verifying) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up</Text>
        <Text style={styles.verifaction}>A code has been sent to &nbsp;{phoneNumber}. {'\n'}Please insert it to continue</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Verification Code..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setVerificationCode(text)}
            value={verificationCode} />
        </View>
        <TouchableOpacity onPress={() => {setVerifying(false)}
        }>
          <Text style={styles.forgot}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => checkVerify()} style={styles.loginBtn}>
          <Text style={styles.loginText}>VERIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
          <Text style={styles.signup}>Already have an account? Log in!</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Phone Number..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}
            value={password} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Community Code..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setCommunityCode(text)}
            value={communityCode} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => {register()}
        }>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
          <Text style={styles.signup}>Already have an account? Log in!</Text>
        </TouchableOpacity>
      </View>
    )
  }
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
  },
  verifaction: {
    fontSize: 14,
    color: "black",
    width: "100%",
    textAlign: "center",
    marginBottom: 35
  }
})