import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

var orange = "#ec802e";

export default function CreateServices({navigation, route}){
  return(
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={()=>{
          if(route.params.previous){
            navigation.navigate(route.params.previous);
          } else {
            navigation.navigate("Home");
          }
        }}>
          <Icon name="arrow-back-ios" style={styles.logo}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Create Services</Text>
      </View>
      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>MAIN INFO</Text>
          <View style={styles.formContent}>
            <View style={{flexDirection:"row"}}>
              <Icon name="drive-file-rename-outline" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput placeholder="Name of Service"></TextInput>
            </View>
            <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
              <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <Icon name="person" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput placeholder="Source: Company or Person"></TextInput>
            </View> 
            <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
              <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <Icon name="attach-money" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput placeholder="Price"></TextInput>
            </View> 
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>DESCRIPTION</Text>
          <View style={styles.formContent}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon name="description" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 7}}></Icon>
              <TextInput placeholder="Describe your service" multiline={true} style={{width:Dimensions.get("screen").width * 0.65, height:Dimensions.get("screen").height*0.1}}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>PHOTO</Text>
          <TouchableOpacity style={styles.formContent}>
            <View style={{flexDirection:"row", justifyContent :"center", alignItems:"center"}}>
              <Icon name="drive-file-rename-outline" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <Text style={{color:"#999"}}>INSERT AN IMAGE HERE!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:Dimensions.get("screen").height * 0.07,}}></View>
      </ScrollView>
      <TouchableOpacity style={styles.CreateContainer}>
        <Text style={styles.CreateText}>CREATE</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor:"white"
  },
  logoContainer:{
    height:Dimensions.get("screen").height * 0.15,
    paddingLeft:Dimensions.get("screen").width * 0.08,
    paddingRight:Dimensions.get("screen").width * 0.08,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  logo:{
    fontSize:Dimensions.get("screen").width * 0.08
  },
  logoText:{
    width:Dimensions.get("screen").width * 0.73,
    paddingRight:Dimensions.get("screen").width * 0.08,
    height:Dimensions.get("screen").width * 0.15,
    alignItems:"flex-end",
    justifyContent:"center",
  },
  headingContainer:{
    height:Dimensions.get("screen").height * 0.04,
    paddingLeft:Dimensions.get("screen").width * 0.08,
    paddingRight:Dimensions.get("screen").width * 0.08,
    alignItems:"center",
  },
  headingText:{
    color:orange,
    fontSize:Dimensions.get("screen").height * 0.027,
    fontWeight:"bold",
    bottom:Dimensions.get("screen").height*0.03
  },
  CreateContainer:{
    backgroundColor:orange,
    width:"100%",
    height:Dimensions.get("screen").height * 0.07,
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    bottom:0
  },
  CreateText:{
    color:"white",
    letterSpacing:2,
    fontSize:Dimensions.get("screen").height * 0.02
  },
  formContainer:{
    paddingLeft:Dimensions.get("screen").width * 0.08,
    paddingRight:Dimensions.get("screen").width * 0.08,
    marginTop: 30,
    bottom:30
  },
  formHeader:{
    color:orange,
    fontSize:Dimensions.get("screen").height * 0.022,
  },
  formContent:{
    borderWidth:1,
    borderColor:"#d2d2d2",
    marginTop:15,
    padding:10,
  }
});