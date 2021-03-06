import React, { PureComponent } from 'react';
import ReactNative, { Linking, ScrollView, View, Text } from 'react-native';

import merge from 'deepmerge';

import { ThemeManager } from '@postillon/react-native-theme';
import { InAppBrowser } from '../../../../utils/util';

import { Themes } from '../../../../constants/themes';

import Firebase from '../../../../utils/firebase';

import Package from '../../../../../package.json';


export class AboutScreen extends PureComponent {

    static options(passProps) {
        const { theme = Themes.DEFAULT } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: true,
                drawBehind: false,
                hideOnScroll: false,
            },
        });
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            token: null,
        };

        const iid = Firebase.iid();

        iid.getToken().then(token => {
            this.setState({
                token,
            });
        })
    }

    handleRepositoryPress = () => {
        this.openCustomTab(Package.repository);
    };

    handleEmailPress = (email) => () => {
        const url = 'mailto:' + email;

        Linking.canOpenURL(url)
            .then(() => {
                Linking.openURL(url);
            })
    };

    handleUrlPress = (url) => () => {
        this.openCustomTab(url);
    };

    handleDependencyPressed = (name) => () => {
        const baseUrl = 'https://www.npmjs.com/package/';

        this.openCustomTab(baseUrl + name);
    };

    openCustomTab = (url) => {
        InAppBrowser.open(url);
    };

    renderAppInfo = () => {
        const { styles, t } = this.props;

        return (
            <View style={styles.content} key={'app'}>
                <Text style={styles.heading}>{t('app').toUpperCase()}</Text>

                <Text style={styles.text}>{t('name')}: {Package.name}</Text>

                <Text style={styles.text}>{t('version')}: {Package.version}</Text>

                <Text style={styles.text}>{t('repository')}: <Text onPress={this.handleRepositoryPress}>{Package.repository}</Text></Text>
            </View>
        );
    };

    renderContributors = () => {
        const { styles, t } = this.props;
        const content = [];

        for (let contributor of Package.contributors) {
            content[content.length] = (
                <View key={'contributor-' + contributor.name} style={styles.developer}>
                    <Text style={[styles.text, styles.bold]}>{contributor.name}</Text>

                    {contributor.email &&
                        <Text style={styles.text}>{t('email')}: <Text onPress={this.handleEmailPress(contributor.email)}>{contributor.email}</Text></Text>
                    }
                    {contributor.url &&
                        <Text style={styles.text}>{t('url')}: <Text onPress={this.handleUrlPress(contributor.url)}>{contributor.url}</Text></Text>
                    }
                </View>
            )
        }

        return (
            <View style={styles.content} key={'developers'}>
                <Text style={styles.heading}>{t('developers').toUpperCase()}</Text>

                {content}
            </View>
        );
    };

    renderDependencies = () => {
        const { styles, t } = this.props;
        const content = [];

        for (let dependency in Package.dependencies) {
            if (!Package.dependencies.hasOwnProperty(dependency)) {
                continue;
            }

            const version = Package.dependencies[dependency];

            content[content.length] = <Text style={styles.text} key={'dependency-' + dependency} onPress={this.handleDependencyPressed(dependency)}>{dependency}: {version}</Text>
        }

        return (
            <View style={styles.content} key={'dependencies'}>
                <Text style={styles.heading}>{t('dependencies').toUpperCase()}</Text>

                {content}
            </View>
        );
    };

    renderToken = () => {
        const { styles, t } = this.props;
        const { token } = this.state;

        if (token) {
            return (
                <View style={styles.content} key={'token'}>
                    <Text style={styles.heading}>Token</Text>

                    <Text style={styles.text} selectable={true}>{token}</Text>
                </View>
            );
        }

        return null;
    };

    render() {
        const { locale, styles } = this.props;

        return (
            <ScrollView style={styles.container}>

                {this.renderAppInfo()}

                {this.renderContributors()}

                {this.renderDependencies()}

                {this.renderToken()}

            </ScrollView>
        );
    }

}

export default AboutScreen;