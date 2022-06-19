import axios from 'axios'
import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function authenticate() {
    const [state, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                axios.defaults.headers.common['mnemonic'] = action.mnemonic
                axios.defaults.headers.common['password'] = action.password
                return {
                    ...prevState,
                    isLoading: false,
                    mnemonic: action.mnemonic,
                    password: action.password,
                }
            case 'SIGN_IN':
                axios.defaults.headers.common['mnemonic'] = action.mnemonic
                axios.defaults.headers.common['password'] = action.password
                return {
                    ...prevState,
                    mnemonic: action.mnemonic,
                    password: action.password,
                }
            case 'SIGN_OUT':
                delete axios.defaults.headers.common['mnemonic']
                delete axios.defaults.headers.common['password']
                return {
                    ...prevState,
                    mnemonic: null,
                    password: null,
                }
        }
    },
    {
        isLoading: true,
        password: null,
        mnemonic: null,
    })

    React.useEffect(() => {    
        const bootstrapAsync = async () => {
            let mnemonic
            let password

            try {
                mnemonic = await SecureStore.getItemAsync('mnemonic')
                password = await SecureStore.getItemAsync('password')
            } catch (e) {
                
            }

            dispatch({ 
                type: 'RESTORE_TOKEN', 
                mnemonic: mnemonic, 
                password: password,
            })
        }

        bootstrapAsync()
    }, [])

    const authContext = React.useMemo(() => ({
        logIn: async data => {
            await SecureStore.setItemAsync('mnemonic', data.mnemonic)
            await SecureStore.setItemAsync('password', data.password)
            await SecureStore.setItemAsync('phoneNumber', data.phoneNumber)
            await SecureStore.setItemAsync('username', data.username)
            await SecureStore.setItemAsync('evmosAddress', data.evmosAddress)
            await SecureStore.setItemAsync('ethAddress', data.ethAddress)
            await SecureStore.setItemAsync('wasmAddress', data.wasmAddress)
            await SecureStore.setItemAsync('ixoAddress', data.ixoAddress)

            dispatch({
                type: 'SIGN_IN', 
                mnemonic: data.mnemonic,
                password: data.password,
            })
        },
        signOut: async () => {
            await SecureStore.deleteItemAsync('mnemonic')
            await SecureStore.deleteItemAsync('password')
            await SecureStore.deleteItemAsync('phoneNumber')
            await SecureStore.deleteItemAsync('username')
            await SecureStore.deleteItemAsync('evmosAddress')
            await SecureStore.deleteItemAsync('ethAddress')
            await SecureStore.deleteItemAsync('wasmAddress')
            await SecureStore.deleteItemAsync('ixoAddress')
            dispatch({ 
                type: 'SIGN_OUT' 
            })
        },
        signUp: async data => {
            await SecureStore.setItemAsync('mnemonic', data.mnemonic)
            await SecureStore.setItemAsync('password', data.password)
            await SecureStore.setItemAsync('phoneNumber', data.phoneNumber)
            await SecureStore.setItemAsync('username', data.username)
            await SecureStore.setItemAsync('evmosAddress', data.evmosAddress)
            await SecureStore.setItemAsync('ethAddress', data.ethAddress)
            await SecureStore.setItemAsync('wasmAddress', data.wasmAddress)
            await SecureStore.setItemAsync('ixoAddress', data.ixoAddress)
            
            dispatch({ 
                type: 'SIGN_IN', 
                mnemonic: data.mnemonic,
                password: data.password,
            })
        },
    }), [])

    return { authContext, state }
}
