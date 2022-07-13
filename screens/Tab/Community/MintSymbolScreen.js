import * as Haptics from 'expo-haptics'
import * as React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

import { CommonStyle, colors, sz } from '../../../styles/common'
import { CommunityContext } from '../../../states/Contexts'


export function MintSymbolScreen({ navigation, route }) {
    const tokenType = route.params.tokenType

    /** States and Contexts */
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [buttonActive, setButtonActive] = React.useState(false)
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))
    const [symbolInput, setSymbolInput] = React.useState('')
    const [symbolSuggestions, setSymbolSuggestions] = React.useState(['NOGO', 'NOCHI', 'NCHI', 'CHIG'])

    React.useEffect(() => {
        setButtonActive(symbolInput.length != 0)
    }, [symbolInput])

    const tickerSuggestionView = ticker => {
        return (
            <TouchableOpacity 
                key={`${ticker}-suggestion`}
                style={styles.symbolSuggestionPills}
                onPress={() => {
                    setSymbolInput(ticker)
                    Haptics.selectionAsync()
                }}
            >
                <Text>{ticker}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView>
            <SafeAreaView style={[CommonStyle.container, CommonStyle.verticalSeperator]}>
                <View style={[CommonStyle.infoBox, CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <View style={{width: '10%'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={CommonStyle.backButton} source={require('../../../assets/close.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '80%', alignItems: 'center'}}>
                        <Text style={[CommonStyle.headerSm, {color: colors.black}]}>Mint {tokenType}</Text>
                    </View>
                    <View style={{width: '10%'}}></View>
                </View>
                <View>
                    <View>
                        <Text style={CommonStyle.infoMd}>Token Symbol</Text>
                    </View>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={[CommonStyle.infoBox, CommonStyle.escapeContainer]}
                    >   
                        <View style={{alignSelf: 'center'}}>
                            <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                                <Text style={[CommonStyle.infoLg, {marginRight: sz.xs}]}>{communityData.name}</Text>
                                {
                                    symbolSuggestions.map(ticker => tickerSuggestionView(ticker))
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={CommonStyle.infoBox}>
                        <TextInput 
                            autoComplete={false}
                            autoCapitalize={'characters'}
                            autoCorrect={false}
                            maxLength={5}
                            onChangeText={text => setSymbolInput(text.toUpperCase())}
                            spellCheck={false}
                            style={styles.symbolInput}
                            value={symbolInput}
                        /> 
                    </View>
                    <View style={CommonStyle.infoBox}>
                        <TouchableOpacity 
                            style={[CommonStyle.longButton, {opacity: buttonActive ? 1.0 : 0.2}]}
                            disabled={!buttonActive}
                            onPress={() => navigation.navigate('Mint Amount', { symbol: symbolInput, tokenType })}
                        >
                            <Text style={[CommonStyle.infoMd, {color: colors.white}]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View></View>
            </SafeAreaView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    symbolInput: {
        borderBottomWidth: 1,
        borderColor: 'black',
        height: sz.xxl * 2,
        fontSize: sz.xxl * 2,
        fontWeight: sz.bold,
        textAlign: 'center',
    },
    symbolSuggestionPills: {
        alignItems: 'center',
        backgroundColor: colors.lighterGray, 
        borderRadius: sz.xl,
        height: sz.xl, 
        justifyContent: 'center',
        marginRight: sz.xs,
        width: sz.xl * 2, 
    },
})