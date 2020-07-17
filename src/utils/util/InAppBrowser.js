import InAppBrowser from 'react-native-inappbrowser-reborn';
import { ThemeManager } from '@postillon/react-native-theme';

import { store } from '../../redux/store';
import { getAppTheme } from '../../redux/selectors/settings';

import { onPressHandler } from './OnPressHandler';



export const open = url => {
    try {
        InAppBrowser.isAvailable()
            .then((available) => {
                if (available) {
                    const state = store.getState();
                    const theme = getAppTheme(state);

                    const constants = ThemeManager.getConstantsForTheme(theme);

                    InAppBrowser.open(url, constants.styles.customTabs)
                } else {
                    onPressHandler(url);
                }
            })
            .catch(() => {
                onPressHandler(url);
            });
    } catch (error) {
        console.error('Could not open "' + url + '".', error);
    }
};

export default {
    open,
};