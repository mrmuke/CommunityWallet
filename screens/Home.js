import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

export default function Home({navigation}){
  return(
    <View style={{height:"100%", width:"100%", backgroundColor:"white"}}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("./../assets/logo.png")}></Image>
        <View style={styles.logoText}>
          <TouchableOpacity style={{width:Dimensions.get("screen").width * 0.15, height:Dimensions.get("screen").width * 0.15, backgroundColor:"black", borderRadius:100, justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:"white", fontSize:20}}>T</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeMain}>Hi!</Text>
        <Text style={styles.welcomeText}>Welcome back to BAO.</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentHeaderText}>Your <Text style={{fontWeight:"bold"}}>Wallet</Text></Text>
        </View>
        <View style={styles.contentWallet}>
          <View style={{height:"48%", width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity style={{width:"48%", height:"100%", backgroundColor:"#f68b69", borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={()=>{
              navigation.navigate("Send")
            }}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%", right:"5%"}} source={require("./../assets/send-mail.png")}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:"48%", height:"100%", backgroundColor:"#ffe293", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%"}} source={require("./../assets/history.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height:"48%", width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Wallet')} style={{width:"48%", height:"100%", backgroundColor:"#aec6cc", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%"}} source={require("./../assets/wallet.png")}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  style={{width:"48%", height:"100%", backgroundColor:"#ced75c", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%"}} source={require("./../assets/unknown.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentHeader}>
          <Text style={styles.contentHeaderText}>Your <Text style={{fontWeight:"bold"}}>Community</Text></Text>
        </View>
        <View style={styles.contentCommunity}>
          <View style={{height:"96%", width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
            <TouchableOpacity style={{width:"48%", height:"100%", backgroundColor:"#ffb6ad", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%"}} source={require("./../assets/shop.png")}></Image>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width:"48%", height:"100%", backgroundColor:"#ccc1db", borderRadius:10, justifyContent:"center", alignItems:"center"}}>
              <View style={{width:"50%", aspectRatio:1, backgroundColor:"white", borderRadius:200, justifyContent:"center", alignItems:"center"}}>
                <Image style={{width:"50%", height:"50%"}} source={require("./../assets/service.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer:{
    height:Dimensions.get("screen").height * 0.15,
    paddingLeft:Dimensions.get("screen").width * 0.08,
    flexDirection:"row",
    alignItems:"flex-end",
  },
  logo:{
    height:Dimensions.get("screen").width * 0.15,
    width:Dimensions.get("screen").width * 0.15,
    resizeMode:"contain",
  },
  logoText:{
    width:Dimensions.get("screen").width * 0.73,
    paddingRight:Dimensions.get("screen").width * 0.08,
    height:Dimensions.get("screen").width * 0.15,
    alignItems:"flex-end",
    justifyContent:"center",
  },
  welcomeContainer:{
    height:Dimensions.get("screen").height * 0.15,
    width:"100%",
    paddingTop:Dimensions.get("screen").height * 0.03,
    paddingLeft: Dimensions.get("screen").width * 0.08,
    justifyContent:"center"
  },
  welcomeMain:{
    fontWeight:"bold",
    fontSize: Dimensions.get("screen").height * 0.03,
  },
  welcomeText:{
    fontSize: Dimensions.get("screen").height * 0.018,
    paddingTop:5
  },
  contentContainer:{
    height:Dimensions.get("screen").height * 0.70,
    width:"100%",
    paddingLeft: Dimensions.get("screen").width * 0.08,
    paddingRight: Dimensions.get("screen").width * 0.08,
  },
  contentHeader:{
    height:Dimensions.get("screen").height * 0.07,
    paddingBottom:Dimensions.get("screen").height * 0.008,
    justifyContent:"flex-end"
  },
  contentHeaderText:{
    fontSize:Dimensions.get("screen").height * 0.025,
  },
  contentWallet:{
    height:Dimensions.get("screen").height * 0.32,
    justifyContent:"space-between"
  },
  contentCommunity:{
    height:Dimensions.get("screen").height * 0.16,
  }
});