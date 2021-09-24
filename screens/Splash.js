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

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation

  useEffect(() => {
    setTimeout(() => {
      //Check if token is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('wallet').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'Drawer'
        ),
      );
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