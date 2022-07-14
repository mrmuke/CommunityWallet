import { 
    ActivityIndicator, 
    Image, 
    StyleSheet, 
    View 
} from 'react-native'

export function SplashScreen() {
    return (
        <View style={ styles.container }>
            <Image
                source={ require('../../assets/logo.png')}
                style={ styles.image }
            />
            <ActivityIndicator
                animating={true}
                color="orange"
                size="large"
                style={ styles.activityIndicator }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        margin: 30,
        resizeMode: 'contain',
        width: '90%',
    }
})