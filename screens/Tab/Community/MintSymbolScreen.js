import axios from 'axios'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import {
    Animated,
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

import { errorShake } from '../../Components/Animations'
import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { CommunityContext } from '../../../states/Contexts'
import { showMessage } from 'react-native-flash-message'

export function MintSymbolScreen({ navigation, route }) {
    const tokenType = route.params.tokenType

    /** States and Contexts */
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [buttonActive, setButtonActive] = React.useState(false)
    const [communityData, setCommunityData] = React.useState(JSON.parse(communityState.currentCommunity))
    const [nameInput, setNameInput] = React.useState('')
    const [nameInputFontSize, setNameInputFontSize] = React.useState(sz.md)
    const [symbolError, setSymbolError] = React.useState(false)
    const [symbolInput, setSymbolInput] = React.useState('')
    const [symbolSuggestions, setSymbolSuggestions] = React.useState(['NOGO', 'NOCHI', 'NCHI', 'CHIG'])
    const shaking1 = React.useRef(new Animated.Value(0)).current
    const shaking2 = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        setButtonActive(symbolInput.length != 0 && nameInput.length != 0)
        setSymbolError(false)
    }, [symbolInput, nameInput])

    React.useEffect(() => {
        let adjNameInput = nameInput.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()).join(' ')
        
        if (adjNameInput.length > 20) {
            errorShake(shaking1)
            adjNameInput = adjNameInput.slice(0, -1)
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        }
        if (adjNameInput.length > 15) {
            setNameInputFontSize(sz.xl - 6)
        } else if (adjNameInput.length > 10) {
            setNameInputFontSize(sz.xl - 3)
        } else {
            setNameInputFontSize(sz.xl)
        }

        setNameInput(adjNameInput)
    }, [nameInput])
    
    /** */
    const handleContinue = () => {
        axios.post(`${API_URL}/community/tokenSymbolAvailability`, { tokenSymbol: symbolInput })
        .then(res => {
            if (res.data.message == 'Ok') {
                navigation.navigate('Mint Amount', { symbol: symbolInput, tokenType })
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                errorShake(shaking2)
                setSymbolError(true)
            }
        })
        .catch(err => {
            showMessage({
                message: 'Something went wrong! Check your network connection.',
                type: 'danger'
            })
        })
    }

    /**
     * 
     * @param {*} ticker 
     * @returns 
     */
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
                    <View style={[CommonStyle.infoBox, {width: '100%'}]}>
                        <Text style={[CommonStyle.infoMd, {marginBottom: sz.xxs}]}>Token Name</Text>
                        <Animated.View style={[CommonStyle.sideBySide, {transform: [{translateX: shaking1}]}]}>
                            {
                                tokenType == 'Child' ? (
                                    <TextInput
                                        autoComplete={false}
                                        autoCorrect={false}
                                        onChangeText={text => setNameInput(text)}
                                        placeholder='Token name'
                                        style={[CommonStyle.headerMd, styles.nameInput, {fontSize: nameInputFontSize}]}
                                        value={nameInput}
                                    />
                                ) : (<></>)
                            }
                            <Text style={[CommonStyle.infoLg, {fontSize: nameInputFontSize, color: 'black'}]}> Coin</Text>
                        </Animated.View>
                    </View>
                    <>
                        <Text style={[CommonStyle.infoMd, {marginBottom: sz.xxs}]}>Token Symbol</Text>
                        <ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={[CommonStyle.infoBox, CommonStyle.escapeContainer]}
                        >   
                            <View style={{alignSelf: 'center'}}>
                                <View style={[CommonStyle.sideBySide, {alignItems: 'center'}]}>
                                    {
                                        tokenType != 'Child' ? (
                                            <Text style={[CommonStyle.infoLg, {marginRight: sz.xs}]}>{communityData.name}</Text>
                                        ) : (<></>)
                                    }
                                    {symbolSuggestions.map(ticker => tickerSuggestionView(ticker))}
                                </View>
                            </View>
                        </ScrollView>
                    </>
                    <View style={CommonStyle.infoBox}>
                        {
                            symbolError ? (
                                <Text style={[CommonStyle.infoMd, {color: colors.red, textAlign: 'center'}]}>Symbol already taken</Text>
                            ) : (
                                <></>
                            )
                        }
                        <TextInput 
                            autoComplete={false}
                            autoCapitalize={'characters'}
                            autoCorrect={false}
                            maxLength={5}
                            onChangeText={text => setSymbolInput(text.toUpperCase())}
                            spellCheck={false}
                            style={[styles.symbolInput, {color: symbolError ? colors.red : 'black'}]}
                            value={symbolInput}
                        /> 
                    </View>
                    <View style={CommonStyle.infoBox}>
                        <TouchableOpacity 
                            style={[CommonStyle.longButton, {opacity: buttonActive ? 1.0 : 0.2}]}
                            disabled={!buttonActive}
                            onPress={handleContinue}
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
    nameInput: {
        borderBottomWidth: 1, 
        borderColor: 'black', 
        color: 'black', 
        fontWeight: sz.plain, 
    },
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