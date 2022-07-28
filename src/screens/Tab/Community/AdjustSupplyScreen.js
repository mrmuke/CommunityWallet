import axios from 'axios'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import { Dimensions, Text } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Reanimated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { API_URL } from '../../../utils/API_URL'
import { FlyingCards, NumberInput } from '../../../components'
import { CommunityContext, TokenContext } from '../../../states/Contexts'
import { CommonStyle } from '../../../styles/common'

export function AdjustSupplyScreen({ route }) {
    const action = route.params.action
    const tokenData = route.params.tokenData

    /** Contexts and States */
    const communityState = React.useContext(CommunityContext).communityState
    const tokenContext = React.useContext(TokenContext).tokenContext

    /** State variables */
    const [completed, setCompleted] = React.useState(false)
    const [digitInput, setDigitInput] = React.useState('')
    const [errorOnSubmit, setErrorOnSubmit] = React.useState(false)
    const [submit, setSubmit] = React.useState(false)
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

        const url = `${API_URL}/community/${action == 'mint' ? 'mintMore' : 'burn'}`
        const msg = { communityId: JSON.parse(communityState.currentCommunity)._id, contractAddress: tokenData.address, tokenAmount: parseInt(digitInput) }

        axios.post(url, msg)
        .then(res => {
            setCompleted(true)
            tokenContext.reloadChildTokens()
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        })
        .catch(err => {
            setCompleted(true)
            setErrorOnSubmit(true)
            showMessage({
                message: 'Something went wrong! Check your network connection.',
                type: 'danger'
            })
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        })
    }

    return (
        <Reanimated.View style={[animatedStyles, {height: '100%'}]}>
            <NumberInput 
                digitOutput={digitInput} 
                enterText={action == 'mint' ? 'Mint' : 'Burn'}
                setDigitOutput={setDigitInput} 
                suggestions={action == 'mint' ? ['100', '250', '500', '1,000'] : ['50', '75', '100', '125']} 
                submitHandler={handleSubmit}
                message={<Text style={[CommonStyle.infoLg, {textAlign: 'center'}]}>Total supply {tokenData.supply}</Text>}
            />
            {
                submit ? (
                    <FlyingCards 
                        loadingComplete={completed} 
                        errorBool={errorOnSubmit} 
                        errorMessage={'Request did not go through!'} 
                        successMessage={action == 'mint' ? 'Minted!' : 'Burned!'}
                    />
                ) : <></>
            }
        </Reanimated.View>
    )
}