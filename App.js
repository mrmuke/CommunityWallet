import React from 'react';
import { NativeBaseProvider } from 'native-base';
import ToDo from './screens/ToDo'
import Login from './screens/Login'

export default function App() {
  
  return (<NativeBaseProvider>
    {/* <ToDo/> */}
    <Login/>
  </NativeBaseProvider>)
}

