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
    xxxs: 2,
    bold: '600',
    plain: '400',
}

const colors = {
    black: '#7f6060',
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
    backButton: {
        height: sz.md, 
        width: sz.md
    },
    divider: {
        backgroundColor: colors.lighterGray, 
        borderRadius: sz.sm, 
        height: sz.xxxs, 
        marginTop: sz.sm,
        width: '100%', 
    },
    escapeContainer: {
        marginLeft: -sz.md,
        marginRight: -sz.md,
        paddingLeft: sz.md,
        paddingRight: sz.md,
    },
    headerBox: {
        marginBottom: sz.lg
    },
    headerLg: {
        color: colors.black,
        fontSize: sz.xxl,
        fontWeight: sz.bold,
    },
    headerMd: {
        color: colors.black,
        fontSize: sz.xl,
        fontWeight: sz.bold,
    },
    headerSm: {
        color: colors.black,
        fontSize: sz.lg,
        fontWeight: sz.bold,
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
    infoLg: {
        color: colors.info,
        fontSize: sz.md,
        fontWeight: sz.plain,
    },
    infoMd: {
        color: colors.info,
        fontSize: sz.sm,
        fontWeight: sz.plain,
    },
    infoSm: {
        color: colors.info,
        fontSize: sz.xs,
        fontWeight: sz.plain,
    },
    infoHighlight: {
        fontWeight: sz.bold,
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    sideBySide: {
        flexDirection: 'row'
    },
    verticalSeperator: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}) 

export {
    sz,
    colors,
    CommonStyle,
}