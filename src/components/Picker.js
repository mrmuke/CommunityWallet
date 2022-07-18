import * as Haptics from 'expo-haptics'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { CommonStyle, colors, sz } from '../styles/common'

export function HorizontalPicker({containerStyle, inputStyle, label, selected, setSelected, values, valueKeys, }) {
    return (
    <View style={[styles.container, containerStyle]}>
    <ScrollView 
        horizontal={true} 
        keyboardDismissMode={'on-drag'}
        showsHorizontalScrollIndicator={false}
    >
    {
        values.map((v, i) => {
            return (
            <View 
                key={v[valueKeys]} 
                style={[inputStyle, styles.input, {borderColor: selected == v ? colors.lightGray : colors.white}]}
            >
                <TouchableOpacity 
                    onPress={() => {
                        setSelected(v)
                        Haptics.selectionAsync()
                        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                    }}
                >
                    <Text style={CommonStyle.headerMd}>{v[label]}</Text>
                </TouchableOpacity>
            </View>
            )
        })
    }
    </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderRadius: sz.sm,
        borderWidth: 1,
        marginRight: sz.sm,
        marginLeft: sz.sm,
        padding: sz.xxs
    }
})