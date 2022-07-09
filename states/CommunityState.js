import axios from 'axios'
import * as React from 'react'
import { showMessage } from 'react-native-flash-message'
import * as SecureStore from 'expo-secure-store'

import { API_URL } from '../utils/API_URL'

export function CommunityService(authContext, authState) {
    /** State variables */

    const [communityState, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'FETCH_COMM_LIST':
                return {
                    ...prevState,
                    communityList: action.communityList
                }
            case 'RESTORE_COMM':
                return {
                    ...prevState,
                    isLoading: false,
                    currentCommunity: action.currentCommunity,
                    currentPermission: action.currentPermission,
                    communityList: action.communityList
                }
            case 'ENTER_COMM':
                return {
                    ...prevState,
                    currentCommunity: action.currentCommunity,
                    currentPermission: action.currentPermission
                }
            case 'EXIT_COMM':
                return {
                    ...prevState,
                    currentCommunity: null,
                    currentPermission: null
                }
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    currentCommunity: null,
                    currentPermission: null,
                    communityList: null
                }
        }
    },
    {
        isLoading: true,
        communityList: null,
        currentCommunity: null,
        currentPermission: null
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let currentCommunity
            let currentPermission
            let communityList

            try {
                const responses = await Promise.all([
                    SecureStore.getItemAsync('currentCommunity'),
                    SecureStore.getItemAsync('currentPermission'),
                    axios.post(`${API_URL}/user/listAllUserCommunities`)
                ])
                currentCommunity = responses[0]
                currentPermission = responses[1]
                communityList = JSON.stringify(responses[2].data.data)
            } catch (e) {}

            dispatch({
                type: 'RESTORE_COMM',
                currentCommunity,
                currentPermission,
                communityList
            })
        }

        bootstrapAsync()
    }, [authState])

    const communityContext = React.useMemo(() => ({
        /** Fetch all user communities the backend */
        fetchCommunities: async () => {
            axios.post(`${API_URL}/user/listAllUserCommunities`)
            .then(async res => {
                const communityList = JSON.stringify(res.data.data)
                await SecureStore.setItemAsync('communityList', communityList)
                dispatch({
                    type: 'FETCH_COMM_LIST',
                    communityList
                })
            })
            .catch(err => {
                showMessage({
                    message: 'Something went wrong! Check your network connection.',
                    type: 'danger'
                })
            })
        },
        /**
         * State function to set the current community the user will be in
         * @param {*} community community that user will be entering
         * @param {*} permission permission of community
         */
        enterCommunity: async (community, permission) => {
            const communityData = JSON.stringify(community)
            const permissionData = JSON.stringify(permission)

            await SecureStore.setItemAsync('currentCommunity', communityData)
            await SecureStore.setItemAsync('currentPermission', permissionData)

            dispatch({
                type: 'ENTER_COMM',
                currentCommunity: communityData,
                currentPermission: permissionData
            })
        },
        /** Exit the current community */
        exitCommunity: async () => {
            await SecureStore.deleteItemAsync('currentCommunity')
            await SecureStore.deleteItemAsync('currentPermission')

            dispatch({
                type: 'EXIT_COMM'
            })
        },
        /** Logout procedure */
        signOut: async () => {
            await SecureStore.deleteItemAsync('communityList')
            await SecureStore.deleteItemAsync('currentCommunity')
            await SecureStore.deleteItemAsync('currentPermission')

            dispatch({
                type: 'SIGN_OUT'
            })
        }
    }))

    return { communityContext, communityState }
}