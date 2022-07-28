import * as Haptics from 'expo-haptics'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import { colors, sz } from '../styles/common'

export function SuggestionPills({ suggestion, setOutput, }) {
    return (
        <TouchableOpacity 
            key={`${suggestion}-suggestion`}
            style={styles.suggestionPills}
            onPress={() => {
                setOutput(suggestion)
                Haptics.selectionAsync()
            }}
        >
            <Text>{suggestion}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    suggestionPills: {
        alignItems: 'center',
        backgroundColor: colors.lighterGray, 
        borderRadius: sz.xl,
        height: sz.xl, 
        justifyContent: 'center',
        marginRight: sz.xs,
        width: sz.xl * 2, 
    }
})