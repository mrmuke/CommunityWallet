import * as Haptics from 'expo-haptics'
import * as React from 'react'
import {
    Animated,
    Image,
    LayoutAnimation,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { errorShake } from './Animations'
import { CommonStyle, colors, sz } from '../styles/common'
import { DigitKeyboard } from './Keyboard'
import { SuggestionPills } from './SuggestionPills'

export function NumberInput({ digitOutput, enterText, message, setDigitOutput, suggestions, submitHandler }) {
    const navigation = useNavigation()

    /** State variables */
    const [amountSuggestions, setAmountSuggestions] = React.useState(suggestions)
    const [buttonActive, setButtonActive] = React.useState(false)
    const [digitOutputFormatted, setDigitOutputFormatted] = React.useState('')
    const [digitFontSize, setDigitFontSize] = React.useState(sz.xxl * 2)
    const shaking = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        setButtonActive(digitOutputFormatted.length != 0 && digitOutputFormatted != '0')
    }, [digitOutputFormatted])
    
    React.useEffect(() => {
        if (digitOutput.length == 0) {
            setDigitOutputFormatted('0')
        } else if (digitOutput.length == 1 && digitOutput[0] == '0') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            errorShake(shaking)
            setDigitOutput('')
        }  else if (digitOutput.length > 6) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            errorShake(shaking)
            setDigitOutput(digitOutput.slice(0, -1))
        }
        
        if (digitOutput.length >= 5) {
            setDigitFontSize(sz.xxl*2 - 16)
        } else if (digitOutput.length > 3) {
            setDigitFontSize(sz.xxl*2 - 8)
        } else {
            setDigitFontSize(sz.xxl*2)
        }
        
        setDigitOutputFormatted(digitOutput.length == 0 ? '0' : parseInt(digitOutput).toLocaleString())
    }, [digitOutput])

    React.useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.create(100, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY))
    }, [buttonActive])

    return (
    <SafeAreaView style={[CommonStyle.container, {height: '100%'}]}>
    <View style={CommonStyle.verticalSeperator}>
        <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
            <View style={{width: '10%'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={CommonStyle.backButton} source={require('../assets/back.png')}/>
                </TouchableOpacity>
            </View>
            <View style={{width: '80%', alignItems: 'center'}}>
                <Text style={[CommonStyle.headerSm, {color: colors.black}]}></Text>
            </View>
            <View style={{width: '10%'}}></View>
        </View>
        <>
            <View style={styles.digitOutputDisplay}>
                <Animated.Text style={[CommonStyle.escapeContainer, styles.digitOutputText, {fontSize: digitFontSize, transform: [{translateX: shaking}]}]}>{digitOutputFormatted}</Animated.Text>
            </View>
            {message}
            {
            buttonActive ? (
                <TouchableOpacity style={[CommonStyle.longButton, CommonStyle.infoBox]} onPress={submitHandler}>
                    <Text style={{color: colors.white}}>{enterText}</Text>
                </TouchableOpacity>
            ) : (
                <View style={[CommonStyle.sideBySide, {alignItems: 'center', justifyContent: 'center'}]}>
                    {amountSuggestions.map(amount => SuggestionPills({ suggestion: amount, setOutput: setDigitOutput }))}
                </View>
            )
            }
        </> 
        <DigitKeyboard errorAnim={errorShake} errorAnimValue={shaking} output={digitOutput} setOutput={setDigitOutput}/>
    </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    digitOutputDisplay: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        height: sz.xxl * 2,
    },
    digitOutputText: {
        color: colors.black,
        fontWeight: sz.bold,
        textAlign: 'center',
    },
})