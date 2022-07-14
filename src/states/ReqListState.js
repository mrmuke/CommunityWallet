import axios from 'axios'
import * as React from 'react'

import { API_URL } from '../utils/API_URL'

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
                    communityReqList: action.communityReqList
                }
            case 'UPDATE_REQ_LIST': // updating request list with new list
                return {
                    ...prevState,
                    communityReqList: action.communityReqList
                }
        }
    }, {
        isLoading: true,
        communityReqList: null,
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let communityReqList
            
            /** Fetch request list data from the backend */
            try {
                const res = await axios.post(`${API_URL}/communityrequest/all`)
                communityReqList = res.data.data
            } catch (e) {

            }

            /** dispatching to reducer */ 
            dispatch({
                type: 'ADD_REQ_LIST',
                communityReqList
            })
        }
        
        bootstrapAsync()
    }, [])
    
    const reqListContext = React.useMemo(() => ({
        /**
         * Finds the corresponding community request in `communityReqList` and updates values
         * @param {*} reqId objectId string of the community request that is being updated
         * @param {*} verdict boolean of whether or not the community request is approved
         */
        updateReqList: (reqId, verdict) => {
            const updatedReqList = [...reqListState.communityReqList]
            const index = updatedReqList.findIndex(req => req._id === reqId)
            updatedReqList[index].completed = true
            updatedReqList[index].approved = verdict
            
            dispatch({
                type: 'UPDATE_REQ_LIST',
                communityReqList: updatedReqList
            })
        }
    }))

    return { reqListContext, reqListState }
}
