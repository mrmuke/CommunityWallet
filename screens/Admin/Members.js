import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

var width = Dimensions.get("screen").width;
var height = Dimensions.get("screen").height;

export default function Members({joinCode,members}){
    return(
        <View>
            <View style={styles.CodeContainer}>
                <Text style={styles.CodeText}>Join Code: {joinCode}</Text>
            </View>
            <View style={{...styles.evenList, marginBottom: 10}}>
                    <Text style={{width: width * 0.92 * 0.35, fontSize:width*0.04, fontWeight:'bold'}}>Phone</Text>
                    <Text style={{width: width * 0.92 * 0.32, fontSize:width*0.04, fontWeight:'bold'}}>Joined</Text>
                    <Text style={{width: width * 0.92 * 0.19, fontSize:width*0.04, fontWeight:'bold'}}>Tokens</Text>
                    <Text style={{width: width * 0.92 * 0.115, fontSize:width*0.04, fontWeight:'bold'}}>Serv.</Text>
            </View>
            <View style={{height:height * 0.6}}>
                <ScrollView>
                    {members.map((m,index)=>(
                        index%2==0?
                        <View style={styles.oddList}>
                        <Text style={{width: width * 0.92 * 0.35}}>{m.phoneNumber}</Text>
                        <Text style={{width: width * 0.92 * 0.32}}>10/14/2021</Text>
                        <Text style={{width: width * 0.92 * 0.19}}>{m.balance}</Text>
                        <Text style={{width: width * 0.92 * 0.115}}>4</Text>
                    </View>:
                    <View style={styles.evenList}>
                        <Text style={{width: width * 0.92 * 0.35}}>{m.phoneNumber}</Text>
                        <Text style={{width: width * 0.92 * 0.32}}>10/15/2021</Text>
                        <Text style={{width: width * 0.92 * 0.19}}>{m.balance}</Text>
                        <Text style={{width: width * 0.92 * 0.115}}>4</Text>
                    </View>
                    ))}
                   
                    
                    
                   
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CodeContainer:{
        width:Dimensions.get("screen").width,
        paddingLeft:Dimensions.get("screen").width * 0.04,
        marginTop:20,
        marginBottom:20
    },
    CodeText:{
        fontSize:Dimensions.get("screen").width * 0.065,
        fontWeight:"bold"
    },
    oddList:{
        width:Dimensions.get("screen").width,
        backgroundColor:"#f2f2f2",
        flexDirection:"row",
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop:10,
        paddingBottom:10
    },
    evenList:{
        width:Dimensions.get("screen").width,
        flexDirection:"row",
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        paddingTop:10,
        paddingBottom:10
    }
})