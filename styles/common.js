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
    brown: '#BC735E',
    clicky1: '#0075F2',
    clicky2: '#6474E5',
    gold: '#F5C36B',
    green: '#C3EBC0',
    red: '#EB6060',
    info: '#696969',
    lightGray: '#B7B7B7',
    lighterGray: '#F8F8F8',
    pink: '#D47EAF',
    white: '#FFFFFF'
}

const CommonStyle = StyleSheet.create({
    container: {
        marginLeft: sz.md,
        marginRight: sz.md,
    },
    bigHeader: {
        fontSize: sz.xl,
        color: colors.lightGray,
        fontWeight: '400'
    },
    backButton: {
        height: sz.md, 
        width: sz.md
    },
    bigName: {
        fontSize: sz.xxl,
        fontWeight: 'bold',
        color: colors.red
    },
    longButton: {
        alignItems: 'center',
        backgroundColor: colors.clicky1,
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
        color: colors.red
    },
}) 

export {
    sz,
    colors,
    CommonStyle,
}