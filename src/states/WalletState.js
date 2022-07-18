import axios from 'axios'
import * as React from 'react'

import { API_URL } from '../utils/API_URL'
import { CommunityContext } from './Contexts'

export function WalletService() {
    const communityState = React.useContext(CommunityContext).communityState

    const [walletState, dispatch] = React.useReducer((prevState, action) => {
        switch(action.type) {
            case 'ADD_DATA':
                return {
                    ...prevState,
                    isLoading: false,
                    balanceChildren: action.balanceChildren,
                    balanceParent: action.balanceParent,
                    receivedTransactions: action.receivedTransactions,
                    sentTransactions: action.sentTransactions,

                }
            case 'RELOAD_DATA':
                return {
                    ...prevState,
                    balanceChildren: action.balanceChildren,
                    balanceParent: action.balanceParent,
                    receivedTransactions: action.receivedTransactions,
                    sentTransactions: action.sentTransactions,
                }
            case 'RELOAD_BALANCES':
                return {
                    ...prevState,
                    balanceChildren: action.balanceChildren,
                    balanceParent: action.balanceParent,
                }
            case 'RELOAD_BALANCES':
                return {
                    ...prevState,
                    receivedTransactions: action.receivedTransactions,
                    sentTransactions: action.sentTransactions,
                }
        }
    }, {
        isLoading: true,
        balanceChildren: null,
        balanceParent: null,
        receivedTransactions: null,
        sentTransactions: null,
    })


    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let balanceChildren
            let balanceParent 
            let sentTransactions
            let receivedTransactions 

            
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            try {
                const resps = await Promise.all([
                    axios.post(`${API_URL}/user/balancesOneCommunity`, msg),
                    axios.post(`${API_URL}/user/transactions`)
                ])

                const balances = resps[0].data.data
                const index = balances.findIndex(bal => bal.parentToken)
                balanceParent = balances.splice(index, 1).pop()
                balanceChildren = balances

                const transactions = resps[1].data.data
                receivedTransactions = transactions.receivedTransactions ? transactions.receivedTransactions : []
                sentTransactions = transactions.sentTransactions ? transactions.sentTransactions : []
            } catch (e) {}
            dispatch({
                type: 'ADD_DATA',
                balanceChildren,
                balanceParent,
                receivedTransactions,
                sentTransactions,
            })
        }
        
        bootstrapAsync()
    }, [communityState])

    const walletContext = React.useMemo(() => ({
        reloadData: () => {
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            Promise.all([
                axios.post(`${API_URL}/user/balancesOneCommunity`, msg),
                axios.post(`${API_URL}/user/transactions`)
            ])
            .then(resps => {
                const balances = resps[0].data.data
                const index = balances.findIndex(bal => bal.parentToken)
                balanceParent = balances.splice(index, 1).pop()
                balanceChildren = balances

                const transactions = resps[1].data.data
                receivedTransactions = transactions.receivedTransactions ? transactions.receivedTransactions : []
                sentTransactions = transactions.sentTransactions ? transactions.sentTransactions : []

                dispatch({
                    type: 'RELOAD_DATA',
                    balanceChildren,
                    balanceParent,
                    receivedTransactions,
                    sentTransactions,
                })
            })
            .catch(err => {

            })
        },
        reloadBalances: () => {
            console.log('happening')
            const msg = { communityId: JSON.parse(communityState.currentCommunity)._id }
            axios.post(`${API_URL}/user/balancesOneCommunity`, msg)
            .then(res => {
                const balances = res.data.data
                const index = balances.findIndex(bal => bal.parentToken)
                const balanceParent = balances.splice(index, 1).pop()
                const balanceChildren = balances
                dispatch({
                    type: 'RELOAD_BALANCES',
                    balanceChildren,
                    balanceParent
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        reloadTransactions: () => {
            axios.post(`${API_URL}/user/transactions`)
            .then(res => {
                const transactions = res.data.data
                const sentTransactions = transactions.sentTransactions ? transactions.sentTransactions : []
                const receivedTransactions = transactions.receivedTransactions ? transactions.receivedTransactions : []
                dispatch({
                    type: 'RELOAD_TRANSACTIONS',
                    sentTransactions,
                    receivedTransactions
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }))

    return {walletContext, walletState}
}