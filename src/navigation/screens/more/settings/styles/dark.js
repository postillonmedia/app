/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../../constants/themes';


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
    backgroundColor: DarkTheme.colors.bg.lighter,

    elevation: 1,
    shadowColor: DarkTheme.colors.shadow,
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
    text: DarkTheme.styles.text.ui,

    lineText: {
        flex: .8,

        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.secondary,
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
        borderBottomColor: DarkTheme.colors.border,
    },

    heading: {
        marginTop: 24,
        marginBottom: 16,
        marginLeft: 4,
        color: DarkTheme.colors.text.highlighted,
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