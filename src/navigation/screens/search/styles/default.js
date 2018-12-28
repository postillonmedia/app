/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DefaultTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    parameterBar: {
        height: 40,
        backgroundColor: DefaultTheme.colors.bg.lightest,
        flexDirection: 'row',

        elevation: 1,
    },

    parameterOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parameterOptionText: {
        ...DefaultTheme.styles.text.ui,
        color: DefaultTheme.colors.text.primary,
    },
    parameterOptionTextSelected: {
        ...DefaultTheme.styles.text.ui,

        fontWeight: 'bold',
        color: DefaultTheme.colors.text.highlighted,
    },

    listFooter: {
        paddingVertical: 25,
    },

    emptyListContainer: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        paddingVertical: 25,
    },

    spacer: {
        height: 16,
    },

    text: DefaultTheme.styles.text.ui,
});

export default styles;