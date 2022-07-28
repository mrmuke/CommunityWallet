import axios from 'axios'
import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function authenticate() {
    const [authState, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                axios.defaults.headers.common['mnemonic'] = action.mnemonic
                axios.defaults.headers.common['password'] = action.password
                return {
                    ...prevState,
                    isLoading: false,
                    mnemonic: action.mnemonic,
                    password: action.password,
                    user: action.user,
                }
            case 'SIGN_IN':
                axios.defaults.headers.common['mnemonic'] = action.mnemonic
                axios.defaults.headers.common['password'] = action.password
                return {
                    ...prevState,
                    mnemonic: action.mnemonic,
                    password: action.password,
                    user: action.user,
                }
            case 'SIGN_OUT':
                delete axios.defaults.headers.common['mnemonic']
                delete axios.defaults.headers.common['password']
                return {
                    ...prevState,
                    mnemonic: null,
                    password: null,
                    user: null,
                }
        }
    },
    {
        isLoading: true,
        password: null,
        mnemonic: null,
        user: null,
    })

    React.useEffect(() => {    
        const bootstrapAsync = async () => {
            let mnemonic
            let password
            let user

            try {
                mnemonic = await SecureStore.getItemAsync('mnemonic')
                password = await SecureStore.getItemAsync('password')
                user = await SecureStore.getItemAsync('user')
            } catch (e) {
                
            }

            dispatch({ 
                type: 'RESTORE_TOKEN', 
                mnemonic: mnemonic, 
                password: password,
                user: user,
            })
        }

        bootstrapAsync()
    }, [])

    const authContext = React.useMemo(() => ({
        logIn: async data => {
            const mnemonic = data.user.mnemonic
            const password = data.password
            const user = JSON.stringify(data.user)

            await SecureStore.setItemAsync('mnemonic', mnemonic)
            await SecureStore.setItemAsync('password', password)
            await SecureStore.setItemAsync('user', user)

            dispatch({
                type: 'SIGN_IN', 
                mnemonic,
                password,
                user,
            })
        },
        signOut: async () => {
            await SecureStore.deleteItemAsync('mnemonic')
            await SecureStore.deleteItemAsync('password')
            await SecureStore.deleteItemAsync('user')
            dispatch({ 
                type: 'SIGN_OUT' 
            })
        },
        signUp: async data => {
            const mnemonic = data.user.mnemonic
            const password = data.password
            const user = JSON.stringify(data.user)

            await SecureStore.setItemAsync('mnemonic', mnemonic)
            await SecureStore.setItemAsync('password', password)
            await SecureStore.setItemAsync('user', user)
            
            dispatch({ 
                type: 'SIGN_IN', 
                mnemonic,
                password,
                user,
            })
        },
    }), [])

    return { authContext, authState }
}
