/**
 * Created by DanielL on 12.06.2017.
 */

import { StyleSheet } from 'react-native';

import { DarkTheme } from '../../../../constants/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    parameterBar: {
        height: 40,
        backgroundColor: DarkTheme.colors.bg.lighter,
        flexDirection: 'row',

        elevation: 1,
    },

    parameterOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parameterOptionText: {
        ...DarkTheme.styles.text.ui,
        color: DarkTheme.colors.text.primary,
    },
    parameterOptionTextSelected: {
        ...DarkTheme.styles.text.ui,

        fontWeight: 'bold',
        color: DarkTheme.colors.text.highlighted,
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

    text: DarkTheme.styles.text.ui,
});

export default styles;