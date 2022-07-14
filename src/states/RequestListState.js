import axios from 'axios'
import * as React from 'react'
import { showMessage } from 'react-native-flash-message'

import { API_URL } from '../utils/API_URL'

/**
 * State management for the user's ability to request and create communities
 */

export function RequestListService() {
    const [requestListState, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type) {
            case 'ADD_REQUEST_LIST':
                return {
                    ...prevState,
                    isLoading: false,
                    communityRequestList: action.communityRequestList
                }
            case 'UPDATE_REQUEST_LIST':
                return {
                    ...prevState,
                    communityRequestList: action.communityRequestList
                }
            case 'RELOAD_REQUEST_LIST':
                return {
                    ...prevState,
                    communityRequestList: action.communityRequestList
                }
        }
    }, {
        isLoading: true,
        communityRequestList: null
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let communityRequestList
    
            /** Fetch user's requests from the backend */
            try {
                const res = await axios.post(`${API_URL}/user/communityrequests`)
                communityRequestList = res.data.data
            } catch (e) {}
    
            dispatch({
                type: 'ADD_REQUEST_LIST',
                communityRequestList
            })
        }

        bootstrapAsync()
    }, [])
    
    const requestListContext = React.useMemo(() => ({
        /**
         * Finds the corresponding community request in `communityReqList` and updates values
         * @param {*} requestId objectId string of the community request that a community will be created from
         */
        createdCommunityFromRequest: (requestId) => {
            const updatedRequestList = [...requestListState.communityRequestList]
            const index = updatedRequestList.findIndex(req => req._id === requestId)
            updatedRequestList[index].created = true

            dispatch({
                type: 'UPDATE_REQUEST_LIST',
                communityRequestList: updatedRequestList
            })
        },
        /** Handle the reload for the community request list */
        reloadRequestList: () => {
            axios.post(`${API_URL}/user/communityrequests`)
            .then(res => {
                dispatch({
                    type: 'RELOAD_REQUEST_LIST',
                    communityRequestList: res.data.data
                })
            })
            .catch(err => {
                showMessage({
                    message: 'Something went wrong! Check your network connection.',
                    type: 'danger'
                })

                dispatch({
                    type: 'RELOAD_REQUEST_LIST',
                    communityRequestList: requestListState.communityRequestList
                })
            })
        }
    }))

    return { requestListContext, requestListState }
}
