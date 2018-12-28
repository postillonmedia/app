import React, { PureComponent } from 'react';
import ReactNative, { Linking, ScrollView, View, Text, TouchableOpacity, Picker, Slider, Switch } from 'react-native';

import { CustomTabs } from 'react-native-custom-tabs';

import Package from '../../../../../package.json';


export class AboutScreen extends PureComponent {

    constructor(props, context) {
        super(props, context);
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
        const { constants } = this.props;

        CustomTabs.openURL(url, constants.styles.customTabs);
    };

    renderAppInfo = () => {
        const { styles, t } = this.props;

        return (
            <View style={styles.content}>
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
            <View style={styles.content}>
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

            content[content.length] = <Text style={styles.text} onPress={this.handleDependencyPressed(dependency)}>{dependency}: {version}</Text>
        }

        return (
            <View style={styles.content}>
                <Text style={styles.heading}>{t('dependencies').toUpperCase()}</Text>

                {content}
            </View>
        );
    };

    render() {
        const { locale, styles } = this.props;

        return (
            <ScrollView style={styles.container}>

                {this.renderAppInfo()}

                {this.renderContributors()}

                {this.renderDependencies()}

            </ScrollView>
        );
    }

}

export default AboutScreen;