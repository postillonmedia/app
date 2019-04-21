import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';


import { Provider } from 'react-redux';
import { ReactReduxContext } from 'react-redux/lib/components/Context';

import SettingsProvider from './settings'


export class AppStateProvider extends PureComponent {

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
    }

    render = () => {
        const {
            store,
            context = ReactReduxContext,
        } = this.props;

        return (
            <Provider store={store} context={context}>
                <SettingsProvider>
                    {this.props.children}
                </SettingsProvider>
            </Provider>
        );
    };
}


export default AppStateProvider;