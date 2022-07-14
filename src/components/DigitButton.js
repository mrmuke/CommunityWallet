import * as Haptics from 'expo-haptics'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'

import { sz } from '../styles/common'

export function DigitButton({number, output, setOutput}) {
    return (
        <TouchableOpacity 
            key={`${number}-button`}
            style={styles.digitButton}
            onPress={() => {
                setOutput(output + number)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }}
        >
            <Text style={styles.digit}>{number}</Text>
        </TouchableOpacity>
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