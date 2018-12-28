/**
 * Created by DanielL on 12.06.2017.
 */

import {StyleSheet, Platform} from 'react-native';

import {DefaultTheme} from '../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        // justifyContent: 'flex-end',
        // alignItems: 'center',

        backgroundColor: DefaultTheme.colors.bg.lightest,

        padding: 20,
        borderRadius: 10,

        // paddingHorizontal: 16, 
    },

    option: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 8,
    },

    settingsFontSizeSlider: {
        flex: 10,
    },
    settingsFontSizeSliderSmall: {
        color: DefaultTheme.colors.text.primary,
        flex: 1,
        fontSize: 10,
        textAlign: 'left',
    },
    settingsFontSizeSliderBig: {
        color: DefaultTheme.colors.text.primary,
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
    },

    settingsThemePickButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: DefaultTheme.colors.border,
        marginHorizontal: 10,
        padding: 10,
        width: 100,
        alignItems: 'center',
    },
    settingsThemePickButtonText: {
        color: DefaultTheme.colors.text.light,
    },
    settingsPickButtonSelected: {
        borderColor: DefaultTheme.colors.brandPrimary,
    },
    settingsPickButtonTextSelected: {
        color: DefaultTheme.colors.text.highlighted,
    },

    // COPY


    text: DefaultTheme.styles.text.modal,

    lineText: {
        flex: .8,

        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.secondary,
        fontSize: 18,
    },

    group: {
        marginBottom: 32,
        marginHorizontal: 16,

        // borderBottomWidth: 1,
        // borderBottomColor: DefaultTheme.colors.border,
    },

    lastGroup: {
        marginBottom: 2,
    },

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: DefaultTheme.colors.border,
    },

    heading: {
        marginTop: 0,
        marginBottom: 12,
        paddingBottom: 2,

        ...DefaultTheme.styles.text.modal,
        textAlign: 'center',
        color: DefaultTheme.colors.text.lighter,
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: DefaultTheme.colors.borderLight,
        //  backgroundColor: DefaultTheme.colors.text.highlighted,
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