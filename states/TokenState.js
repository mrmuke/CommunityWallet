import axios from 'axios'
import * as React from 'react'

import { API_URL } from '../utils/API_URL'

export function TokenService() {
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
            
            try {    
                parentToken = {address: 'wasm325kjnkjasf', name: 'North Chicago Token', symbol: 'NOGO'}
                childTokens = [{address: 'wasm3rj13j4noan', name: 'Chicken Token', symbol: 'CHIK', _id: 'asdjfklajwefoasdf'}, {address: 'wasm34kjnf09u134', name: 'Bike Token', symbol: 'BIKE', _id: 'vcesfq34trgsg'}, {address: 'wasm3r4kjnasdfou3', name: 'Squash Token', symbol: 'SQSH', _id: 'adfwerasdfasdf'}]
            } catch {}

            dispatch({
                type: 'ADD_TOKENS',
                parentToken,
                childTokens
            })
        }

        bootstrapAsync()
    }, [])

    const tokenContext = React.useMemo(() => ({
        mintMoreTokens: (contractAddress, number) => {

        },
        burnTokens: (contractAddress, number) => {

        }
    }))

    return {tokenContext, tokenState}
}
