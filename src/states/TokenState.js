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
            case 'RELOAD_CHILD_TOKENS':
                return {
                    ...prevState,
                    childTokens: action.childTokens
                }
            case 'RELOAD_PARENT_TOKEN':
                return {
                    ...prevState,
                    parentToken: action.parentToken
                }
            case 'RELOAD_TOKENS':
                return {
                    ...prevState,
                    parentToken: action.parentToken,
                    childTokens: action.childTokens
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
        reloadChildTokens: () => {
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            axios.post(`${API_URL}/community/childTokens`, msg)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: 'RELOAD_CHILD_TOKENS',
                    childTokens: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        reloadParentToken: () => {
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            axios.post(`${API_URL}/community/parentToken`, msg)
            .then(res => {
                dispatch({
                    type: 'RELOAD_CHILD_TOKENS',
                    parentToken: res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        reloadTokens: () => {
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            Promise.all([
                axios.post(`${API_URL}/community/childTokens`, msg),
                axios.post(`${API_URL}/community/parentToken`, msg)
            ])
            .then(resps => {
                dispatch({
                    type: 'RELOAD_TOKENS',
                    childTokens: resps[0].data.data,
                    parentToken: resps[1].data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }))

    return {tokenContext, tokenState}
}
