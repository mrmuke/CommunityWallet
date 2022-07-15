import axios from 'axios'
import * as React from 'react'
import { Dimensions } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Reanimated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated'

import { API_URL } from '../../../utils/API_URL'
import { FlyingCards, NumberInput } from '../../../components'
import { CommunityContext, TokenContext } from '../../../states/Contexts'

import { showMessage } from 'react-native-flash-message'


export function MintAmountScreen({ navigation, route }) {
    const symbol = route.params.symbol
    const tokenName = route.params.tokenName
    const tokenType = route.params.tokenType

    /** Contexts and States */
    const communityState = React.useContext(CommunityContext).communityState
    const tokenContext = React.useContext(TokenContext).tokenContext

    /** State variables */
    const [digitInput, setDigitInput] = React.useState('')
    const [submit, setSubmit] = React.useState(false)
    const [completed, setCompleted] = React.useState(false)
    const [errorOnSubmit, setErrorOnSubmit] = React.useState(false)
    const bottomTabBarHeight = useBottomTabBarHeight()

    /** Animations */
    const offset = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ 
                translateY: withTiming(offset.value, {
                    duration: 500,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                })
            }]
        }
    })

    /** */
    const handleSubmit = () => {
        setSubmit(true)
        offset.value = -Dimensions.get('window').height + bottomTabBarHeight

        const baseMsg = { communityId: JSON.parse(communityState.currentCommunity)._id, symbol}
        const url = (tokenType == 'Parent') ? `${API_URL}/community/mintParent` : `${API_URL}/community/mintChild`
        const msg = (tokenType == 'Parent') ? {...baseMsg, initialTokenAmount: parseInt(digitInput)} : {...baseMsg, tokenAmount: parseInt(digitInput), tokenName }

        axios.post(url, msg)
        .then(res => {
            setCompleted(true)
            tokenContext.reloadChildTokens()
        })
        .catch(err => {
            setCompleted(true)
            setErrorOnSubmit(true)
            showMessage({
                message: 'Something went wrong! Check your network connection.',
                type: 'danger'
            })
        })
    }

    return (
        <Reanimated.View style={[animatedStyles, {height: '100%'}]}>
            <NumberInput 
                digitOutput={digitInput} 
                enterText={'Mint'}
                setDigitOutput={setDigitInput} 
                suggestions={['100', '250', '500', '1,000']} 
                submitHandler={handleSubmit}
            />
            {
            submit ? (
                <FlyingCards 
                    loadingComplete={completed} 
                    errorBool={errorOnSubmit} 
                    errorMessage={'Request did not go through!'} 
                    successMessage={'Minted!'}
                />
            ) : (<></>)
            }
        </Reanimated.View>
    )
}