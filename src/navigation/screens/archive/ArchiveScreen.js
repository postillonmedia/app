import React, { PureComponent } from 'react';
import ReactNative, { BackHandler, SafeAreaView, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Animated, { Easing } from 'react-native-reanimated';
import { ThemeManager } from '@postillon/react-native-theme';

import FeatherIcon from 'react-native-vector-icons/Feather';

import merge from 'deepmerge';

import { Themes } from '../../../constants/themes';
import { getLocalizedString, Icons } from '../../../App';

import OfflineArchive from './tabs/offline';
import OnlineArchive from './tabs/online';
import OnlineArchiveControl from './tabs/online/control';


export class ArchiveScreen extends PureComponent {

    static options(passProps) {
        const { theme = Themes.DEFAULT, locale } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: false,
                drawBehind: true,
                hideOnScroll: false,
            },

            bottomTab: {
                text: getLocalizedString(locale, 'archive'),
                icon: Icons.bookmark,
                testID: 'TAB_ARCHIVE',
            },
        });
    };

    position = new Animated.Value(0);

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

        Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    componentDidDisappear() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed = () => {
        const { componentId } = this.props;

        Navigation.mergeOptions(componentId, {
            bottomTabs: {
                currentTabIndex: 0,
            }
        });

        return true;
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
        const { componentId } = this.props;

        switch (route.key) {
            case 'offline':
                return <OfflineArchive componentId={componentId} />;
            case 'online':
                return <OnlineArchive componentId={componentId} />;
            default:
                return null;
        }
    };

    render() {
        const { styles } = this.props;

        return [
            <SafeAreaView key={'archive-tabs'} style={styles.tabs}>
                <TabView
                    style={styles.tabs}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderTabBar={this._renderHeader}

                    position={this.position}
                    onIndexChange={this._handleIndexChange}
                    initialLayout={this.initialLayout}
                />
            </SafeAreaView>,

            <OnlineArchiveControl key={'archive-control'} navigationState={this.state} position={this.position} />
        ];
    }

}

export default ArchiveScreen;
