/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../../constants/themes';


const line = {
    margin: 4,
    paddingVertical: 13,
    paddingHorizontal: 16,
    minHeight: 54,

    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderRadius: 5,
    backgroundColor: DefaultTheme.colors.bg.lightest,

    elevation: 1,
    shadowColor: DefaultTheme.colors.shadow,
    shadowOffset: {
        width: 1,
        height: 1,
    },
    shadowOpacity: 0.4,
};

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    text: DefaultTheme.styles.text.ui,

    lineText: {
        flex: .8,

        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.secondary,
        fontSize: 18,
    },

    group: {
        marginBottom: 13,
    },

    groupHorizontal: {
        marginBottom: 13,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    line,

    lineSmall: {
        ...line,

        flex: .4,
    },

    lineBig: {
        ...line,

        flex: .6,
    },



    divider: {
        borderBottomWidth: 1,
        borderBottomColor: DefaultTheme.colors.border,
    },

    heading: {
        marginTop: 24,
        marginBottom: 16,
        marginLeft: 4,
        color: DefaultTheme.colors.text.highlighted,
        fontFamily: 'FiraSans-Regular',
        fontSize: 12,
    },

    fontSizeSliderSmall: {
        fontSize: 10,
        textAlign: 'left',
    },
    fontSizeSliderBig: {
        fontSize: 22,
        textAlign: 'right',
    },
});

export default styles;