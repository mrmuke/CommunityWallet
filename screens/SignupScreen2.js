import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from 'axios'
import * as React from 'react'
import { HStack, Switch } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { showMessage } from 'react-native-flash-message'
import tokens from '../i18n/tokens'
import { useTranslation } from 'react-i18next'

import { API_URL } from '../utils/API_URL'
import { AuthContext } from '../utils/Contexts'

export function SignupScreen() {
    
}