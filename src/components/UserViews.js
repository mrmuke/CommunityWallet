import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { CommonStyle, sz } from '../styles/common'
import { getUserInitials } from '../utils/HelperFunctions'
import { InitialsBubble } from './InitialsBubble'

export function UserView1({ user, onPress }) {
    return (
        <TouchableOpacity key={user._id} style={{flexDirection: 'row', justifyContent: 'space-between', width: '50%'}} onPress={onPress}>
            <View style={[CommonStyle.infoBox, CommonStyle.sideBySide, {alignItems: 'center'}]}>
                <InitialsBubble username={user.username}/>
                <Text style={[CommonStyle.infoLg, {marginRight: sz.sm, fontWeight: sz.bold}]}>{ user.username }</Text>
                <Text style={CommonStyle.infoLg} numberOfLines={1} >{ user.wasmAddress }</Text>
            </View>
        </TouchableOpacity>
    )
}