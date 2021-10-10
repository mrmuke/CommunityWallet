import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ActivityIndicator } from 'react-native';

export default function Send({ navigation }) {
  const [page, setPage] = useState(0);

  const Calculator = () => {
    return (
      <View>
        <View style={styles.numberDisplayContainer}>
          <Text style={{ fontSize: Dimensions.get("screen").height * 0.07,/*  fontFamily:"sans-serif-light" */ }}>59800</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumberBack} onPress={() => {
              setPage(0);
            }}>
              <Icon name="keyboard-backspace" style={styles.sendIcon}></Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumberLong}>
              <Text style={styles.inputRowNumberText}>CLEAR</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Icon name="backspace-outline" style={styles.inputRowNumberText}></Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputRowNumber}>
              <Text style={styles.inputRowNumberText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputRowNumberSend}>
              <Text style={styles.inputRowNumberText}><Icon name="send" style={styles.sendIcon}></Icon></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  function Scan({cancel}){
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    const handleBarCodeScanned = ({ type, data }) => {
      
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      setPage(1)
    };
    return <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
<TouchableOpacity onPress={cancel} style={{flexDirection:'row',alignItems:'center',padding:10,backgroundColor:"orange",borderTopLeftRadius:10,borderTopRightRadius:10}}><Icon color="white" name="cancel" style={{marginRight:10}}></Icon><Text style={{color:"white",}}>Cancel</Text></TouchableOpacity>
    {hasPermission==null?<ActivityIndicator/>
    :
    (
    hasPermission==false?
      <Text>No camera permission</Text>
    :
    <View style={{borderWidth:3,borderColor:"orange",width:"85%",height:"70%",}}>
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
style={{height:"100%",width:"100%"}}    /></View>)
    }</View>
  }
  const AskNumber = () => {
    const [scanning,setScanning]=useState(false)
    
    
    if(scanning){
      return <Scan cancel={()=>setScanning(false)}/>
    }
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Who do you want to send this to?</Text>
        <TextInput placeholder="+1 773-584-2648" style={{ borderWidth: 3, borderRadius: 10, width: "83%", height: Dimensions.get("screen").height * 0.04, backgroundColor: "white", marginTop: 30, padding:20 }} keyboardType="numeric"></TextInput>

        <TouchableOpacity style={{ width: "83%", backgroundColor: "#ec802e", height: Dimensions.get("screen").height * 0.055, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100, marginTop: 30 }} onPress={() => {
          setPage(1);
        }}><Text style={[styles.text], { color: "white" }}>Next</Text>
        </TouchableOpacity>
        <Text style={[styles.text], { marginTop: 10 }}>OR</Text>
        <TouchableOpacity style={{ width: "83%", backgroundColor: "#ec802e", height: Dimensions.get("screen").height * 0.055, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopRightRadius: 100, borderBottomRightRadius: 100, marginTop: 10 }} onPress={() => {
          setScanning(true);
        }}><Text style={[styles.text], { color: "white" }}>Scan</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => {
          setPage(0);
          navigation.navigate("Home")
        }}>
          <Image style={styles.logo} source={require("./../../assets/logo.png")}></Image>
        </TouchableOpacity>
      </View>
      {(function () {
        if (page == 0) {
          return (
            <AskNumber></AskNumber>
          )
        } else {
          return (
            <Calculator></Calculator>
          )
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