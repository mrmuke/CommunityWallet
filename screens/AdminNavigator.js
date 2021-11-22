import { StyleSheet, View, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'expo-chart-kit'
import { Text, Image } from 'react-native'
import { Dimensions } from 'react-native'
import { Box, Button, Heading, HStack, List, Progress, VStack, } from 'native-base'
import { ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import API_URL from '../API_URL';
import Members from './Admin/Members'
import Send from './Wallet/Send'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AuthContext from '../auth-context'
import { TextInput } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
const tabs = {
  "Analytics": "analytics",
  "Tokens": "logo-bitcoin",
  "Members": "people",
  "Economy": "stats-chart"
}
const Stack = createStackNavigator();

export default function AdminNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name="Admin Home" component={AdminHome} />
    <Stack.Screen name="Analytics" component={AdminAnalytics} />
    <Stack.Screen name="Send" component={Send} options={{headerShown:false}}/>
  </Stack.Navigator>
}
function AdminAnalytics() {
  return <View></View>
}
function AdminHome({ navigation }) {
  const { state } = React.useContext(AuthContext);
  const [community, setCommunity] = useState(null)
  const [active, setActive] = useState("Analytics")
  useEffect(() => {

    axios.post(API_URL + '/community/communityInfo', { mnemonic: state.mnemonic, password: state.password }).then(response => {
      setCommunity(response.data)
    }).catch(e => {

    })
  }, [])
  if (!community) {
    return <Loader/>
  }

  return <View style={{flex:1}}><ScrollView contentContainerStyle={styles.container}>
    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingLeft: 25 }}>
      {Object.keys(tabs).map(c => (
        <Tab active={active == c} navigate={() => setActive(c)} key={c} name={c} image={tabs[c]} ></Tab>
      ))}</View>
    <Page setCommunity={setCommunity} state={state} community={community} name={active} navigation={navigation} />
  </ScrollView></View>
}

