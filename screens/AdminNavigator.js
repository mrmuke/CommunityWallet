import { StyleSheet, View, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart
} from 'expo-chart-kit'
import { Text } from 'react-native'
import { Dimensions } from 'react-native'
import { Box, Button, Heading, HStack, List, Progress, VStack, } from 'native-base'
import { ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import axios from 'axios'
import API_URL from '../API_URL';
import Members from './Admin/Members'
import Send from './Wallet/Send'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AuthContext from '../auth-context'
import { TextInput } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'

import { useTranslation } from 'react-i18next'
import tokens from '../i18n/tokens'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { analytics_W,tokens_W,members_W,economy_W,adminHome_P } = tokens.screens.adminNavigator
const {language_W} = tokens.tabs
const { amount_W,invalidName_P,transactions_W, progress_W, nameToken_P,statistics_W, invalidAmount_P,signOut_P, back_W, send_W, timeToken_W, burnToken_P, sendToken_P, createToken_P,mintToken_P } = tokens.screens.adminNavigator

const Stack = createStackNavigator();

export default function AdminNavigator() {
  const {t,i18n} = useTranslation()
  async function switchLanguage(){
    let cur =  await AsyncStorage.getItem('setLanguage')
    let newLang= cur=="en"?"cn":"en"
    console.log(newLang)
    await AsyncStorage.setItem('setLanguage',newLang)
    i18n.changeLanguage(newLang)
    setActive(t(analytics_W))
  }
  const [community, setCommunity] = useState(null)
  const [active, setActive] = useState(t(analytics_W))

  
  useEffect(() => {

    axios.get(API_URL + '/community/communityInfo').then(response => {
      setCommunity(response.data)
    }).catch(e => {

    })
  }, [])
  return <Stack.Navigator>
    <Stack.Screen name="Admin Home" options={{headerTitle:t(adminHome_P),headerRight:()=><TouchableOpacity onPress={switchLanguage} style={{marginRight:20}}><Text>{t(language_W)}</Text></TouchableOpacity>}} component={props=><AdminHome active={active} setActive={setActive} community={community} {...props}/>} />
    <Stack.Screen name="Send" component={Send} options={{ headerShown: false }} />
  </Stack.Navigator>
}
function AdminHome({ navigation,active,setActive,community }) {
  const {t} = useTranslation()
  const tabs = {
    [t(analytics_W)]: "analytics",
    [t(tokens_W)]: "logo-bitcoin",
    [t(members_W)]: "people",
    [t(economy_W)]: "stats-chart"
  }

  
  if (!community) {
    return <Loader />
  }

  return <View style={{flex:1}}><ScrollView contentContainerStyle={styles.container}>
    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingLeft: 25 }}>
      {Object.keys(tabs).map(c => (
        <Tab active={active == c} navigate={() => setActive(c)} key={c} name={c} image={tabs[c]} ></Tab>
      ))}</View>
    <Page community={community} name={active} navigation={navigation} />
  </ScrollView></View>
}

