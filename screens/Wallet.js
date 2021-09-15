import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgQRCode from 'react-native-qrcode-svg';

const Stack = createStackNavigator()
export default function WalletNavigator({navigation}){
  return <Stack.Navigator>
    <Stack.Screen name="Wallet" options={{headerShown:false}} component={props=><Wallet openDrawer={()=>navigation.openDrawer()} {...props}/>}/>
    <Stack.Screen name="Send" component={Send}/>
    <Stack.Screen name="Receive" component={Receive}/>
  </Stack.Navigator>
}

function Receive(){
  return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <SvgQRCode value="asdfmjkjioefjqiowefiojdiofj" />
  </View>
}
function Send(){

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
  
  
}
function Wallet({navigation,openDrawer}){
  return(
    <View style={styles.container}>
      <View style={{width:"100%", height:"16%", flexDirection:"row"}}>
        <View style={{width:"50%", height:"100%", padding:"8%", paddingTop:"15%"}}>
          <TouchableOpacity style={{width:40, height:40, alignItems:"center", justifyContent:"center"}} onPress={
            openDrawer
          }>
            <Icon name="list" style={{fontSize:40}}></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width:"100%", height:"12%", paddingLeft:"8%"}}>
        <Text>Current Balance</Text>
        <Text style={{fontSize:50, marginTop:3}}>508 Bao</Text>
      </View>
      <View style={{width:"100%", height:"72%", flexDirection:"row"}}>
        <View style={{width:"50%", height:"100%"}}>

          <View style={{width:"100%", height:"50%"}}>
            <View style={{width:"95%", height:"95%", backgroundColor:"#6474E5", marginLeft:"3.33333%", marginTop:"4.3333%", borderRadius:5, justifyContent:"center", alignItems:"center"}}>
              <Icon name="info" style={{fontSize:70}}></Icon>
              <Text style={{fontSize:18, marginTop: 10}}>Wallet Profile</Text>
            </View>
          </View>

          <View style={{width:"100%", height:"50%"}}>
            <View style={{width:"95%", height:"95%", backgroundColor:"#eb6060", marginLeft:"3.33333%", marginTop:"1.66666%", borderRadius:5, justifyContent:"center", alignItems:"center"}}>
              <Icon name="history" style={{fontSize:70}}></Icon>
              <Text style={{fontSize:18, marginTop: 10}}>Transaction History</Text>
            </View>
          </View>

        </View>

        <View style={{width:"50%", height:"100%"}}>

          <View style={{width:"100%", height:"50%"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Send')} style={{width:"95%", height:"95%", backgroundColor:"#eb6060", marginLeft:"1.6666%", marginTop:"4.3333%", borderRadius:5, justifyContent:"center", alignItems:"center"}}>
              <Icon name="send" style={{fontSize:70}}></Icon>
              <Text style={{fontSize:18, marginTop: 10}}>Send Tokens</Text>
            </TouchableOpacity>
          </View>

          <View style={{width:"100%", height:"50%"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Receive')} style={{width:"95%", height:"95%", backgroundColor:"#6474E5", marginLeft:"1.6666%", marginTop:"1.6666%", borderRadius:5, justifyContent:"center", alignItems:"center"}}>
              <Icon name="info" style={{fontSize:70}}></Icon>
              <Text style={{fontSize:18, marginTop: 10}}>Receive Tokens</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
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
});