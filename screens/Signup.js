import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import API_URL from '../API_URL';
import { HStack, Switch } from 'native-base';
import AuthContext from '../auth-context';
import FlashMessage, { showMessage } from 'react-native-flash-message';
export default function Signup({ navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [verifying, setVerifying] = useState(false);
/*   const [error, setError] = useState("")
 */  const [admin, setAdmin] = useState(false)
  const [communityName, setCommunityName] = useState("")


  async function register() {
    //create wallet
    //setup mongo
    var min = 123456
    var max = 999999
    var random = Math.floor(Math.random() * (max - min) + min);
    axios.post("https://rest.nexmo.com/sms/json", { "from": "18334641476", "text": "Your verification code is " + random, "to": phoneNumber, "api_key": "e5444577", "api_secret": "PcOaBXuHxxySxTe6" }).then(response => {
      setVerifyCode(random)
      console.log(random)
      setVerifying(true)
    })
    //mongo set info
  }
  function checkVerify() {
    if (verifyCode == verificationCode) {
      axios.post(API_URL + "/user/create", { phoneNumber, name: "Test #2", admin, code, password,communityName }).then(response => {
        console.log(response.data)
        var data = {
          mnemonic: response.data.mnemonic,
          password: password,
          admin:admin
        }
        authContext.signUp(data)
        
      }).catch(e=>{
        /* showMessage({message:e.}) */
      })

    }
    else {
      showMessage({
        message: "Wrong Verification Code",
        type: "error",
      });
    }
  }

  if (verifying) {
    return (
      <View style={styles.container}>
        <FlashMessage position="top" />
        <Text style={styles.logo}>Sign Up</Text>
        <Text style={styles.verifaction}>A code has been sent to &nbsp;{phoneNumber}. {'\n'}Please enter it to continue</Text>
        <View style={styles.inputView} >

          <TextInput
            style={styles.inputText}
            placeholder="Verification Code..."
            placeholderTextColor="#003f5c"
            onChangeText={text => { setVerificationCode(text);/*  if (error.length > 0) { setError("")  }*/ }}
            value={verificationCode} />
        </View>
{/*         {error.length > 0 && <Text style={{ backgroundColor: "#eb6060", padding: 15, color: 'white', marginBottom: 10 }}>{error}</Text>}
 */}
        <TouchableOpacity onPress={
          () => {
            setVerifying(false);
          }
        }>

          <Text style={styles.forgot}>Go back</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => checkVerify()} style={styles.loginBtn}>
          <Text style={styles.loginText}>VERIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Login");
        }}>
          <Text style={styles.signup}>Already have an account? Log in!</Text>
        </TouchableOpacity>

      </View>
    );
  }
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
      <HStack justifyContent="space-between" width={"75%"} alignItems="center" marginBottom={5}><Text style={{ fontWeight: 'bold' }}>Admin</Text><Switch isChecked={admin} onToggle={e => setAdmin(e)} /></HStack>
      <View style={styles.inputView} >
        {admin ?
          <TextInput
            style={styles.inputText}
            placeholder="Community Name..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setCommunityName(text)}
            value={communityName} />
          : <TextInput
            style={styles.inputText}
            placeholder="Community Code..."
            placeholderTextColor="#003f5c"
            onChangeText={text => setCode(text)}
            value={code} />}
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={
        () => {
          register()
        }
      }>
        <Text style={styles.loginText}>SIGNUP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Login");
      }}>
        <Text style={styles.signup}>Already have an account? Log in!</Text>
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
  },
  verifaction: {
    fontSize: 14,
    color: "black",
    width: "100%",
    textAlign: "center",
    marginBottom: 35
  }
});