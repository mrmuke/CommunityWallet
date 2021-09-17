import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
/* import { Bip39,Random } from '@cosmjs/crypto' */
import { Checkbox } from 'native-base';
import axios from 'axios';

export default function Signup({navigation}){
  const [phoneNumber,setPhoneNumber]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [code,setCode]=useState("")
  const [verificationCode,setVerificationCode]=useState("")
  const [verifyCode, setVerifyCode]=useState("")
  const [verifying, setVerifying]=useState(false);
  const [error, setError]=useState("")
  async function register(){
/*     console.log(Bip39.encode(Random.getBytes(32)))
 */   
  var min = 123456
  var max = 999999
  var random = Math.floor(Math.random() * (max - min) + min);
  axios.post("https://rest.nexmo.com/sms/json",{"from":"18334641476","text":"Your verification code is "+random,"to":phoneNumber,"api_key":"e5444577","api_secret":"PcOaBXuHxxySxTe6"}).then(response=>{
    setVerifyCode(random)
    setVerifying(true)
  })
    //mongo set info
  }
  function checkVerify(){
    if(verifyCode==verificationCode){
      navigation.navigate('Dashboard')
    }
    else{
      setError("Wrong Verification Code..")
    }
  }
  
  if(verifying){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Sign Up</Text>
        <Text style={styles.verifaction}>A code has been sent to &nbsp;{phoneNumber}. {'\n'}Please insert it to continue</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Verification Code..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => {setVerificationCode(text);if(error.length>0){setError("")}}}
            value={verificationCode}/>
        </View>
        <TouchableOpacity onPress={
          ()=>{
            setVerifying(false);
          }
        }>
          <Text style={styles.forgot}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>checkVerify()} style={styles.loginBtn}>
          <Text style={styles.loginText}>VERIFY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Login");
        }}>
          <Text style={styles.signup}>Already have an account? Log in!</Text>
        </TouchableOpacity>
        {error.length>0&&<Text style={{backgroundColor:"#eb6060",padding:15,color:'white'}}>{error}</Text>}
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
            value={phoneNumber}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setPassword(text)}
            value={password}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Community Code..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => setCode(text)}
            value={code}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={
          ()=>{
            register()
          }
        }>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
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
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#eb6060",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#e9ecfb",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    color:"#eb6060",
    fontSize:11
  },
  signup:{
    color:"#eb6060",
    fontSize:12,
    top:-10,
    paddingTop:10,
    paddingBottom:10,
    marginTop:10
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#6474E5",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:23,
    marginBottom:0
  },
  loginText:{
    color:"white"
  },
  verifaction:{
    fontSize:14,
    color:"black",
    width:"100%",
    textAlign:"center",
    marginBottom:35
  }
});