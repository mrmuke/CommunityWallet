import { StyleSheet, View, ActivityIndicator } from 'react-native'
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
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import API_URL from '../API_URL';

import Icon from 'react-native-vector-icons/Ionicons'
import AuthContext from '../auth-context'
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

  return <ScrollView contentContainerStyle={styles.container}>
    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', paddingLeft: 25 }}>
      {Object.keys(tabs).map(c => (
        <Tab active={active == c} navigate={() => setActive(c)} key={c} name={c} image={tabs[c]} ></Tab>
      ))}</View>
    <Page state={state} community={community} name={active} />


  </ScrollView>
}
function Page({ name, community, state }) {
  const { authContext } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false)
  const [tokens,setTokens]=useState({})
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

    }
  }, [name])
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

    return <VStack style={{ paddingTop: 10,width:"100%" }}>
      <List>
{Object.keys(tokens).map(c=>(
  <List.Item>
    <View style={{flexDirection:'row',flex:1,justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
      <HStack>
    <View style={{marginRight:5}}><Icon name="logo-bitcoin" size={30} ></Icon></View>
    <View>
      <Text style={{fontWeight:"bold"}}>{community.name} Time Token</Text>
      <Text>{c.substr(0,20)}...</Text>
    </View></HStack>
    <Text>${tokens[c]}</Text>
    </View>
  </List.Item>
))}</List>

      {/* <Button padding={5}>Create New Token</Button>
      <Button padding={5} marginTop={2}>Send Tokens</Button> */}
    </VStack>
  }
  else if (name == "Members") {
    return <>
      <Heading>Join Code: {community.code}</Heading></>
    //QAw37e
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
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:30 }}>
  <ActivityIndicator />
</View>
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: 'center',
    paddingTop: 20,
  }
})