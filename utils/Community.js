import axios from 'axios'
import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function initCommunity() {
    const [communityState, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_COMM':
                return {
                    ...prevState,
                    isLoading: false,
                    currentCommunity: action.currentCommunity
                }
            case 'ENTER_COMM':
                return {
                    ...prevState,
                    currentCommunity: action.currentCommunity
                }
            case 'EXIT_COMM':
                return {
                    ...prevState,
                    currentCommunity: null
                }
        }
    },
    {
        isLoading: true,
        currentCommunity: null
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let currentCommunity

            try {
                currentCommunity = await SecureStore.getItemAsync('currentCommunity')
            } catch (e) {

            }

            dispatch({
                type: 'RESTORE_COMM',
                currentCommunity
            })
        }

        bootstrapAsync()
    }, [])

    const communityContext = React.useMemo(() => ({
        enterCommunity: async data => {
            const communityData = data.community

            await SecureStore.setItemAsync('currentCommunity', communityData)

            dispatch({
                type: 'ENTER_COMM',
                currentCommunity: communityData
            })
        },
        exitCommunity: async data => {
            await SecureStore.deleteItemAsync('currentCommunity')

            dispatch({
                type: 'EXIT_COMM'
            })
        }
    }))

    return { communityContext, communityState }
}