import axios from 'axios'
import * as React from 'react'
import { Dimensions, Text } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Reanimated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { API_URL } from '../../../utils/API_URL'
import { FlyingCards, NumberInput } from '../../../components'
import { CommunityContext, TokenContext } from '../../../states/Contexts'
import { colors, CommonStyle, sz } from '../../../styles/common'

export function MintMoreScreen({ route }) {
    const contractAddress = route.params.contractAddress

    /** Contexts and States */
    const communityState = React.useContext(CommunityContext).communityState
    const tokenContext = React.useContext(TokenContext).tokenContext

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

    const [tokenData, setTokenData] = React.useState('')
    React.useEffect(() => {
        axios.post(`${API_URL}/community/tokenData`, { contractAddress })
        .then(res => {
            setTokenData(res.data.data)
        })
        .catch(err => {

        })

    }, [])

    /** */
    const handleSubmit = () => {
        setSubmit(true)
        offset.value = -Dimensions.get('window').height + bottomTabBarHeight

        const url = `${API_URL}/community/mintChild`
        const msg = { communityId: JSON.parse(communityState.currentCommunity)._id, contractAddress, tokenAmount: parseInt(digitInput) }

        axios.post(url, msg)
        .then(res => {
            setCompleted(true)
            console.log(res.data)
            tokenContext.reloadChildTokens()
        })
        .catch(err => {
            setCompleted(true)
            setErrorOnSubmit(true)
            console.log(err)
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
                setDigitOutput={setDigitInput} 
                suggestions={['100', '250', '500', '1,000']} 
                submitHandler={handleSubmit}
                message={<Text style={[CommonStyle.headerSm, {color: 'black'}]}>Current Supply: <Text style={[CommonStyle.headerSm, {color: colors.lightGray}]}>{tokenData.total_supply}</Text></Text>}
            />
            {
                submit ? (
                    <FlyingCards loadingComplete={completed} errorBool={errorOnSubmit} errorMessage={'Request did not go through!'} successMessage={'Minted!'}/>
                ) : (<></>)
            }
        </Reanimated.View>
    )
}