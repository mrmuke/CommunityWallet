import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../API_URL';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native';
import { width } from 'styled-system';

var w = Dimensions.get("screen").width;

// LANGUAGE LOCALIZATION
import tokens from '../../i18n/tokens';
import { useTranslation } from 'react-i18next';

const { all_W } = tokens.screens.wallet.services


export default function Services({ navigation }) {
  const {t}=useTranslation()
  const allWord = t(all_W)
  const [arrayItems, setArrayItems] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  async function getServices() {
    setLoading(true);
    axios.get(api + '/services/allServices').then(response => {
      setLoading(false);
      setArrayItems(response.data)//decrypt mnemonic with sent password
    }).catch(e => { })
  }

  async function searchServices(){
    if(searchText == ""){
      return;
    }
    setLoading(true);
    axios({
      method: "get",
      url: api + "/services/searchServices",
      params:{
        searchText:searchText
      }
    }).then((response)=>{
      setLoading(false);
      setSearchState(true);
      setArrayItems(response.data);
    }).catch(e=>{
      console.log(e);
    });
  }

  async function searchCategory(category){
    setLoading(true);
    axios({
      method: "get",
      url: api + "/services/category",
      params:{
        category:category
      }
    }).then((response)=>{
      setLoading(false);
      setArrayItems(response.data);
    }).catch(e=>{
      console.log(e);
    });
  }

  useEffect(()=>{
    if(isFocused){
      getServices();
    }
  },[isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Home")
        }}>
          <Icon name="arrow-back-ios" style={styles.logo}></Icon>
        </TouchableOpacity>
        <View style={{flexDirection:"row",marginRight:20}}>
          {
            (()=>{
              if(searching){
                return(
                  <TextInput defaultValue={searchText} placeholder="" onChangeText={(text)=>{setSearchText(text)}} style={styles.searchBar}></TextInput>
                )
              } else {
                
                  return <View style={{justifyContent:"center",flex:1,marginLeft:20}}><Text>{searchText}</Text></View>
                
              }
            })()
          }
          { (()=>{if(searchState && !searching) return(<TouchableOpacity style={{backgroundColor:"black", borderRadius: 100, padding: 5, marginRight:10}} onPress={()=>{
            getServices();
            setSearchText("");
            setSearchState(false);
          }}>
            <Icon name="loop" style={{fontSize:Dimensions.get("screen").width * 0.08, color:"#ec802e"}}></Icon>
          </TouchableOpacity>)})()}

          <TouchableOpacity style={{backgroundColor:"#ec802e", borderRadius: 100, padding: 5, marginRight:10}} onPress={()=>{
            if(searching){
              searchServices();
            } else {
              setSearchText("");
            }
            setSearching(!searching);
          }}>
            <Icon name="search" style={{fontSize:Dimensions.get("screen").width * 0.08, color:"white"}}></Icon>
          </TouchableOpacity>
          {
            (()=>{
              if(!searching){
                return(
                  <TouchableOpacity style={{backgroundColor:"black", borderRadius: 100, padding: 5}} onPress={()=>{
                    navigation.navigate("Create", {
                      previous:"Services"
                    })
                  }}>
                    <Icon name="add" style={{fontSize:Dimensions.get("screen").width * 0.08, color:"#ec802e"}}></Icon>
                  </TouchableOpacity>
                )
              }
            })()
          }
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity><Text style={styles.menuTextSelected} onPress={()=>{
          getServices();
        }}>{allWord}</Text></TouchableOpacity>
        <TouchableOpacity  onPress={
          ()=>{
            searchCategory("House");
          }
        }><Text style={styles.menuText}>House</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Gears</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Candles</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.menuText}>Groceries</Text></TouchableOpacity>
      </View>

                  {loading?
                    <View style={{alignItems:'center',marginTop:20}}><ActivityIndicator size="large"/></View>:
      <ScrollView>
        {
          (function () {
            var row = Math.ceil(arrayItems.length / 2);
            var rowArray = [];
            for (var i = 0; i < row; i++) {
              if (arrayItems.length % 2 == 1 && i == row - 1) {
                rowArray.push(
                  <View key={i} style={{ flexDirection: "row" }}>
                    <View style={styles.shopItem}>
                      <Image source={{ uri: "https://community-wallet-service-image.s3.eu-west-1.amazonaws.com/" + arrayItems[i * 2]["filename"] }} style={styles.shopItemImage}></Image>
                      <Text style={styles.shopItemTitle}>{arrayItems[i * 2].name}</Text>
                      <Text style={styles.shopItemSubTitle}>{arrayItems[i * 2].description}</Text>
                      <Text style={styles.shopItemPrice}>$ {arrayItems[i * 2].cost}</Text>
                    </View>
                  </View>
                )
              } else {
                rowArray.push(
                  <View key={i} style={{ flexDirection: "row" }}>
                    <View style={styles.shopItem}>
                      <Image source={{ uri: "https://community-wallet-service-image.s3.eu-west-1.amazonaws.com/" + arrayItems[i * 2]["filename"] }} style={styles.shopItemImage}></Image>
                      <Text style={styles.shopItemTitle}>{arrayItems[i * 2].name}</Text>
                      <Text style={styles.shopItemSubTitle}>{arrayItems[i * 2].description}</Text>
                      <Text style={styles.shopItemPrice}>$ {arrayItems[i * 2].cost}</Text>
                    </View>
                    <View style={styles.shopItem}>
                      <Image source={{ uri: "https://community-wallet-service-image.s3.eu-west-1.amazonaws.com/" + arrayItems[i * 2 + 1]["filename"] }} style={styles.shopItemImage}></Image>
                      <Text style={styles.shopItemTitle}>{arrayItems[i * 2 + 1]["name"]}</Text>
                      <Text style={styles.shopItemSubTitle}>{arrayItems[i * 2 + 1].description}</Text>
                      <Text style={styles.shopItemPrice}>$ {arrayItems[i * 2 + 1].cost}</Text>
                    </View>
                  </View>
                )
              }
            }
            return rowArray
          })()
        }
      </ScrollView>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  },
  logoContainer: {
    height: Dimensions.get("screen").height * 0.15,
    paddingLeft: Dimensions.get("screen").width * 0.08,
    paddingRight: Dimensions.get("screen").width * 0.08,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: Dimensions.get("screen").width * 0.08
  },
  logoText: {
    width: Dimensions.get("screen").width * 0.73,
    paddingRight: Dimensions.get("screen").width * 0.08,
    height: Dimensions.get("screen").width * 0.15,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  menuContainer: {
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.10,
  },
  menuText: {
    fontSize: Dimensions.get("screen").height * 0.016,
    marginLeft: 15,
    marginRight: 15,
    color: "#737373",
    top: Dimensions.get("screen").height * (0.023 - 0.016)
  },
  menuTextSelected: {
    fontSize: Dimensions.get("screen").height * 0.023,
    color: "black",
    marginLeft: 15,
    marginRight: 15,
  },
  shopItem: {
    width: "50%",
    marginBottom: 20

  },
  shopItemImage: {
    width: Dimensions.get("screen").width * 0.45,
    height: Dimensions.get("screen").width * 0.55,
    resizeMode: "cover",
    marginLeft: Dimensions.get("screen").width * 0.025,
    borderRadius: 10
  },
  shopItemTitle: {
    marginLeft: Dimensions.get("screen").width * 0.025,
    fontSize: Dimensions.get("screen").height * 0.023,
    color: "black",
    fontWeight: "bold",
  },
  shopItemSubTitle: {
    marginLeft: Dimensions.get("screen").width * 0.025,
    fontSize: Dimensions.get("screen").height * 0.012,
    color: "#404040",
    overflow: "hidden"
  },
  shopItemPrice:{
    marginLeft:Dimensions.get("screen").width * 0.025,
    fontSize:Dimensions.get("screen").height * 0.023,
    color:"#ec802e",
    fontWeight:"bold",
  },
  searchBar:{
    borderWidth:2,
    borderRadius:30,
    width:w*0.55,
    marginRight:20,
    paddingLeft:20
  }
});