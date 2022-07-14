import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { CommonStyle, colors, sz } from '../styles/common'
import { getUserInitials } from '../utils/HelperFunctions'

export function UserView1({ user, onPress }) {
    return (
        <TouchableOpacity key={user._id} style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%'}} onPress={onPress}>
            <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                <View style={styles.initialsBubble}><Text style={styles.initials}>{ getUserInitials(user.username) }</Text></View>
                <Text style={[CommonStyle.infoLg, {marginRight: sz.sm, fontWeight: sz.bold}]}>{ user.username }</Text>
                <Text style={CommonStyle.infoLg} numberOfLines={1} >{ user.wasmAddress }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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