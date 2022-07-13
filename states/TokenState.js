import axios from 'axios'
import * as React from 'react'

import { API_URL } from '../utils/API_URL'
import { CommunityContext } from './Contexts'

export function TokenService() {
    const communityState = React.useContext(CommunityContext).communityState

    const [tokenState, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type) {
            case 'ADD_TOKENS':
                return {
                    ...prevState,
                    isLoading: false,
                    parentToken: action.parentToken,
                    childTokens: action.childTokens
                }
            case 'BURN':
                return {
                    ...prevState
                }
            case 'MINT':
                return {
                    ...prevState
                }
            case 'MINT_MORE':
                return {
                    ...prevState
                }
        }
    }, {
        isLoading: true,
        parentToken: null,
        childTokens: null
    })

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let parentToken
            let childTokens
            
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            try {
                const resps = await Promise.all([
                    axios.post(`${API_URL}/community/parentToken`, msg),
                    axios.post(`${API_URL}/community/childTokens`, msg)
                ])
                
                parentToken = resps[0].data.message == 'Not found' ? 'Not found': resps[0].data.data
                childTokens = resps[1].data.data
            } catch (e) {}

            dispatch({
                type: 'ADD_TOKENS',
                parentToken,
                childTokens
            })
        }

        bootstrapAsync()
    }, [communityState])

    const tokenContext = React.useMemo(() => ({
        mintMoreTokens: (contractAddress, number) => {

        },
        burnTokens: (contractAddress, number) => {

        }
    }))

    return {tokenContext, tokenState}
}