function Page({ name,setCommunity, community, state, navigation }) {
  const { authContext } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [tokens,setTokens]=useState({})
  const [showModal,setShowModal]=useState(null)
  const [members,setMembers]=useState([])
  const [showMembers, setShowMembers] = useState(false);
  const [contractAddress,setContractAddress]=useState("")
  const [creating,setCreating]=useState(false)
  const [amount,setAmount]=useState(0)
  const [tokenName,setTokenName]=useState("")
  
  useEffect(() => {
    if (name == "Tokens") {
      setLoading(true)
      axios.post(API_URL + '/user/wallet', { mnemonic: state.mnemonic, password: state.password }).then(response => {
        setTokens(response.data.balances)
        setLoading(false)
        
      }).catch(e => {

      })
    }
    else if (name == "Members") {
      setLoading(true)
      axios.post(API_URL+'/community/members', { mnemonic: state.mnemonic, password: state.password }).then(response=>{
        setMembers(response.data)
        setLoading(false)
      }).catch(e=>{

      })
    }
  }, [name])

  function getMembers(){
    axios.post(API_URL+'/community/members', { mnemonic: state.mnemonic, password: state.password }).then(response=>{
      setMembers(response.data)
      setLoading(false)
    }).catch(e=>{

    })
  }
  function createToken(){
    if(tokenName.length<=4){
      showMessage({type:"info",message:"Please enter more than 4 characters..."})
      return;
    }
    setLoading(true)
    axios.post(API_URL+'/community/mintToken', { mnemonic: state.mnemonic, password: state.password, amount,tokenName }).then(response=>{
      console.log(response.data)
      setCreating(false)
      setCommunity(response.data)
      setLoading(false)
    })//change token names
  }

  if(loading){
    return <Loader/>
  }
  if (name == "Analytics") {

    return <><Heading style={{ alignSelf: 'flex-start', marginLeft: 25, fontSize: 18 }}>Transactions</Heading>
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
          <Heading style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Progress</Heading>
          <Progress colorScheme="warning" backgroundColor="#eee" size="md" mb={4} value={45} /></View></Box>
      <Heading style={{ fontSize: 18, alignSelf: 'flex-start', marginLeft: 25, marginBottom: 10 }}>Statistics</Heading>

      <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingLeft: 10, marginBottom: 25 }}>
        <Card title="Total Transactions" data={233}></Card>
        <Card title="Total Transactions" data={233}></Card>
        <Card title="Total Transactions" data={233}></Card>
      </View>
      <Button onPress={() => authContext.signOut()} backgroundColor="orange" width={"100%"} height={70} borderRadius={0}>Sign Out</Button>
    </>
  }
  else if (name == "Tokens") {

    if(showMembers){
      return(
        <View style={{width:"100%"}}>
          <TouchableOpacity style={{borderRadius:5, padding: 20}} onPress={()=>{
            setShowMembers(false);
          }}>
            <Text>Back</Text>
          </TouchableOpacity>
          {(function(){
            let arr = [];
            for(let member of members){
              arr.push(<View style={[{width:"100%", padding: 20, flexDirection:"row",borderTopWidth:1,borderTopColor:"lightgrey", borderBottomColor:'lightgrey'},member==members[members.length-1]&&{borderBottomWidth:1}]}>
                <View style={{width:"50%"}}><Text style={{width:"100%", textAlign:"center", fontSize:25}}>{member.phoneNumber}</Text></View>
                <View style={{width:"50%"}}>
                  <TouchableOpacity style={{ backgroundColor:"#FFD580", padding: 10,flexDirection:'row',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate("Send", {
                      "rcpAddress": member.address,
                      "contractAddress":contractAddress
                    });
                  }}>
                    <Icon name="send" size={20}/>
                    <Text style={{marginLeft:10, textAlign:"center"}}>Send!</Text>
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
            <TouchableOpacity style={{marginTop:10}} onPress={()=>setCreating(false)}><Text>Back</Text></TouchableOpacity>
            <Text style={styles.formHeader}>CREATE TOKEN</Text>
            <View style={styles.formContent}>
              <View style={{flexDirection:"row"}}>
                <MaterialIcon name="drive-file-rename-outline" style={{color:"orange", fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></MaterialIcon>
                <TextInput placeholder="Name of Token" onChangeText={text=>setTokenName(text)} style={{width:"100%"}}></TextInput>
              </View>
              <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
                <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
              </View>
              <View style={{flexDirection:"row"}}>
                <MaterialIcon name="attach-money" style={{color:"orange", fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></MaterialIcon>
                <TextInput keyboardType="number-pad" placeholder="Amount" onChangeText={text=>setAmount(text)}  style={{width:"100%"}}></TextInput>
              </View> 
              
              <Button onPress={()=>createToken()} backgroundColor="orange" marginTop={3}>Create</Button>
            </View>
          </View>
         
        )
          
          
      }
      console.log(tokens)
      return <VStack style={{ paddingTop: 10,width:"100%",flex:1 }}>
      <List>
{Object.keys(tokens).map(c=>(
  <List.Item key={c}  style={[c==showModal?{backgroundColor:"#eee"}:null]}>
    <TouchableOpacity  onPress={()=>{if(c==showModal){setShowModal(null)}else{setShowModal(c)}}} style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
      <HStack>
    <View style={{marginRight:5}}><Icon name="logo-bitcoin" size={30} ></Icon></View>
    <View>
      <Text style={{fontWeight:"bold"}}>{tokens[c].name} Token</Text>
      <Text>{c.substr(0,20)}...</Text>
    </View></HStack>
    <Text>${tokens[c].balance}</Text>
    </TouchableOpacity>
  </List.Item>
))}</List>
  {showModal&&
  <View style={{flexDirection:'row',marginTop:10}}>
    <Button style={{flex:1,marginLeft:5}} backgroundColor="orange">Burn Token</Button>
    <Button style={{flex:1,marginLeft:5,marginRight:5}} backgroundColor="orange" onPress={
      ()=>{
        setContractAddress(showModal)
        getMembers();
        setShowMembers(true);
      }
    }>Send Token</Button></View>
    }
    <Button style={{flex:1,padding:20,borderRadius:0, position:'absolute',bottom:0,width:"100%"}} backgroundColor="orange" onPress={
      ()=>{
        setCreating(true)
      }
    }>Create Token</Button>
      
    </VStack>
    }

  }
  else if(name=="Members"&&members.length>0){
    return <><Members joinCode={community.code} members={members}></Members></>
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
function Loader(){
  return <View style={{ alignItems: 'center', justifyContent: 'center',padding:30 }}>
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