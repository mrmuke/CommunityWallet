import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={ styles.testImage } />
      <Text style={{ color: 'blue', fontSize: '20' }}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testImage: {
    width: 305,
    height: 150
  },
})
