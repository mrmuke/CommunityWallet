import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'
import API_URL from '../API_URL';
import AuthContext from '../auth-context';
import { showMessage } from 'react-native-flash-message';
import tokens from '../i18n/tokens'
import { useTranslation } from 'react-i18next';
export default function Login({ navigation }) {
  const {t} = useTranslation()

const { wrongCredentials_P, bao_W, phoneNumber_W, password_W, forgotPassword_P, login_W, signUp_P, phoneNumber_EP, password_EP } = tokens.screens.login
const wrongCredentialsPhrase = t(wrongCredentials_P)
const baoWord = t(bao_W)
const phoneNumberWord = t(phoneNumber_W)
const passwordWord = t(password_W)
const forgotPasswordPhrase = t(forgotPassword_P)
const loginWord = t(login_W)
const phoneError = t(phoneNumber_EP)
const passwordError = t(password_EP)
const signUpPhrase = t(signUp_P)
  const { authContext } = React.useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState([]);

  function submit() {
    var curError = [];
    if(password.length < 8){
      curError.push("password");
    }
    if(!parseInt(phoneNumber) && phoneNumber.length != 0){
      curError.push("phone");
    }
    if(curError.length != 0){
      setError(curError);
      return;
    }
    axios.post(API_URL + "/user/login", { phoneNumber, password }).then(response => {
      let data = {
        mnemonic: response.data.mnemonic,
        password: password,
        admin: response.data.admin
      }
      authContext.signIn(data)

    }).catch(e => {
      showMessage({
        message: wrongCredentialsPhrase,
        type: "danger",
      });
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>{baoWord}</Text>
      {
        (()=>{
          if(error.includes("phone")){
            return(<View style={{...styles.inputView, ...styles.error}}>
              <TextInput
                style={styles.inputText}
                placeholder={phoneNumberWord + "..."}
                placeholderTextColor="#003f5c"
                onChangeText={text => setPhoneNumber(text)} />
            </View>)
          } else {
            return(<View style={{...styles.inputView}}>
              <TextInput
                style={styles.inputText}
                placeholder={phoneNumberWord + "..."}
                placeholderTextColor="#003f5c"
                onChangeText={text => setPhoneNumber(text)} />
            </View>)
          }
        })()
      }
      {
        (()=>{
          if(error.includes("password")){
            return(<View style={{...styles.inputView, ...styles.error}}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder={passwordWord + "..."}
                placeholderTextColor="#003f5c"
                onChangeText={text => setPassword(text)} />
            </View>)
          } else {
            return(<View style={{...styles.inputView}}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder={passwordWord + "..."}
                placeholderTextColor="#003f5c"
                onChangeText={text => setPassword(text)} />
            </View>)
          }
        })()
      }

      <View style={{width:"80%", marginBottom: 10}}>
          {(()=>{
            let arr = [];
            if(error.includes("phone")){
              arr.push(<Text style={{fontSize:12, color:"#cc0000", marginBottom:5}}><Text style={{fontWeight:"bold"}}>{phoneNumberWord}</Text>{phoneError}</Text>);
            }
            if(error.includes("password")){
              arr.push(<Text style={{fontSize:12, color:"#cc0000"}}>{passwordError}<Text style={{fontWeight:"bold"}}>{passwordWord}!</Text></Text>);
            }
            return arr;
          })()}
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
});