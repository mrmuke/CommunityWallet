import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AuthContext from '../../auth-context';
import axios from 'axios'
import api from '../../API_URL';
import * as ImagePicker from 'expo-image-picker';
import { showMessage } from 'react-native-flash-message';

var orange = "#ec802e";

export default function CreateServices({navigation, route}){
  const { state } = React.useContext(AuthContext);

  const [ name, setName ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ cost, setCost ] = useState("");
  const [ description, setDescription ] = useState("");
  const [localUri, setLocalUri] = useState(null);
  const [fileName, setFileName] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      setLocalUri(result.uri);
      setFileName(result.uri.split('/').pop());  
    }
  };

  function createItem(){
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(fileName);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: fileName, type });  
    formData.append('name', name);
    formData.append('category', category);
    formData.append('cost', cost);
    formData.append('description', description);
    formData.append('mnemonic', state.mnemonic);
    formData.append('password',state.password);
    formData.append('marketCode', "1UVkH7");

    const link = api + '/services/service';

    axios(
      {
        method: 'post',
        url: link,
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
    ).then(()=>{
      showMessage({
        message: "Service Created",
        type: "success",
      });
      navigation.navigate(route.params.previous);
    })
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

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
<View style={{paddingBottom:100}}>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>MAIN INFO</Text>
          <View style={styles.formContent}>
            <View style={{flexDirection:"row"}}>
              <Icon name="drive-file-rename-outline" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput defaultValue={name} placeholder="Name of Service" onChangeText={text=>setName(text)}></TextInput>
            </View>
            <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
              <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <Icon name="category" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput defaultValue={category} placeholder="Category" onChangeText={text=>setCategory(text)}></TextInput>
            </View> 
            <View style={{marginTop: 10, marginBottom: 10, alignItems:"center"}}>
              <View style={{width:"90%", borderWidth:0.5, borderColor:"#d2d2d2"}}></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <Icon name="attach-money" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <TextInput defaultValue={cost} keyboardType="number-pad" placeholder="Price" onChangeText={text=>setCost(text)}></TextInput>
            </View> 
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>DESCRIPTION</Text>
          <View style={styles.formContent}>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <Icon name="description" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 7}}></Icon>
              <TextInput defaultValue={description} placeholder="Describe your service" multiline={true} style={{width:Dimensions.get("screen").width * 0.65, height:Dimensions.get("screen").height*0.1}} onChangeText={text=>setDescription(text)}></TextInput>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>PHOTO</Text>
          <TouchableOpacity style={styles.formContent} onPress={()=>pickImage()}>
            <View style={{flexDirection:"row", justifyContent :"center", alignItems:"center"}}>
              <Icon name="drive-file-rename-outline" style={{color:orange, fontSize:Dimensions.get("screen").height * 0.05, marginRight: 5}}></Icon>
              <Text style={{color:"#999"}}>{localUri?"UPLOADED!":"INSERT AN IMAGE HERE!"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{height:Dimensions.get("screen").height * 0.07,}}></View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.CreateContainer} onPress={
        ()=>{ createItem() }
      }>
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