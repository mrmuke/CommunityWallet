import { DefaultTheme } from '@react-navigation/native';
import { colors } from './common';

export const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.white
    },
}