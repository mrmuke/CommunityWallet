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
    clicky: '#0075F2',
    important: '#EB6060',
    info: '#696969',
    lightGray: '#F8F8F8',
    lighterGray: '#B7B7B7',
    white: '#FFFFFF'
}

const CommonStyle = StyleSheet.create({
    container: {
        marginLeft: sz.md,
        marginRight: sz.md,
    },
    bigHeader: {
        fontSize: sz.xl,
        color: colors.lighterGray,
        fontWeight: '400'
    },
    backButton: {
        height: sz.md, 
        width: sz.md
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
        height: sz.xxl-4,
        justifyContent: 'center'
    },
    infoBox: {
        marginBottom: sz.md,
    },
    infoHeader: {
        fontSize: sz.lg,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: sz.md,
        color: colors.info
    },
    mediumName: {
        fontSize: sz.xl,
        fontWeight: 'bold',
        color: colors.important
    },
}) 

export {
    sz,
    colors,
    CommonStyle,
}