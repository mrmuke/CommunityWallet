import { StyleSheet } from 'react-native'

const sz = {
    xxxl: 60,
    xxl: 48,
    xl: 32,
    lg: 20,
    md: 16,
    sm: 12,
    xs: 6,
    xxs: 4,
    xxxs: 2
}

const colors = {
    important: '#eb6060',
    info: '#696969',
    lightGray: '#F8F8F8',
    header: '',
    clicky: '#6474E5',
    white: '#ffffff'
}

const CommonStyle = StyleSheet.create({
    container: {
        marginLeft: sz.md,
        marginRight: sz.md,
    },
    bigName: {
        fontSize: sz.xxl,
        fontWeight: 'bold',
        color: colors.important
    },
    longButton: {
        alignItems: 'center',
        backgroundColor: colors.clicky,
        borderRadius: sz.xl,
        height: sz.xxl,
        justifyContent: 'center'
    },
    infoHeader: {
        fontSize: sz.lg,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: sz.md,
    }
}) 

export {
    sz,
    colors,
    CommonStyle,
}