function Page({ name, community, navigation }) {
  const {t} = useTranslation()
  const transactionsWord = t(transactions_W)
  const progressWord = t(progress_W)
  const statisticsWord = t(statistics_W)
  const signOutPhrase = t(signOut_P)
  const backWord = t(back_W)
  const sendWord = t(send_W)
  const timeTokenWord = t(timeToken_W)
  const burnTokenPhrase = t(burnToken_P)
  const sendTokenPhrase = t(sendToken_P)
  const createTokenPhrase = t(createToken_P)
  const mintTokenPhrase = t(mintToken_P)
  
  const { authContext } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [tokens, setTokens] = useState({})
  const [showModal, setShowModal] = useState(null)
  const [members, setMembers] = useState([])
  const [communityMembers,setCommunityMembers]=useState([])
  const [showMembers, setShowMembers] = useState(false);
  const [contractAddress,setContractAddress]=useState("")
  const [creating,setCreating]=useState(false)
  const [amount,setAmount]=useState("")
  const [tokenName,setTokenName]=useState("")
  const [burning,setBurning]=useState(false)
  const [minting,setMinting]=useState(false)
  
  useEffect(() => {
    if (name == t(tokens_W)) {
      setLoading(true)
      axios.get(API_URL + '/user/wallet').then(response => {
        console.log(response.data.balances)
        setTokens(response.data.balances)
        setLoading(false)

      }).catch(e => {

      })
    }
    else if (name == t(members_W)) {
      setLoading(true)
      getCommunityMembers()
    }
  }, [name])

  function getMembers() {
    axios.get(API_URL + '/community/members').then(response => {
      setMembers(response.data)
      setLoading(false)
    }).catch(e => {

    })
  }
  function getCommunityMembers() {
    axios.get(API_URL + '/community/communityMembers').then(response => {
      setCommunityMembers(response.data)
      setLoading(false)
    }).catch(e => {

    })
  }
  function burnToken(){
    if(amount.length==0){
      showMessage({type:"info",message:t(invalidAmount_P)})
      return;
    }
    setLoading(true)
    axios.post(API_URL+"/community/burnToken",{contractAddress:showModal,amount:amount})
    .then(()=>{
      let prev = tokens[showModal]
      setTokens({...tokens,[showModal]:{...prev,balance:""+parseInt(prev["balance"])-parseInt(amount)}})
      setBurning(false)
      setAmount("")
      setLoading(false)
    })
  }
  function mintToken(){
    if(amount.length==0){
      showMessage({type:"info",message:t(invalidAmount_P)})
      return;
    }
    setLoading(true)
    axios.post(API_URL+"/community/mintMore",{contractAddress:showModal,amount:amount})
    .then(()=>{
      let prev = tokens[showModal]
      setTokens({...tokens,[showModal]:{...prev,balance:""+(parseInt(prev["balance"])+parseInt(amount))}})
      setMinting(false)
      setAmount("")
      setLoading(false)
    })
  }
  function createToken(){
    if(tokenName.length<=4){
      showMessage({type:"info",message:t(invalidName_P)})
      return;
    }
    if(amount.length==0){
      showMessage({type:"info",message:t(invalidAmount_P)})
      return;
    }
    
    setLoading(true)
    axios.post(API_URL+'/community/mintToken', { amount,tokenName }).then(response=>{
      setTokens({...tokens,[response.data]:{name:tokenName,balance:amount}})
      setCreating(false)
      setTokenName("")
      setAmount("")
      setLoading(false)
    })//change token names
  }

  if (loading) {
    return <Loader />
  }
  if (name == t(analytics_W)) {

    return <><Heading style={{ alignSelf: 'flex-start', marginLeft: 25, fontSize: 18 }}>{transactionsWord}</Heading>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            data: [
              3489, 3287, 2837, 3459
            ]
          }]
        }}
        width={Dimensions.get('window').width} // from react-native
        height={175}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => `orange`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
      <Box w="90%">
        <View style={{ backgroundColor: "#FFD580", padding: 10, borderRadius: 10, marginBottom: 10 }}>
          <Heading style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{progressWord}</Heading>
          <Progress colorScheme="warning" backgroundColor="#eee" size="md" mb={4} value={45} /></View></Box>
      <Heading style={{ fontSize: 18, alignSelf: 'flex-start', marginLeft: 25, marginBottom: 10 }}>{statisticsWord}</Heading>

      <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingLeft: 10, marginBottom: 25 }}>
        <Card title="Total Transactions" data={233}></Card>
        <Card title="Total Transactions" data={233}></Card>
        <Card title="Total Transactions" data={233}></Card>
      </View>
      <Button onPress={() => authContext.signOut()} backgroundColor="orange" width={"100%"} height={70} borderRadius={0}>{signOutPhrase}</Button>
    </>
  }
  else if (name == t(tokens_W)) {

    if(showMembers){
      return(
        <View style={{width:"100%"}}>
          <TouchableOpacity style={{borderRadius:5, padding: 20}} onPress={()=>{
            setShowMembers(false);
          }}>
            <Text>{backWord}</Text>
          </TouchableOpacity>
          {(function () {
            let arr = [];
            for(let member of members){
              arr.push(<View key={member.address} style={[{width:"100%", padding: 20, flexDirection:"row",borderTopWidth:1,borderTopColor:"lightgrey", borderBottomColor:'lightgrey'},member==members[members.length-1]&&{borderBottomWidth:1}]}>
                <View style={{width:"50%",justifyContent:'center'}}><Text style={{width:"100%", textAlign:"center", fontSize:25}}>{member.phoneNumber}</Text></View>
                <View style={{width:"50%"}}>
                  <TouchableOpacity style={{ backgroundColor:"#FFD580", padding: 10,flexDirection:'row',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate("Send", {
                      "rcpAddress": member.address,
                      "contractAddress":contractAddress
                    });
                  }}>
                    <Icon name="send" size={20}/>
                    <Text style={{marginLeft:10, textAlign:"center"}}>{sendWord}</Text>
                  </TouchableOpacity>
                </View>
              </View>)
            }
            return arr;
          })()}
        </View>
      )
    } else {
      if(creating){
        return (
          <View style={styles.formContainer}>
            <TouchableOpacity style={{marginTop:10,marginBottom:20}} onPress={()=>{setAmount("");setCreating(false)}}><Text>{backWord}</Text></TouchableOpacity>
            <Text style={styles.formHeader}>{createTokenPhrase}</Text>
            <View style={styles.formContent}>
              <View style={{flexDirection:"row"}}>
                <MaterialIcon name="drive-file-rename-outline" style={{color:"orange", fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></MaterialIcon>
                <TextInput placeholder={t(nameToken_P)} onChangeText={text=>setTokenName(text)} style={{width:"100%"}}></TextInput>
              </View>
              <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
                <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
              </View>
              <View style={{flexDirection:"row"}}>
                <MaterialIcon name="attach-money" style={{color:"orange", fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></MaterialIcon>
                <TextInput value={amount} keyboardType="number-pad" placeholder={t(amount_W)} onChangeText={text=>setAmount(text)}  style={{width:"100%"}}></TextInput>
              </View> 
              
              <Button onPress={()=>createToken()} backgroundColor="orange" marginTop={3}>{createTokenPhrase}</Button>
            </View>
          </View>
         
        )
          
          
      }
      else if(burning){
        return <View style={styles.formContainer}>
        <TouchableOpacity style={{marginTop:10,marginBottom:20}} onPress={()=>{setAmount("");setBurning(false)}}><Text>{backWord}</Text></TouchableOpacity>
        <TextInput value={amount} style={{ borderWidth:1,borderColor:"#ccc",borderRadius: 10, marginTop: 30,padding:10}} onChangeText={text=>{if(parseInt(text)<tokens[showModal].balance||text.length==0){setAmount(text)}else{showMessage({message:t(invalidAmount_P),type:"warning"})}}} placeholder={t(amount_W)} keyboardType='number-pad'/>
        <Button onPress={()=>burnToken()} backgroundColor="orange" marginTop={3}>{burnTokenPhrase}</Button>
       {/* add placeholder */}</View>
      }
      else if(minting){
        return <View style={styles.formContainer}>
        <TouchableOpacity style={{marginTop:10,marginBottom:20}} onPress={()=>{setAmount("");setMinting(false)}}><Text>{backWord}</Text></TouchableOpacity>
        <TextInput value={amount} style={{ borderWidth:1,borderColor:"#ccc",borderRadius: 10, marginTop: 30,padding:10}} onChangeText={text=>setAmount(text)} placeholder={t(amount_W)} keyboardType='number-pad'/>
        <Button onPress={()=>mintToken()} backgroundColor="orange" marginTop={3}>{mintTokenPhrase}</Button>
        {/* add placeholder */}</View>
      }      return <VStack style={{ paddingTop: 10,width:"100%",flex:1 }}>
      <List>
{Object.keys(tokens).map(c=>(
  <List.Item key={c}  style={[c==showModal?{backgroundColor:"#eee"}:null]}>
    <TouchableOpacity  onPress={()=>{if(c==showModal){setShowModal(null)}else{setShowModal(c)}}} style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
      <HStack>
    <View style={{marginRight:5}}><Icon name="logo-bitcoin" size={30} ></Icon></View>
    <View>
      <Text style={{fontWeight:"bold"}}>{tokens[c].name}{timeTokenWord}</Text>
      <Text>{c.substr(0,20)}...</Text>
    </View></HStack>
    <Text>${tokens[c].balance}</Text>
    </TouchableOpacity>
  </List.Item>
))}</List>
  {showModal&&
  <View style={{flexDirection:'row',marginTop:10}}>
    <Button onPress={()=>setBurning(true)} style={{flex:1,marginLeft:5}} backgroundColor="orange">{burnTokenPhrase}</Button>
    <Button onPress={()=>setMinting(true)} style={{flex:1,marginLeft:5}} backgroundColor="orange">{mintTokenPhrase}</Button>
    <Button style={{flex:1,marginLeft:5,marginRight:5}} backgroundColor="orange" onPress={
      ()=>{
        setContractAddress(showModal)
        setLoading(true)
        getMembers();
        setShowMembers(true);
      }
    }>{sendTokenPhrase}</Button></View>
    }
    <Button style={{flex:1,padding:20,borderRadius:0, position:'absolute',bottom:0,width:"100%"}} backgroundColor="orange" onPress={
      ()=>{
        setCreating(true)
      }
    }>{createTokenPhrase}</Button>
      
    </VStack>
    }

  }
  else if (name == t(members_W)) {
    return <><Members joinCode={community.code} members={communityMembers}></Members></>
  }
  else {
    return <></>
  }

}
function Card({ title, data }) {
  return <View style={{ padding: 15, borderWidth: 1, borderColor: "lightgrey", marginHorizontal: 8, alignItems: 'center' }}><Text style={{ width: 100, textAlign: 'center', color: "grey" }}>{title}</Text><Text style={{ fontSize: 20 }}>{data}</Text></View>
}
function Tab({ name, image, navigate, active }) {
  return <TouchableOpacity onPress={navigate} style={{ alignItems: 'center', marginBottom: 10, marginRight: 15 }}><View style={[active ? { backgroundColor: "orange" } : {}, { borderRadius: 100, borderWidth: 1, borderColor: "orange", padding: 15 }]}><Icon name={image} style={[active ? { color: "white" } : { color: "orange" }]} size={35} />{/* <Image source={{uri:image}} style={[{width:35,height:35,},active?{tintColor:"white"}:{}]}/> */}</View><Text style={{ marginTop: 5 }}>{name}</Text></TouchableOpacity>
}
function Loader() {
  return <View style={{ alignItems: 'center', justifyContent: 'center', padding: 30 }}>
    <ActivityIndicator />
  </View>
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: 'center',
    paddingTop: 20,
    minHeight:"100%"
  },
  formContainer:{
    paddingLeft:Dimensions.get("screen").width * 0.08,
    paddingRight:Dimensions.get("screen").width * 0.08,
    marginTop: 30,
    bottom:30,
    width:"100%"
  },
  formHeader:{
    color:"orange",
    fontSize:20,
    marginTop:10
  },
  formContent:{
    borderWidth:1,
    borderColor:"#d2d2d2",
    marginTop:15,
    padding:10,
  }
})