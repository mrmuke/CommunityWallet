import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ActivityIndicator } from 'react-native';
import { Button, CheckIcon, Select } from 'native-base';
import axios from 'axios';
import API_URL from '../../API_URL';
import { showMessage } from 'react-native-flash-message';

import { TabRouter } from '@react-navigation/routers';
import { useIsFocused } from '@react-navigation/native';

// LANGUAGE LOCALIZATION
import tokens from '../../i18n/tokens';
import { useTranslation } from 'react-i18next';

const { success_W, goHome_P, clear_W, cancel_W, cameraPermission_P, sending_W, tokensTo_P, confirm_W, who_P, next_W, or_W, scan_W,found_P,unknown_P } = tokens.screens.wallet.send
const { chooseToken_P } = tokens.common

export default function Send({ navigation, route }) {
  const {t} =useTranslation()
  const successWord = t(success_W)
const goHomePhrase = t(goHome_P)
const clearWord = t(clear_W)
const cancelWord = t(cancel_W)
const cameraPermissionPhrase = t(cameraPermission_P)
const sendingWord = t(sending_W)
const tokensToPhrase = t(tokensTo_P)
const confirmWord = t(confirm_W)
const whoPhrase = t(who_P)
const nextWord = t(next_W)
const orWord = t(or_W)
const scanWord = t(scan_W)
  const [page, setPage] = useState(0);
  const [amount, setAmount] = useState("0");
  const [rcpAddress, setRcpAddress] = useState("")
  const [contractAddress,setContractAddress]=useState("")
  const [loading, setLoading] = useState(true)
  const isFocused = useIsFocused();
  const [tokens,setTokens]=useState(null)
  
  useEffect(()=>{
    if(route.params&&route.params.rcpAddress){
      setLoading(false)
      setPage(2)
      setRcpAddress(route.params.rcpAddress);
      setContractAddress(route.params.contractAddress)
    }else{
      axios.get(API_URL + "/community/tokens").then(res=>{
        setContractAddress(Object.keys(res.data)[0])
        setTokens(res.data)
        setLoading(false)
      })
    }
  }, [isFocused]);

  function sendTokens() {
    setLoading(true)
    axios.post(API_URL + "/user/send", {
      recipientAddress: rcpAddress,
      transferAmount: amount,
      contractAddress: contractAddress

    }).then(res => {
      setContractAddress(null)
      setLoading(false)
      setPage(4)
    })
  }

  const Success = () => {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize:30}}>{successWord}</Text>
      <View style={{borderRadius:100, backgroundColor:"lightgreen",marginVertical:50}}><Icon name="check" style={{color:"white"}}  size={100}/></View>
      <Button style={{marginTop:10,}} paddingTop={30} paddingBottom={30} paddingLeft={75}  paddingRight={75} backgroundColor="orange" onPress={() => {setPage(0);setRcpAddress("");setAmount("0");
      if(route.params&&route.params.rcpAddress){
          navigation.navigate("Admin Home")
        } else {
          navigation.navigate("Home")
        }}}>{goHomePhrase}</Button>
    </View>
  }

  const Calculator = () => {
    return (
      <View>
        <View style={styles.numberDisplayContainer}>
          <Text style={{ fontSize: Dimensions.get("screen").height * 0.07,/*  fontFamily:"sans-serif-light" */ }}>{amount}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumberBack} onPress={() => {
              setPage(0);
              if(route.params&&route.params.rcpAddress){
                navigation.navigate("Admin Home")
              } 
            }}>
              <Icon name="keyboard-backspace" style={styles.sendIcon}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumberLong} onPress={
              () => {
                setAmount("0");
              }
            }>
              <Text style={styles.inputRowNumberText}>{clearWord}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("7");
                } else {
                  setAmount(amount + "7");
                }
              }}>
              <Text style={styles.inputRowNumberText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("8");
                } else {
                  setAmount(amount + "8");
                }
              }}>
              <Text style={styles.inputRowNumberText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("9");
                } else {
                  setAmount(amount + "9");
                }
              }}>
              <Text style={styles.inputRowNumberText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount.length == 1) {
                  setAmount("0");
                } else {
                  setAmount(amount.substring(0, amount.length - 1));
                }
              }
            }>
              <Icon name="backspace-outline" style={styles.inputRowNumberText}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("4");
                } else {
                  setAmount(amount + "4");
                }
              }}>
              <Text style={styles.inputRowNumberText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("5");
                } else {
                  setAmount(amount + "5");
                }
              }}>
              <Text style={styles.inputRowNumberText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("6");
                } else {
                  setAmount(amount + "6");
                }
              }}>
              <Text style={styles.inputRowNumberText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity  onPress={
                () => {
                  if (amount == "0") {
                    setAmount("1");
                  } else {
                    setAmount(amount + "1");
                  }
                }} style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("2");
                } else {
                  setAmount(amount + "2");
                }
              }}>
              <Text style={styles.inputRowNumberText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount == "0") {
                  setAmount("3");
                } else {
                  setAmount(amount + "3");
                }
              }}>
              <Text style={styles.inputRowNumberText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber} onPress={
              () => {
                if (amount.indexOf(".") != "-1") {
                  return;
                }
                if (amount == "0") {
                  setAmount(".");
                } else {
                  setAmount(amount + ".");
                }
              }}>
              <Text style={styles.inputRowNumberText}>.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber}
            onPress={
              () => {
                if (amount !== "0") {
                  
                  setAmount(amount + "0");
                }
              }}>
              <Text style={styles.inputRowNumberText}
              
              >0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setPage(3) }} style={styles.inputRowNumberSend}>
              <Text style={styles.inputRowNumberText}><Icon name="send" style={styles.sendIcon}></Icon></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  function Scan({ cancel }) {
    const [hasPermission, setHasPermission] = useState(null);
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {

      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      setRcpAddress(data)
      setPage(2)
    };
    return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {hasPermission == null ? <ActivityIndicator />
        :
        (
          hasPermission == false ?
            <Text>{cameraPermissionPhrase}</Text>
            : <>
              <View style={{ borderWidth: 3, borderColor: "orange", width: "85%", height: "75%", }}>
                <BarCodeScanner
                  onBarCodeScanned={handleBarCodeScanned}
                  style={{ height: "100%", width: "100%" }} />
              </View><TouchableOpacity onPress={cancel} style={{ width: "85%", flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: "orange", borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}><Icon color="white" name="cancel" style={{ marginRight: 10 }}></Icon><Text style={{ color: "white", }}>{cancelWord}</Text></TouchableOpacity></>)
      }</View>
  }
  const Confirm = () => {

    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', marginBottom: 20 }}>{sendingWord} <Text style={{ fontWeight: "bold" }}>{amount}</Text> {tokensToPhrase} <Text style={{ fontWeight: "bold" }}>{rcpAddress.substr(0, 30)}...</Text></Text>
      <Button onPress={sendTokens} backgroundColor="orange">{confirmWord}</Button>
    </View>
  }
  function Loader() {
    return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <ActivityIndicator />
    </View>
  }
  const AskNumber = () => {
    const [scanning, setScanning] = useState(false)
    const [phoneNumber,setPhoneNumber]=useState("")

    function checkNumber(){
      setLoading(true)
      axios.get(API_URL + "/user/public?phoneNumber="+phoneNumber).then(res => {
        setLoading(false)
        setPage(2)
        setRcpAddress(res.data.rcp)
        showMessage({message:t(found_P),type:"success"})
      }).catch(e=>{
        setLoading(false)
        showMessage({message:t(unknown_P),type:"danger"})
      })
    }
    if (scanning) {
      return <Scan cancel={() => setScanning(false)} />
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>{whoPhrase}</Text>
        <TextInput value={phoneNumber} placeholder="+1 773-584-2648" style={{ borderWidth: 3, borderRadius: 10, width: "83%", backgroundColor: "white", marginTop: 30,padding:10}} onChangeText={text=>setPhoneNumber(text)} keyboardType="numeric"></TextInput>
        <TouchableOpacity style={{ width: "83%", backgroundColor: "#ec802e", height: Dimensions.get("screen").height * 0.055, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100, marginTop: 30 }} onPress={() => {
          checkNumber()
        }}><Text style={[styles.text], { color: "white" }}>{nextWord}</Text>
        </TouchableOpacity>
        <Text style={[styles.text], { marginTop: 10 }}>{orWord}</Text>
        <TouchableOpacity style={{ width: "83%", backgroundColor: "#ec802e", height: Dimensions.get("screen").height * 0.055, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100, marginTop: 10 }} onPress={() => {
          setScanning(true);
        }}><Text style={[styles.text], { color: "white" }}>{scanWord}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  if (loading) {
    return <Loader />
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => {
          setPage(0);
            if(route.params&&route.params.rcpAddress){
              navigation.navigate("Admin Home")
            } else {
              navigation.navigate("Home")
            }
        }}>
          <Image style={styles.logo} source={require("./../../assets/logo.png")}></Image>
        </TouchableOpacity>
      </View>
      {(function () {
        if(page==0&&tokens){
          return <View style={{flex:1,justifyContent:'center',padding:10}}><Select
          selectedValue={contractAddress}
          marginBottom={3}
          accessibilityLabel={t(chooseToken_P)}
          placeholder={t(chooseToken_P)}
          placeholderTextColor='black'
          color="black"
          _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => {setContractAddress(itemValue);}}
      >
          {tokens&&Object.keys(tokens).map(c=>(
              <Select.Item key={c} label={tokens[c]} value={c}/>
          ))}
         
      </Select><Button onPress={()=>setPage(1)} backgroundColor="orange">{nextWord}</Button></View>
        }
        else if (page ==1) {
          return (
            <AskNumber></AskNumber>
          )
        } else if (page == 2) {
          return (
            <Calculator></Calculator>
          )
        } else if (page == 3) {
          return <Confirm></Confirm>
        }
        else {
          return <Success></Success>
        }

      })()}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fafafa"
  },
  logoContainer: {
    height: Dimensions.get("screen").height * 0.15,
    paddingLeft: Dimensions.get("screen").width * 0.08,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  logo: {
    height: Dimensions.get("screen").width * 0.15,
    width: Dimensions.get("screen").width * 0.15,
    resizeMode: "contain",
  },
  logoText: {
    width: Dimensions.get("screen").width * 0.73,
    paddingRight: Dimensions.get("screen").width * 0.08,
    height: Dimensions.get("screen").width * 0.15,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  numberDisplayContainer: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.15,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: Dimensions.get("screen").width * 0.08
  },
  inputContainer: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.64,
  },
  inputRow: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: Dimensions.get("screen").width * 0.02,
    paddingLeft: Dimensions.get("screen").width * 0.02,
  },
  inputRowNumber: {
    width: "23%",
    height: "80%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRowNumberLong: {
    width: "48.5%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRowNumberSend: {
    width: "74%",
    height: "80%",
    backgroundColor: "#ec802e",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRowNumberBack: {
    width: "48.5%",
    height: "80%",
    backgroundColor: "#ec802e",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  inputRowNumberText: {
    fontSize: Dimensions.get("screen").width * 0.055,
    color: "#8a8b8f"
  },
  sendIcon: {
    fontSize: Dimensions.get("screen").width * 0.08,
    color: "white"
  },
  mainContainer: {
    height: Dimensions.get("screen").height * 0.65,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: Dimensions.get("screen").height * 0.03
  }
});