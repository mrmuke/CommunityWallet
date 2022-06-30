import * as React from 'react'
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { CommonStyle, colors, sz } from '../styles/common'

export function CommunityRequestScreen({ navigation: { goBack } }) {
    const [response1, setResponse1] = React.useState('')
    const [response2, setResponse2] = React.useState('')
    const [response3, setResponse3] = React.useState('')


    return (
        <View>
            <ScrollView style={CommonStyle.container} showsVerticalScrollIndicator={false}>
                <View style={[CommonStyle.infoBox, {marginTop: sz.lg}]}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Image source={require('../assets/back.png')} style={{height: sz.md, width: sz.md}}/>
                    </TouchableOpacity>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={[CommonStyle.bigName, {fontSize: sz.xl}]}>Request a Community</Text>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Community Name</Text>
                    <TextInput style={[styles.smallTextInput, styles.textInput]} numberOfLines={1}>

                    </TextInput>
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Location</Text>
                    <TextInput style={[styles.smallTextInput, styles.textInput]} numberOfLines={1}>

                    </TextInput>
                </View>
                <View style={[CommonStyle.infoBox, {width: '100%', height: sz.xxxs, backgroundColor: colors.lightGray, borderRadius: sz.sm, marginTop: sz.sm}]}></View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 1</Text>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        onChangeText={text => setResponse1(text)}
                        style={[styles.smallTextInput, styles.textInput]}
                    />
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 2</Text>
                    <TextInput
                        multiline
                        numberOfLines={10}
                        onChangeText={text => setResponse2(text)}
                        style={[styles.largeTextInput, styles.textInput]}
                    />
                </View>
                <View style={CommonStyle.infoBox}>
                    <Text style={CommonStyle.infoHeader}>Response 3</Text>
                    <TextInput
                        multiline
                        numberOfLines={40}
                        onChangeText={text => setResponse3(text)}
                        style={[styles.largeTextInput, styles.textInput]}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = new StyleSheet.create({
    textInput: {
        borderColor: colors.lighterGray,
        borderRadius: sz.xs,
        borderWidth: 1,
        padding: sz.xs,
    },
    smallTextInput: {
        height: sz.xl,
    },
    largeTextInput: {
        height: 100,
    },
})