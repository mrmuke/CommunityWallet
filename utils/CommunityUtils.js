import * as React from 'react'
import * as SecureStore from 'expo-secure-store'

export function initCommService() {
    const [communityState, dispatch] = React.useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_COMM':
                return {
                    ...prevState,
                    isLoading: false,
                    currentCommunity: action.currentCommunity,
                    currentPermission: action.currentPermission,
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
        }
    },
    {
        isLoading: true,
        currentCommunity: null,
        currentPermission: null
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let currentCommunity
            let currentPermission

            try {
                currentCommunity = await SecureStore.getItemAsync('currentCommunity')
                currentPermission = await SecureStore.getItemAsync('currentPermission')
            } catch (e) {

            }

            dispatch({
                type: 'RESTORE_COMM',
                currentCommunity,
                currentPermission
            })
        }

        bootstrapAsync()
    }, [])

    const communityContext = React.useMemo(() => ({
        enterCommunity: async data => {
            const communityData = JSON.stringify(data.community)
            const permissionData = JSON.stringify(data.permission)

            await SecureStore.setItemAsync('currentCommunity', communityData)
            await SecureStore.setItemAsync('currentPermission', permissionData)

            dispatch({
                type: 'ENTER_COMM',
                currentCommunity: communityData,
                currentPermission: permissionData
            })
        },
        exitCommunity: async () => {
            await SecureStore.deleteItemAsync('currentCommunity')
            await SecureStore.deleteItemAsync('currentPermission')

            dispatch({
                type: 'EXIT_COMM'
            })
        },
    }))

    return { communityContext, communityState }
}