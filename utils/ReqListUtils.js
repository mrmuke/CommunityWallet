import * as React from 'react'
import axios from 'axios'

import { API_URL } from './API_URL'

/**
 * State management for the superuser's role to approve and deny community requests.
 */

export function ReqListService() {
    const [reqListState, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type) {
            case 'ADD_REQ_LIST': // adding request List
                return {
                    ...prevState,
                    isLoading: false,
                    communityRequestList: action.communityRequestList
                }
            case 'UPDATE_REQ_LIST': // updating request list with new list
                return {
                    ...prevState,
                    communityRequestList: action.communityRequestList
                }
        }
    }, {
        isLoading: true,
        communityRequestList: [],
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let communityRequestList
            
            /** Fetch request list data from the backend */
            try {
                const res = await axios.post(`${API_URL}/communityrequest/all`)
                communityRequestList = res.data.data
            } catch (e) {

            }

            /** dispatching to reducer */ 
            dispatch({
                type: 'ADD_REQ_LIST',
                communityRequestList
            })
        }
        
        bootstrapAsync()
    }, [])
    
    const reqListContext = React.useMemo(() => ({
        /**
         * Finds the corresponding community request in `communityRequestList` and updates values
         * @param {*} reqId objectId of the community request that is being updated
         * @param {*} verdict boolean of whether or not the community request is approved
         */
        updateReqList: (reqId, verdict) => {
            const updatedReqList = reqListState.communityRequestList
            const index = updatedReqList.findIndex(req => req._id === reqId)
            updatedReqList[index].completed = true
            updatedReqList[index].approved = verdict

            /** dispatch to reducer */
            dispatch({
                type: 'UPDATE_REQ_LIST',
                communityRequestList: updatedReqList
            })
        }
    }))

    return { reqListContext, reqListState }
}
