import { 
    Image, 
    SafeAreaView,
    StyleSheet, 
    Text, 
    View, 
} from 'react-native'

import { CommonStyle, colors, sz } from '../../styles/common'

export function ServicesScreen() {
    return (
        <SafeAreaView style={CommonStyle.container}>
            <Text style={CommonStyle.bigName}>Services!</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})