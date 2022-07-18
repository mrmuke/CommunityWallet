import axios from 'axios'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import { 
    Dimensions, 
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Reanimated, {useAnimatedStyle, useSharedValue, withTiming, Easing} from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { API_URL } from '../../../utils/API_URL'
import { FlyingCards, NumberInput } from '../../../components'
import { WalletContext } from '../../../states/Contexts'

export function SendAmountScreen({route}) {
    const memo = route.params.memo
    const recipientId = route.params.recipientId
    const selectedToken = route.params.selectedToken

    /** Contexts and States */
    const walletContext = React.useContext(WalletContext).walletContext

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

        const url = `${API_URL}/user/sendTokens`
        const baseMsg = {amount: parseInt(digitInput), contractAddress: selectedToken.address, recipientId}
        const msg = memo ? {...baseMsg, memo} : baseMsg
        
        axios.post(url, msg)
        .then(res => {
            setCompleted(true)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            walletContext.reloadData()
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
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
    <KeyboardAvoidingView>
        <Reanimated.View style={[animatedStyles, {height: '100%'}]}>
            <NumberInput 
                digitOutput={digitInput} 
                enterText={'Send'}
                setDigitOutput={setDigitInput} 
                suggestions={['10', '15', '25', '50']} 
                submitHandler={handleSubmit}
            />
            {
            submit ? (
                <FlyingCards 
                    loadingComplete={completed} 
                    errorBool={errorOnSubmit} 
                    errorMessage={'Request did not go through!'} 
                    successMessage={'Sent!'}
                />
            ) : (<></>)
            }
        </Reanimated.View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    )  
}