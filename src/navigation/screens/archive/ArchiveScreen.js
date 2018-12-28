import React, { PureComponent } from 'react';
import ReactNative, { BackHandler, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import * as GestureHandler from 'react-native-gesture-handler';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Pager from './Pager';

import OfflineArchive from './tabs/offline';
import OnlineArchive from './tabs/online';
import OnlineArchiveControl from './tabs/online/control';


export class ArchiveScreen extends PureComponent {

    constructor(props, context) {
        super(props, context);

        const { navigator, width } = props;

        this.initialLayout = {
            height: 0,
            width: width,
        };

        this.state = {
            index: 0,
            routes: [
                {
                    key: 'offline',
                    icon: 'save',
                },
                {
                    key: 'online',
                    icon: 'globe',
                },
            ],
        };

        navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onBackPressed = () => {
        const { navigator } = this.props;

        navigator.switchToTab({
            tabIndex: 0,
        });

        return true;
    };

    onNavigatorEvent = (event) => {
        const { id } = event;

        if (id === 'willAppear') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
        } else if (id === 'willDisappear') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
        }
    };

    _handleIndexChange = index => this.setState({
        index,
    });

    _renderHeader = props => {
        const { t, constants, styles } = this.props;

        return (
            <TabBar
                {...props}
                indicatorStyle={styles.tabIndicator}
                style={styles.tabBar}
                tabStyle={styles.tabItem}
                labelStyle={styles.tabLabel}
                getLabelText={({ route }) => t(route.key)}
                renderIcon={({ route }) => <FeatherIcon name={route.icon} size={16} color={constants.colors.text.primary} />}
            />
        );
    };

    _renderScene = ({ route }) => {
        const { navigator } = this.props;

        switch (route.key) {
            case 'offline':
                return <OfflineArchive navigator={navigator} />;
            case 'online':
                return <OnlineArchive navigator={navigator} />;
            default:
                return null;
        }
    };

    _renderPager = props => {
        return (
            <View style={{ flex: 1}}>
                <Pager {...props} GestureHandler={GestureHandler} swipeMinDeltaX={30} />

                <OnlineArchiveControl {...props} />
            </View>
        )
    };

    render() {
        const { styles } = this.props;

        return (
            <TabView
                style={styles.tabs}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderHeader}
                renderPager={this._renderPager}
                onIndexChange={this._handleIndexChange}
                initialLayout={this.initialLayout}
                useNativeDriver={true}
            />
        );
    }

}

export default ArchiveScreen;