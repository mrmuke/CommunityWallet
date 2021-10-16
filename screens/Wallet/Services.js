import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Services({navigation}){
  return(
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={()=>{
          navigation.navigate("Home")
        }}>
          <Icon name="arrow-back-ios" style={styles.logo}></Icon>
        </TouchableOpacity>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{backgroundColor:"#ec802e", borderRadius: 100, padding: 5, marginRight:10}}>
            <Icon name="search" style={{fontSize:Dimensions.get("screen").width * 0.08, color:"white"}}></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:"black", borderRadius: 100, padding: 5}} onPress={()=>{
            navigation.navigate("Create", {
              previous:"Services"
            })
          }}>
            <Icon name="add" style={{fontSize:Dimensions.get("screen").width * 0.08, color:"#ec802e"}}></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity><Text style={styles.menuTextSelected}>All</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Haircuts</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Gears</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Candles</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Groceries</Text></TouchableOpacity>
      </View>
      <ScrollView style={{}}>
        <View style={{flexDirection:"row"}}>
          <View style={styles.shopItem}>
            <Image source={require("./../../assets/cleaning.jpeg")} style={styles.shopItemImage}></Image>
            <Text style={styles.shopItemTitle}>Cleaning</Text>
            <Text style={styles.shopItemSubTitle}>224-605-8803</Text>
            <Text style={styles.shopItemPrice}>$ 159</Text>
          </View>
          <View style={styles.shopItem}>
            <Image source={require("./../../assets/plumbing.jpeg")} style={styles.shopItemImage}></Image>
            <Text style={styles.shopItemTitle}>Plumbing</Text>
            <Text style={styles.shopItemSubTitle}>224-883-1234</Text>
            <Text style={styles.shopItemPrice}>$ 159</Text>
          </View>
        </View>
        <View style={{flexDirection:"row"}}>
          <View style={styles.shopItem}>
            <Image source={require("./../../assets/laundry.jpg")} style={styles.shopItemImage}></Image>
            <Text style={styles.shopItemTitle}>Laundry</Text>
            <Text style={styles.shopItemSubTitle}>999-666-4444</Text>
            <Text style={styles.shopItemPrice}>$ 159</Text>
          </View>
          <View style={styles.shopItem}>
            <Image source={require("./../../assets/haircut.jpg")} style={styles.shopItemImage}></Image>
            <Text style={styles.shopItemTitle}>Hot Haircut</Text>
            <Text style={styles.shopItemSubTitle}>David Splenderman</Text>
            <Text style={styles.shopItemPrice}>$ 159</Text>
          </View>
        </View>
      </ScrollView>
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
  menuContainer:{
    flexDirection:"row",
    height:Dimensions.get("screen").height * 0.10,
  },
  menuText:{
    fontSize:Dimensions.get("screen").height * 0.016,
    marginLeft: 15,
    marginRight: 15,
    color:"#737373",
    top: Dimensions.get("screen").height * (0.023 - 0.016)
  },
  menuTextSelected:{
    fontSize:Dimensions.get("screen").height * 0.023,
    color:"black",
    marginLeft: 15,
    marginRight: 15,
  },
  shopItem:{
    width:"50%",
    marginBottom: 20

  },
  shopItemImage:{
    width:Dimensions.get("screen").width * 0.45,
    height:Dimensions.get("screen").width * 0.55,
    resizeMode:"cover",
    marginLeft:Dimensions.get("screen").width * 0.025,
    borderRadius:10
  },
  shopItemTitle:{
    marginLeft:Dimensions.get("screen").width * 0.025,
    fontSize:Dimensions.get("screen").height * 0.023,
    color:"black",
    fontWeight:"bold",
  },
  shopItemSubTitle:{
    marginLeft:Dimensions.get("screen").width * 0.025,
    fontSize:Dimensions.get("screen").height * 0.012,
    color:"#404040",
  },
  shopItemPrice:{
    marginLeft:Dimensions.get("screen").width * 0.025,
    marginLeft:Dimensions.get("screen").width * 0.025,
    fontSize:Dimensions.get("screen").height * 0.023,
    color:"#ec802e",
    fontWeight:"bold",
  }
});