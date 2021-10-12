import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import Drawer from './screens/Drawer'
import { NavigationContainer } from '@react-navigation/native';
import Signup from './screens/Signup';
import Login from './screens/Login';
import SplashScreen from './screens/Splash';
import AdminNavigator from './screens/AdminNavigator';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './auth-context';
import checkAdmin from './utils/utils';
import FlashMessage from 'react-native-flash-message';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyBIwcuAX4RLMczJFAhlrVechxp9EEn7szQ",
  authDomain: "communitywallet-ed36c.firebaseapp.com",
  projectId: "communitywallet-ed36c",
  storageBucket: "communitywallet-ed36c.appspot.com",
  messagingSenderId: "697161665894",
  appId: "1:697161665894:web:83280e7c5a650375448ca7",
  measurementId: "G-5E83HSB3X0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); */

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Register', //Set Header Title
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );

};
export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            mnemonic: action.mnemonic,
            password:action.password,
            admin:action.admin, 
            isLoading:false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            mnemonic: action.mnemonic,
            password:action.password,
            admin:action.admin
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            mnemonic: null,
            password:null,
            admin:null
          };
      }
    },
    {
      admin: null,
      password: null,
      mnemonic: null,
      isLoading:true
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let mnemonic;
      let password;
      let admin;
      try {
        mnemonic = await SecureStore.getItemAsync('mnemonic');
        password = await SecureStore.getItemAsync('password');
        admin = await AsyncStorage.getItem("admin")
        
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', mnemonic: mnemonic, password:password,admin:admin });
    };
setTimeout(()=>{
  bootstrapAsync();
},1000)
   
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        console.log(data)
        
        await SecureStore.setItemAsync("mnemonic", data.mnemonic)
        await SecureStore.setItemAsync("password", data.password)
        await AsyncStorage.setItem("admin",""+data.admin)
        dispatch({ type: 'SIGN_IN', mnemonic: data.mnemonic,password:data.password,admin:data.admin });
      },
      signOut: async() => {
        await SecureStore.deleteItemAsync("mnemonic")
        await SecureStore.deleteItemAsync("password")
        await AsyncStorage.removeItem("admin")
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`

        await SecureStore.setItemAsync("mnemonic", data.mnemonic)
        await SecureStore.setItemAsync("password", data.password)
        await AsyncStorage.setItem("admin",""+data.admin)
        dispatch({ type: 'SIGN_IN', mnemonic: data.mnemonic,password:data.password,admin:data.admin });
      },
    }),
    []
  );
  if(state.isLoading){
    return <SplashScreen/>
  }
  console.log(state)
  return (<NavigationContainer>
      <NativeBaseProvider>
        <AuthContext.Provider value={{authContext,state}} >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            
            {!state.mnemonic  ? (

              <Stack.Screen name="Auth" component={Auth} />
            ) : (
              <>
              {!checkAdmin(state.admin)?
                <Stack.Screen name="Drawer" component={Drawer} />
                :
                <Stack.Screen name="AdminNavigator" component={AdminNavigator} />}</>)}
                
          </Stack.Navigator></AuthContext.Provider><FlashMessage position="top" /></NativeBaseProvider>
    </NavigationContainer>
  );
}