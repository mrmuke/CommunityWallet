import * as React from 'react'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

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

export function CommunityCodeScreen() {

    /** Contexts */
    const authContext = React.useContext(AuthContext).authContext
    const commContext = React.useContext(CommunityContext).communityContext

    /** State variables */
    const [commCode, setCommCode] = React.useState('')
    const [initialSubmit, setInitialSubmit] = React.useState(false)
    const [inputErrors, setInputErrors] = React.useState([])

    React.useEffect(() => {
        if (initialSubmit) { pushInputErrors() }
    }, [commCode])

    /** Checking inputs */
    const inputsFilled = () => {
        return (commCode.length == 0)
    }
    const pushInputErrors = () => {
        setInputErrors([])
        let errList = []
        if (commCode.length == 0) { errList.push('commCode') }
        setInputErrors(errList)
    }
    const getInputStyle = str => {
        if (inputErrors.includes(str)) {
            return {...styles.inputView, ...styles.error}
        } else {
            return styles.inputView
        }
    }

    /** Submit button styles and `button enabled` bool */
    const getSubmitStyle = () => {
        if (inputsFilled()) {
            return {...styles.enterBtn, ...styles.disabledButton}
        } else {
            return styles.enterBtn
        }
    }

    /** Handle add community request  */
    const handleAddCommunity = () => {
        setInitialSubmit(true)
        axios.post(`${API_URL}/community/getOneByCode`, { communityCode: commCode })
        .then(async res1 => {
            const communityId = res1.data.data.id.toString()
            const res2 = await axios.post(`${API_URL}/user/addCommunity`, { communityId })
            commContext.enterCommunity({
                community: res2.data.data
            })
        })
        .catch(err => {
            showMessage({
                message: 'Community Not Found!',
                type: 'danger'
            })
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <KeyboardAvoidingView style={styles.container}>
            <View style={{marginBottom: 30}}>
                <Text style={{fontSize: 30, color: "#eb6060", fontWeight: "bold"}}>Choose a Community</Text>
            </View>
            <View style={getInputStyle('commCode')}>
                <TextInput
                    style={styles.inputText}
                    placeholder={'Enter community code...'}
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {setCommCode(text)}}
                />
            </View>

            <TouchableOpacity
                onPress={handleAddCommunity}
                style={getSubmitStyle()}
                disabled={inputsFilled()}
            >
                <Text>Enter</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    enterBtn: {
        alignItems: "center",
        backgroundColor: "#6474E5",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        marginBottom: 0,
        marginTop: 23,
        width: "80%",
    },
    disabledButton: {
        backgroundColor: '#aab3f1'
    },
    inputText: {
        color: "black",
        height: 50,
    },
    inputView: {
        backgroundColor: "#e9ecfb",
        borderRadius: 25,
        justifyContent: "center",
        height: 50,
        marginBottom: 10,
        padding: 20,
        width: "80%",
    },
    error:{
        borderColor:"#cc0000",
        borderWidth:2,
    },
})