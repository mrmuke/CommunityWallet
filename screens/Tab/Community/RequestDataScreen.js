import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { CommonStyle, colors, sz } from '../../../styles/common'

export function RequestDataScreen({ route, navigation }) {
    const { request } = route.params

    return (
        <SafeAreaView style={CommonStyle.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{width: '10%'}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={CommonStyle.backButton} source={require('../../../assets/back.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={{width: '80%', alignItems: 'center'}}>
                    <Text style={{color: colors.lighterGray, fontSize: sz.xl}}> </Text>
                </View>
                <View style={{width: '10%'}}></View>
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={{color: colors.lighterGray, fontSize: sz.xl}}>Request for</Text>
                <Text style={CommonStyle.mediumName}>{request.name}</Text>
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={CommonStyle.infoHeader}>Response 1</Text>
                <Text>{request.response1}</Text>
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={CommonStyle.infoHeader}>Response 1</Text>
                <Text>{request.response2}</Text>
            </View>
            <View style={CommonStyle.infoBox}>
                <Text style={CommonStyle.infoHeader}>Response 1</Text>
                <Text>{request.response3}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})