import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'

import { CommonStyle, colors, sz } from '../styles/common'

export function FlyingCards({ loadingComplete, errorBool, errorMessage,  successMessage}) {
    const navigation = useNavigation()

    return (
        <View style={{height: '100%'}}>
        <View style={[styles.cardLayers, {backgroundColor: colors.green}]}>
        <View style={[styles.cardLayers, {backgroundColor: colors.brown}]}>
        <View style={[styles.cardLayers, {backgroundColor: colors.pink}]}>
        <View style={[styles.cardLayers, {backgroundColor: colors.gold, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={styles.interiorCard}>
                {
                    loadingComplete ? (
                        <View>
                            <Text style={[CommonStyle.infoLg, {textAlign: 'center'}]}>{errorBool ? errorMessage : successMessage}</Text> 
                            <TouchableOpacity style={styles.doneButton} onPress={() => navigation.dispatch(StackActions.popToTop())}>
                                <Text style={[CommonStyle.infoMd, { color: colors.white, textAlign: 'center', width: sz.xxl*2}]}>Done</Text>
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <ActivityIndicator/>
                    )
                }
            </View>
        </View>
        </View>
        </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardLayers: {
        height: '100%', 
        marginTop: sz.md, 
        borderTopLeftRadius: sz.lg, 
        borderTopRightRadius: sz.lg
    },
    doneButton: {
        alignItems: 'center', 
        backgroundColor: colors.clicky1, 
        borderRadius: sz.sm, 
        height: sz.xl, 
        justifyContent: 'center',
        marginTop: sz.md, 
    },
    interiorCard: {
        alignItems: 'center',
        backgroundColor: colors.white, 
        borderRadius: sz.lg, 
        flexDirection: 'row', 
        height: sz.xxxl*2.5, 
        justifyContent: 'center', 
        width: sz.xxxl*2.5, 
    }
})