import axios from 'axios';
import { Button, Heading, VStack } from 'native-base';
import React, { Component, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';
import API_URL from '../../API_URL';

import QRCode from 'react-native-qrcode-svg';
import AuthContext from '../../auth-context';
import { useIsFocused } from "@react-navigation/native";

export default function Wallet() {
    const { state } = React.useContext(AuthContext);

    let list = ["+500", "-500", "-200", "+300"]
    const [tokens, setTokens] = useState([])
    const [address, setAddress] = useState(null)
    const [receive, setReceive] = useState(false)
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused){
            setTokens([])
            setAddress(null)
            getWallet()
        }
        
    }, [isFocused])
    function getWallet() {
        axios.post(API_URL + '/user/wallet', { mnemonic: state.mnemonic, password: state.password }).then(response => {
            console.log(response.data)
            setTokens(response.data.balances)
            setAddress(response.data.address)
        })
    }
    if (tokens.length == 0 || !address) {
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
            <ActivityIndicator />
        </View>
    }
    return (
        <View style={styles.background}>
            <Modal visible={receive} transparent={false} animationType="slide" ><View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }
            }><QRCode size={150} value={address} /><TouchableOpacity style={{ padding: 15 }} onPress={() => setReceive(false)}><Text>Close</Text></TouchableOpacity></View></Modal>
            <View style={styles.amount}>
                <Text style={{ color: 'white', fontSize: 25 }}>My Wallet</Text>
                <View style={{ alignItems: 'center' }}><Heading fontSize={70} color="white">{tokens[Object.keys(tokens)[0]]}</Heading>
                    <Text style={{ color: '#ececec' }}>Total Balance</Text></View>
            </View>

            <View style={{ backgroundColor: 'white', flex: 1, padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <Button onPress={() => setReceive(true)} backgroundColor="orange" marginBottom={5}>Receive Tokens</Button>
                <Text style={{ fontSize: 25, marginLeft: 15, marginBottom: 10 }}>Today</Text>
                <VStack>
                    {list.map((item, index) => (
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/service.png')} style={{ width: 50, height: 50, backgroundColor: 'lightgrey', borderRadius: 100 }} /><View style={{ marginLeft: 20 }}><Text style={styles.itemText}>Sweeping</Text>
                    <Text style={{ color: "grey" }}>18 Oct, 9:25 AM</Text></View>
            </View>
            <View style={{ borderRadius: 10, padding: 5, backgroundColor: "orange", height: 30 }}><Text style={{ fontSize: 17, color: "white" }}>{props.text}</Text></View>
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 150,
        marginTop: 30,
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,

        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
    },

    itemText: {
        fontWeight: "500"

    },



});

