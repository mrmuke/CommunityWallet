import * as Haptics from 'expo-haptics'
import {
    Image,
    StyleSheet, 
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { CommonStyle, sz } from '../styles/common'
import { DigitButton } from './DigitButton'

export function DigitKeyboard({ errorAnim, errorAnimValue, output, setOutput }) {

    const handleBackspace = () => {
        if (output.length == 0) {
            errorAnim(errorAnimValue)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        } else {
            setOutput(output.slice(0, -1))
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }
    }
    return (
        <View style={[CommonStyle.verticalSeperator, {height: '50%', paddingBottom: sz.md, marginLeft: -sz.md, marginRight: -sz.md}]}>
            <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>{[1, 2, 3].map(i => DigitButton({number: i, output, setOutput}))}</View>
            <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>{[4, 5, 6].map(i => DigitButton({number: i, output, setOutput}))}</View>
            <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>{[7, 8, 9].map(i => DigitButton({number: i, output, setOutput}))}</View>
            <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>
                <View style={styles.digitButton}><Text style={styles.digit}></Text></View>
                <DigitButton number={0} output={output} setOutput={setOutput} />
                <TouchableOpacity style={styles.digitButton} onPress={handleBackspace}>
                    <Image style={{width: sz.lg, height: sz.lg}} source={require('../assets/close.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    digit: {
        fontSize: sz.xxl,
    },
    digitButton: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '33%',
    },
})