/**
 * Created by DanielL on 12.06.2017.
 */

import {StyleSheet, Platform} from 'react-native';

import {DarkTheme} from '../../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        // justifyContent: 'flex-end',
        // alignItems: 'center',

        backgroundColor: DarkTheme.colors.bg.lightest,

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
        color: DarkTheme.colors.text.primary,
        flex: 1,
        fontSize: 10,
        textAlign: 'left',
    },
    settingsFontSizeSliderBig: {
        color: DarkTheme.colors.text.primary,
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
    },

    settingsThemePickButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: DarkTheme.colors.border,
        marginHorizontal: 10,
        padding: 10,
        width: 100,
        alignItems: 'center',
    },
    settingsThemePickButtonText: {
        color: DarkTheme.colors.text.light,
    },
    settingsPickButtonSelected: {
        borderColor: DarkTheme.colors.brandPrimary,
    },
    settingsPickButtonTextSelected: {
        color: DarkTheme.colors.text.highlighted,
    },

    // COPY


    text: DarkTheme.styles.text.modal,

    lineText: {
        flex: .8,

        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.secondary,
        fontSize: 18,
    },

    group: {
        marginBottom: 32,
        marginHorizontal: 16,

        // borderBottomWidth: 1,
        // borderBottomColor: DarkTheme.colors.border,
    },

    lastGroup: {
        marginBottom: 2,
    },

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.border,
    },

    heading: {
        marginTop: 0,
        marginBottom: 12,
        paddingBottom: 2,

        ...DarkTheme.styles.text.modal,
        textAlign: 'center',
        color: DarkTheme.colors.text.lighter,
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: DarkTheme.colors.borderLight,
        //  backgroundColor: DarkTheme.colors.text.highlighted,
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