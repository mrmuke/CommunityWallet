import axios from 'axios'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import {
    Animated,
    Image,
    LayoutAnimation,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { API_URL } from '../../../utils/API_URL'
import { CommonStyle, colors, sz } from '../../../styles/common'
import { CommunityContext } from '../../../states/Contexts'


export function MintAmountScreen({ navigation, route }) {
    const tokenType = route.params.tokenType
    const symbol = route.params.symbol

    /** State */
    const communityState = React.useContext(CommunityContext).communityState

    /** State variables */
    const [amountSuggestions, setAmountSuggestions] = React.useState(['1000', '2500', '5000', '10000'])
    const [buttonActive, setButtonActive] = React.useState(false)
    const [digitInput, setDigitInput] = React.useState('')
    const [digitInputFormatted, setDigitInputFormatted] = React.useState('')
    const [digitFontSize, setDigitFontSize] = React.useState(sz.xxl * 2)
    const [screenActive, setScreenActive] = React.useState(true)
    const shaking = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        setButtonActive(digitInput.length != 0)

        if (digitInput.length == 0) {
            setDigitInputFormatted('0')
        } else if (digitInput.length == 1 && digitInput[0] == '0') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            errorShake()
            setDigitInput('')
        }  else if (digitInput.length > 6) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
            errorShake()
            setDigitInput(digitInput.slice(0, -1))
        }

        if (digitInput.length >= 5) {
            setDigitFontSize(sz.xxl*2 - 16)
        } else if (digitInput.length > 3) {
            setDigitFontSize(sz.xxl*2 - 8)
        } else {
            setDigitFontSize(sz.xxl*2)
        }

        setDigitInputFormatted(digitInput.length == 0 ? '0' : parseInt(digitInput).toLocaleString())
    }, [digitInput])

    React.useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.create(100, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY))
    }, [buttonActive])

    /** */
    const handleSubmit = data => {
        setScreenActive(false)
        const msg = {
            communityId: JSON.parse(communityState.currentCommunity)._id,
            initialTokenAmount: parseInt(digitInput),
            symbol
        }
        axios.post(`${API_URL}/community/mintParent`, msg)
        .then(res => {
            setScreenActive(true)
            console.log(res.data)
        })
        .catch(err => {
            setScreenActive(true)
            console.log(err)
        })
    }

    /** Shaking animation for error */
    const errorShake = () => {
        Animated.sequence([
          Animated.timing(shaking, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shaking, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(shaking, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shaking, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    }

    /**
     * 
     * @param {*} number 
     * @returns 
     */
    const amountSuggestionView = number => {
        return (
            <TouchableOpacity 
                key={`${number}-suggestion`}
                style={styles.numberSuggestionPills}
                onPress={() => {
                    setDigitInput(number)
                    Haptics.selectionAsync()
                }}
            >
                <Text>{number}</Text>
            </TouchableOpacity>
        )
    }

    /**
     * 
     * @param {*} number 
     * @returns 
     */
    const digitButton = number => {
        return (
            <TouchableOpacity 
                key={`${number}-button`}
                style={styles.digitButton}
                onPress={() => {
                    setDigitInput(digitInput + number)
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }}
            >
                <Text style={styles.digit}>{number}</Text>
            </TouchableOpacity>
        )
    }

    const getMintButton = () => {
        LayoutAnimation.spring()
        return (
            <TouchableOpacity 
                style={[CommonStyle.longButton, CommonStyle.infoBox]}
                onPress={() => handleSubmit()}
            >
                <Text style={{color: colors.white}}>Mint</Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView 
            pointerEvents={screenActive ? 'auto' : 'none'}
            style={CommonStyle.container}
        >
            <View style={CommonStyle.verticalSeperator}>
                <View style={[CommonStyle.spaceBetween, {alignItems: 'center'}]}>
                    <View style={{width: '10%'}}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '80%', alignItems: 'center'}}>
                        <Text style={[CommonStyle.headerSm, {color: colors.black}]}></Text>
                    </View>
                    <View style={{width: '10%'}}></View>
                </View>
                <>
                    <View style={styles.digitInputDisplay}>
                        <Animated.Text style={[CommonStyle.escapeContainer, styles.digitInputText, {fontSize: digitFontSize, transform: [{translateX: shaking}]}]}>{digitInputFormatted}</Animated.Text>
                    </View>
                    {
                        buttonActive ? (
                            <TouchableOpacity 
                                style={[CommonStyle.longButton, CommonStyle.infoBox]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={{color: colors.white}}>Mint</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={[CommonStyle.sideBySide, {alignItems: 'center', justifyContent: 'center'}]}>
                                {
                                    amountSuggestions.map(amount => amountSuggestionView(amount))
                                }
                            </View>
                        )
                    }
                </> 
                <View style={[CommonStyle.verticalSeperator, {height: '50%', paddingBottom: sz.md, marginLeft: -sz.md, marginRight: -sz.md}]}>
                    <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>
                        {
                            [1, 2, 3].map(i => digitButton(i))
                        }
                    </View>
                    <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>
                        {
                            [4, 5, 6].map(i => digitButton(i))
                        }
                    </View>
                    <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>
                        {
                            [7, 8, 9].map(i => digitButton(i))
                        }
                    </View>
                    <View style={[CommonStyle.spaceBetween, {height: '25%'}]}>
                        <View style={styles.digitButton}><Text style={styles.digit}></Text></View>
                        {digitButton(0)}
                        <TouchableOpacity 
                            style={styles.digitButton}
                            onPress={() => {
                                if (digitInput.length == 0) {
                                    errorShake()
                                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                                } else {
                                    setDigitInput(digitInput.slice(0, -1))
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                                }
                            }}
                        >
                            <Image style={{width: sz.lg, height: sz.lg}} source={require('../../../assets/close.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    digit: {
        fontSize: sz.xxl,
    },
    digitButton: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '33%',
    },
    digitInputDisplay: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        height: sz.xxl * 2,
    },
    digitInputText: {
        color: colors.black,
        fontWeight: sz.bold,
        textAlign: 'center',
    },
    numberSuggestionPills: {
        alignItems: 'center',
        backgroundColor: colors.lighterGray, 
        borderRadius: sz.xl,
        height: sz.xl, 
        justifyContent: 'center',
        marginRight: sz.xs,
        width: sz.xl * 2, 
    },
})