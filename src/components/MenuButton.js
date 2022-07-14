import {
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { CommonStyle, sz } from '../styles/common'

export function MenuButton({ image, message, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{marginBottom: sz.sm}}>
            <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                {image}
                <View style={{width: '90%'}}>
                    <View style={{height:sz.xxxs, marginBottom: sz.xs}}></View>
                    <Text style={[CommonStyle.infoLg]}>{message}</Text>
                    <View style={[CommonStyle.divider, {marginTop: sz.xs}]}></View>
                </View>
            </View>
        </TouchableOpacity>
    )
}