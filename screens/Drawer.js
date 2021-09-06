import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'
import Wallet from './Wallet'

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}){

    return (
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Wallet" component={Wallet}/>
      </Drawer.Navigator>
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