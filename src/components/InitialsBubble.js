import { 
    StyleSheet,
    Text,
    View,
} from 'react-native'
import { colors, sz } from '../styles/common'

import { getUserInitials } from '../utils/HelperFunctions'

export function InitialsBubble({username}) {
    return (
    <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials(username) }</Text></View>
    )
}

const styles = StyleSheet.create({
    initials: {
        fontSize: sz.md
    },
    initialsBubble: {
        alignItems: 'center', 
        backgroundColor: colors.lighterGray, 
        borderColor: colors.info, 
        borderRadius: sz.lg, 
        borderWidth: 1,
        justifyContent: 'center', 
        height: sz.xl,
        marginRight: sz.xs,
        width: sz.xl, 
    },
})