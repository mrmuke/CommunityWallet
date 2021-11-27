import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import API_URL from '../API_URL';
import { HStack, Switch } from 'native-base';
import AuthContext from '../auth-context';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';


// LANGUAGE LOCALIZATION
import tokens from '../i18n/tokens';
import { useTranslation } from 'react-i18next';

const {
  communityNameLonger_P,
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
  passwordsUnequal_P,
  isAdmin_W
} = tokens.screens.signup



export default function Signup({ navigation }) {
  const {t} = useTranslation()

const communityNameLongerPhrase =t(communityNameLonger_P)
const verificationCodePhrase =t(verificationCode_P)
const wrongVerificationCodePhrase =t(wrongVerificationCode_P)
const signUpPhrase =t(signUp_P)
const aCodeHasBeenSentPhrase =t(aCodeHasBeenSent_P)
const pleaseEnterCodePhrase =t(pleaseEnterCode_P)
const verficationCodeInputPhrase =t(verficationCodeInput_P)
const goBackPhrase =t(goBack_P)
const verifyWord =t(verify_W)
const alreadyHaveAccountPhrase =t(alreadyHaveAccount_P)
const phoneNumberWord =t(phoneNumber_W)
const usernameWord =t(username_W)
const passwordWord =t(password_W)
const confirmPasswordPhrase =t(confirmPassword_P)
const communityNameWord =t(communityName_W)
const communityCodeWord =t(communityCode_W)
const submitSignUpPhrase =t(submitSignUp_P)
  const { authContext } = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [code, setCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [verifying, setVerifying] = useState(false);
/*   const [error, setError] = useState("")
 */
  const [admin, setAdmin] = useState(false)
  const [communityName, setCommunityName] = useState("")
  const [loading,setLoading]=useState(false)
  const [username,setUsername]=useState("")
  const [numTokens,setNumTokens] =useState("")

  async function register() {
    if(password!=confirmPassword){
      showMessage({message:t(passwordsUnequal_P), type:'warning'})
      return;
      //translate messages, admin
    }
    if (admin && communityName.length < 4) {
      showMessage({
        message: communityNameLongerPhrase,
        type: "warning",
      });
      return;
    }
    var min = 123456
    var max = 999999
    var random = Math.floor(Math.random() * (max - min) + min);
    axios.post("https://rest.nexmo.com/sms/json", { "from": "18334641476", "text": verificationCodePhrase + ' ' + random, "to": phoneNumber, "api_key": "e5444577", "api_secret": "PcOaBXuHxxySxTe6" }).then(response => {
      setVerifyCode(random)
      console.log(random)
      setVerifying(true)
    })
    //mongo set info
  }
  function checkVerify() {
    
    if (verifyCode == verificationCode) {
      setLoading(true)
      axios.post(API_URL + "/user/create", { phoneNumber, name:username, admin, code, password,communityName,numTokens }).then(response => {
        console.log(response.data)
        var data = {
          mnemonic: response.data.mnemonic,
          password: password,
          admin: admin
        }
        authContext.signUp(data)

      }).catch(e => {
        /* showMessage({message:e.}) */
      })

    }
    else {
      showMessage({
        message: wrongVerificationCodePhrase,
        type: "error",
      });
    }
  }

  if (verifying) {
    return (
      <View style={styles.container}>

        <Text style={styles.logo}>{signUpPhrase}</Text>
        {loading ?
          <ActivityIndicator />
          :
          <>
            <Text style={styles.verifaction}>{aCodeHasBeenSentPhrase} {phoneNumber}. {'\n'}{pleaseEnterCodePhrase}</Text>
            <View style={styles.inputView} >

              <TextInput
                keyboardType="numeric"
                style={styles.inputText}
                placeholder={verficationCodeInputPhrase}
                placeholderTextColor="#003f5c"
                onChangeText={text => { setVerificationCode(text);/*  if (error.length > 0) { setError("")  }*/ }}
                value={verificationCode} />
            </View>

            <TouchableOpacity onPress={
              () => {
                setVerifying(false);
              }
            }>

              <Text style={styles.forgot}>{goBackPhrase}</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkVerify()} style={styles.loginBtn}>
              <Text style={styles.loginText}>{verifyWord}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("Login");
            }}>
              <Text style={styles.signup}>{alreadyHaveAccountPhrase}!</Text>
            </TouchableOpacity></>}
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.logo}>{signUpPhrase}</Text>
      <View style={styles.inputView} >
        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          placeholder={phoneNumberWord}
          placeholderTextColor="#003f5c"
          onChangeText={text => setPhoneNumber(text)}
          value={phoneNumber} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder={usernameWord}
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)}
          value={username} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder={passwordWord}
          placeholderTextColor="#003f5c"
          onChangeText={text => setPassword(text)}
          value={password} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder={confirmPasswordPhrase}
          placeholderTextColor="#003f5c"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword} />
      </View>
      
      <HStack justifyContent="space-between" width={"75%"} alignItems="center" marginBottom={5}><Text style={{ fontWeight: 'bold' }}>{t(isAdmin_W)}</Text><Switch isChecked={admin} onToggle={e => setAdmin(e)} /></HStack>
      
        {admin ?
        <>
          <View style={styles.inputView} ><TextInput
            style={styles.inputText}
            placeholder={communityNameWord}
            placeholderTextColor="#003f5c"
            onChangeText={text => setCommunityName(text)}
            value={communityName} /></View>
            <View style={styles.inputView}><TextInput
          keyboardType={'numeric'}
          style={styles.inputText}
          placeholder={t(numTokens_P)}
          placeholderTextColor="#003f5c"
          onChangeText={text => setNumTokens(text)}
          value={numTokens} /></View>
      </>
          : <View style={styles.inputView} ><TextInput
            style={styles.inputText}
            placeholder={communityCodeWord}
            placeholderTextColor="#003f5c"
            onChangeText={text => setCode(text)}
            value={code} /></View>}
      <TouchableOpacity style={styles.loginBtn} onPress={
        () => {
          register()
        }
      }>
        <Text style={styles.loginText}>{submitSignUpPhrase}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Login");
      }}>
        <Text style={styles.signup}>{alreadyHaveAccountPhrase}</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
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
  }
});