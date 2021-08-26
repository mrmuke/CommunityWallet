import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';

export default function App() {
  /* return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  ); */
  return (<NativeBaseProvider>
    <Box>Hello world</Box>
  </NativeBaseProvider>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
