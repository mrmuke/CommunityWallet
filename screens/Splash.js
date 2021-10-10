// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import AuthContext from '../auth-context';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  /* const {state} = React.useContext(AuthContext); */
  useEffect(() => {
    setTimeout(() => {
      //Check if token is set or not
      //If not then send for Authentication
      //else send to Home Screen
      /* SecureStore.getItemAsync('mnemonic').then(async (value) =>
        navigation.replace(
          value === null ? 'Auth' : (await AsyncStorage.getItem('admin')?'AdminNavigator':'Drawer')
        ),
      ); */
/*       navigation.replace(!state.mnemonic?"Auth":state.admin?"AdminNavigatior":"Drawer")
 */
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={true}
        color="orange"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});