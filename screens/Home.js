import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function App({navigation}){
  return(
    <View style={styles.container}>
      <View style={{width:"100%", height:"16%", flexDirection:"row"}}>
        <View style={{width:"50%", height:"100%", padding:"8%", paddingTop:"15%"}}>
          <TouchableOpacity style={{width:40, height:40, alignItems:"center", justifyContent:"center"}} onPress={
            ()=>{
              navigation.openDrawer();
            }
          }>
            <Icon name="list" style={{fontSize:40}}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{width:"50%", height:"100%", alignItems:"center", paddingTop:"6%", justifyContent:"flex-end", flexDirection:"row"}}>
          <TouchableOpacity style={{marginRight:10}}>
            <Text style={{fontSize:24, fontWeight:"bold", color:"#e31c1c", letterSpacing:3}}>5!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:"50%", height:"50%", borderRadius:500, borderColor:"#eb6060", borderWidth:3, alignItems:"center", justifyContent:"center", marginRight:25, flexDirection:"row"}}>
            <Text style={{fontSize:16}}>500</Text>
            <Text style={{fontSize:16, fontWeight:"bold", color:"#eb6060", marginLeft:5}}>B</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width:"100%", height:"44%"}}>
      </View>
      <View style={{width:"100%", height:"40%", justifyContent:"center", alignItems:"center", flexDirection:"row"}}>
        <TouchableOpacity style={{height: Dimensions.get("screen").width * 0.37, width: Dimensions.get("screen").width * 0.37, justifyContent:"center", alignItems:"center", backgroundColor:"#f9d2d2", borderRadius:2000, borderWidth:5, position:'absolute', top:"-10%"}}
          onPress={
            ()=>{
              navigation.navigate("Wallet");
            }
          }
        >
          <Icon name="account-balance-wallet" style={{fontSize:50}}></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={{height: Dimensions.get("screen").width * 0.37, width: Dimensions.get("screen").width * 0.37, justifyContent:"center", alignItems:"center", backgroundColor:"#e9ecfb", borderRadius:2000, borderWidth:5, position:'absolute', top:"35%", left:"10%"}}>
          <Icon name="shopping-cart" style={{fontSize:50}}></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={{height: Dimensions.get("screen").width * 0.37, width: Dimensions.get("screen").width * 0.37, justifyContent:"center", alignItems:"center", backgroundColor:"#f0f0f5", borderRadius:2000, borderWidth:5, position:'absolute', top:"35%", left:"53%"}}>
          <Icon name="cleaning-services" style={{fontSize:50}}></Icon>
        </TouchableOpacity>
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
  }
});