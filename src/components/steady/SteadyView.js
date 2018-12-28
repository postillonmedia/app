import React, { PureComponent } from 'react';
import ReactNative, { Image, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';

import LoggedOut from './states/loggedOut';
import LoggedIn from './states/loggedIn';
import Error from './states/error';




export class SteadyView extends PureComponent {

    static propTypes = {
        user: PropTypes.object,
        subscription: PropTypes.object,
        error: PropTypes.object,

        login: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };


    render() {
        const { styles, constants, error, login, logout, user, subscription } = this.props;

        let content;

        if (error) {
            content = <Error error={error} login={login} logout={logout} />;
        } else if (!user) {
            content = <LoggedOut />;
        } else {
            content = <LoggedIn user={user} subscription={subscription} />
        }

        return (
            <LinearGradient colors={constants.colors.gradient.highlightedInverse} style={styles.background}>
                {content}
            </LinearGradient>
        );
    }

}


export default SteadyView;