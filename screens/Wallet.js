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
      </View>
      <View style={{width:"100%", height:"16%", paddingLeft:"8%"}}>
        <Text>Current Balance</Text>
        <Text style={{fontSize:50, marginTop:10}}>508 Bao</Text>
      </View>
      <View style={{width:"100%", height:"68%", backgroundColor:"red", flexDirection:"row"}}>
        <View style={{width:"50%", height:"100%"}}>

          <View style={{width:"100%", height:"50%"}}>
            <View style={{...styles.box}}></View>
          </View>

          <View style={{width:"100%", height:"50%"}}>
            <View style={{...styles.box, marginLeft:"1.666%"}}></View>
          </View>

        </View>
        <View style={{width:"50%", height:"100%"}}>

          <View style={{width:"100%", height:"50%"}}>
            <View style={styles.box}></View>
          </View>

          <View style={{width:"100%", height:"50%"}}>
            <View style={styles.box}></View>
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
  box:{width:"95%", height:"95%", backgroundColor:"blue"}
});