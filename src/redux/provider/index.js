import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';


import { Provider } from 'react-redux';
import { ReactReduxContext } from 'react-redux/lib/components/Context';

import { ThemeContext } from '@postillon/react-native-theme/src/Context';
import { LocaleContext } from '@postillon/react-native-i18n/src/Context';

import { getAppSettings } from '../selectors/settings';

import dictionary from '../../resources/i18n/dictionary';


export class AppStateProvider extends Provider {

    static propTypes = {
        store: PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            dispatch: PropTypes.func.isRequired,
            getState: PropTypes.func.isRequired
        }),
        context: PropTypes.object,
        children: PropTypes.any
    };

    constructor(props) {
        super(props);

        const { storeState } = this.state;

        const { theme, locale } = getAppSettings(storeState);

        this.themeState = {
            theme,
        };

        this.localeState = {
            locale,
            dictionary,
        };
    }

    get theme() {
        return this.themeState.theme;
    }
    set theme(value) {
        this.themeState = {
            ...this.themeState,

            theme: value,
        };
    }

    get locale() {
        return this.localeState.locale;
    }
    set locale(value) {
        this.localeState = {
            ...this.localeState,

            locale: value,
        };
    }

    render = () => {
        const { storeState } = this.state;
        const Context = this.props.context || ReactReduxContext;

        const { theme, locale } = getAppSettings(storeState);

        if (theme !== this.theme) {
            this.theme = theme;
        }

        if (locale !== this.locale) {
            this.locale = locale;
        }

        return (
            <LocaleContext.Provider value={this.localeState}>
                <ThemeContext.Provider value={this.themeState}>
                    <Context.Provider value={this.state}>
                        {this.props.children}
                    </Context.Provider>
                </ThemeContext.Provider>
            </LocaleContext.Provider>
        )
    };
}


export default AppStateProvider;