import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import { ThemeContext } from '@postillon/react-native-theme/src/Context';
import { LocaleContext } from '@postillon/react-native-i18n/src/Context';

import { LANGUAGE_DE } from '../../../constants/languages'
import { DEFAULT } from '../../../constants/themes/themes'

import dictionary from '../../../resources/i18n/dictionary';


export class SettingsProvider extends PureComponent {

    static propTypes = {
        theme: PropTypes.string,
        locale: PropTypes.string,
        children: PropTypes.any,
    };

    constructor(props) {
        super(props);

        const {
            locale = LANGUAGE_DE,
            theme = DEFAULT,
        } = props;

        this.state = {
            locale: {
                locale,
                dictionary,
            },

            theme: {
                theme,
            }
        };
    }

    componentDidUpdate(prevProps) {
        const { locale, theme } = this.props;

        if (theme !== prevProps.theme || locale !== prevProps.locale) {
            const nextState = { ...this.state };

            if (theme !== prevProps.theme) {
                nextState.theme = {
                    theme,
                };
            }

            if (locale !== prevProps.locale) {
                nextState.locale = {
                    ...this.state.locale,

                    locale,
                };
            }

            this.setState(nextState);
        }
    }

    render = () => {
        const { locale, theme } = this.state;

        return (
            <LocaleContext.Provider value={locale}>
                <ThemeContext.Provider value={theme}>
                    {this.props.children}
                </ThemeContext.Provider>
            </LocaleContext.Provider>
        )
    };
}


export default SettingsProvider;