import * as React from 'react'
import {
    Animated
} from 'react-native'

/** Shaking animation for error */
const errorShake = (animValue) => {
    Animated.sequence([
        Animated.timing(animValue, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(animValue, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(animValue, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(animValue, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start()
}

export {
    errorShake
}