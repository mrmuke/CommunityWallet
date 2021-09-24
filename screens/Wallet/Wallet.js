import { Heading, HStack, VStack } from 'native-base';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default function Wallet() {
    let list = ["+500", "-500", "-200","+300"]

    return (
        <View style={styles.background}>
            <View style={styles.amount}>
                <Text style={{color:'white',fontSize:25}}>My Wallet</Text>
                <View style={{alignItems:'center'}}><Heading fontSize={70} color="white">2499</Heading>
                <Text style={{color:'#ececec'}}>Total Balance</Text></View>
            </View>
            <View style={{ backgroundColor: 'white', flex:1, padding: 20, borderTopLeftRadius: 10,borderTopRightRadius:10 }}>
                <Text style={{fontSize:25,marginLeft:15,marginBottom:10}}>Today</Text>
                <VStack>
                    {list.map((item,index) => (
                        <Transaction key={index} text={item} />
                    ))}
                </VStack>
            </View>
        </View>


    );

}
const Transaction = (props) => {

    return (
        <View style={styles.item}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={require('../../assets/service.png')} style={{width:50,height:50,backgroundColor:'lightgrey',borderRadius:100}}/><View style={{marginLeft:20}}><Text style={styles.itemText}>Sweeping</Text>
                <Text style={{color:"grey"}}>18 Oct, 9:25 AM</Text></View>
            </View>
            <View style={{borderRadius:10,padding:5,backgroundColor:"orange",height:30}}><Text style={{fontSize:17,color:"white"}}>{props.text}</Text></View>
        </View>
    )
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: "#f68b69",
        height: "100%",
    },
    amount: {

        alignSelf: 'center',
        marginBottom: 10,
        justifyContent:'space-between',
        flexDirection:'column',
        height:150,
        marginTop:30,
        alignItems:'center'
    },
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        flexDirection: 'row',
        height:70,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        
        borderBottomWidth:2,
        borderBottomColor:"lightgrey"
    },

    itemText: {
        fontWeight: "500"

    },



});

