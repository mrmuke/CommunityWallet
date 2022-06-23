import axios from 'axios'
import * as React from 'react'
import { 
    Text, 
    View, 
    KeyboardAvoidingView, 
    StyleSheet, 
    Keyboard, 
    TouchableOpacity,
    TouchableWithoutFeedback,  
    TextInput,
} from 'react-native'

import { API_URL } from '../utils/API_URL'
import { AuthContext, CommunityContext } from '../utils/Contexts'

export function CommunityListScreen() {
    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const commContext = React.useContext(CommunityContext).communityContext

    /** State variables */
    const [communityList, setCommunityList] = React.useState('')

    React.useEffect(() => {
        axios.post(`${API_URL}/user/listAllUserCommunities`)
        .then(res1 => {
            console.log(res1)
        })
    }, [])
}

const styles = StyleSheet.create({
    
})