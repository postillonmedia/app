import React, { PureComponent } from 'react';
import ReactNative, { ScrollView, View, Text, TouchableOpacity, Switch } from 'react-native';

import Slider from '@react-native-community/slider';
import RNPopover from 'react-native-popover-menu';

import { Themes } from '../../../../constants/themes/index';
import { LANGUAGE_DE, LANGUAGE_EN } from '../../../../constants/languages';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Config} from "../../../../constants/config";


export class SettingsScreen extends PureComponent {

    handleLocalePress = () => {
        const { t, constants } = this.props;

        const menus = [
            {
                label: t('languageTitle'),
                menus: [
                    {
                        label: t('languageDe'),
                        icon: 'de.png',
                    },
                    {
                        label: t('languageEn'),
                        icon: 'en.png',
                    }
                ]
            }
        ];

        this.refLocale && RNPopover.Show(this.refLocale, {
            ...constants.styles.popover,
            title: t('languageTitle'),
            menus,
            rowHeight: 50,
            perferedWidth: 200,
            onDone: this.handleLocaleSelectionDone,
        });
    };

    handleLocaleSelectionDone = (index, menuIndex) => {
        const { setLocale } = this.props;

        if (menuIndex === 0 || (!menuIndex && index === 0)) {
            setLocale(LANGUAGE_DE);
        } else if (menuIndex === 1 || (!menuIndex && index === 1)) {
            setLocale(LANGUAGE_EN);
        }
    };

    handleThemeChange = (enabled) => {
        const { setTheme } = this.props;

        setTheme(enabled ? Themes.DEFAULT : Themes.DARK);
    };

    handleUpdateFontSize = newFontSize => {
        const { fontSize, setFontSize } = this.props;

        if (newFontSize !== fontSize) {
            setFontSize(newFontSize);
        }
    };

    handleSetDisplayBackButton = displayBackButton => {
        const { setDisplayBackButton } = this.props;

        setDisplayBackButton(displayBackButton);
    };

    handleSetDisplayCommentsAlways = displayCommentsAlways => {
        const { setDisplayCommentsAlways} = this.props;

        setDisplayCommentsAlways(displayCommentsAlways);
    };

    handleSetTutorial = tutorial => {
        const { setTutorial } = this.props;

        setTutorial(tutorial);
    };

    handleSetDisplayArticleIntroduction = displayArticleIntroduction => {
        const { setDisplayArticleIntroduction } = this.props;

        setDisplayArticleIntroduction(displayArticleIntroduction);
    };

    handleNotificationEnable = (enabled) => {
        const { setNotification } = this.props;

        setNotification(enabled);
    };

    _refLocale = (ref) => {
        this.refLocale = ref;
    };

    render() {
        const { styles, constants, theme, t, fontSize, tutorial, displayBackButton, displayCommentsAlways, displayArticleIntroduction, notifications } = this.props;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>{t('appSection').toUpperCase()}</Text>

                <View style={styles.groupHorizontal}>
                    <View style={styles.lineSmall}>
                        <TouchableOpacity ref={this._refLocale} onPress={this.handleLocalePress}>
                            <Text style={styles.lineText}>{t('languageTitle')} <FeatherIcon name={'chevron-down'} /></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.lineBig}>
                        <FeatherIcon name={'moon'} size={20} color={theme === Themes.DARK ? constants.colors.text.highlighted : constants.colors.text.lighter} style={styles.gradientIcon} />

                        <Switch
                            value={theme === Themes.DEFAULT}
                            onValueChange={this.handleThemeChange}
                            thumbColor={theme === Themes.DEFAULT ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor }
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />

                        <FeatherIcon name={'sun'} size={20} color={theme === Themes.DEFAULT ? constants.colors.text.highlighted : constants.colors.text.lighter} style={styles.gradientIcon} />
                    </View>

                </View>


                <Text style={styles.heading}>{t('articleSection').toUpperCase()}</Text>

                <View style={styles.group}>
                    <View style={styles.line}>
                        <Text style={[styles.lineText, styles.fontSizeSliderSmall]}>A</Text>

                        <Slider style={{flex: 10,}}
                                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                                thumbTintColor={constants.colors.switches.thumbTintColor}
                                minimumTrackTintColor={constants.colors.switches.onTintColor} maximumTrackTintColor={constants.colors.switches.tintColor}
                                minimumValue={Config.article.fontsize.min} maximumValue={Config.article.fontsize.max}
                                value={fontSize} step={3} onSlidingComplete={this.handleUpdateFontSize} />

                        <Text style={[styles.lineText, styles.fontSizeSliderBig]}>A</Text>
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.lineText}>{t('displayBackButton')}</Text>

                        <Switch
                            value={displayBackButton}
                            onValueChange={this.handleSetDisplayBackButton}
                            thumbColor={displayBackButton ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.lineText}>{t('displayCommentsAlways')}</Text>

                        <Switch
                            value={displayCommentsAlways}
                            onValueChange={this.handleSetDisplayCommentsAlways}
                            thumbColor={displayCommentsAlways ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.lineText}>{t('displayTutorial')}</Text>

                        <Switch
                            value={tutorial}
                            onValueChange={this.handleSetTutorial}
                            thumbColor={tutorial ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />
                    </View>
                </View>


                <Text style={styles.heading}>{t('listingSection').toUpperCase()}</Text>

                <View style={styles.group}>
                    <View style={styles.line}>
                        <Text style={styles.lineText}>{t('displayArticleIntroduction')}</Text>

                        <Switch
                            value={displayArticleIntroduction}
                            onValueChange={this.handleSetDisplayArticleIntroduction}
                            thumbColor={displayArticleIntroduction ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />
                    </View>
                </View>


                <Text style={styles.heading}>{t('notificationSection').toUpperCase()}</Text>

                <View style={styles.group}>
                    <View style={styles.line}>
                        <Text style={[constants.styles.text.ui, { color: constants.colors.brandPrimary, textAlign: 'center' }]}>{t('maintenance')}</Text>
                    </View>

                    <View style={styles.line}>
                        <Text style={styles.lineText}>{t('notificationEnable')}</Text>

                        <Switch
                            value={notifications}
                            onValueChange={this.handleNotificationEnable}
                            thumbColor={notifications ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );

        /*
        <Switch
                            disabled={true}

                            value={false}
                            thumbColor={constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />

        <Switch
            disabled={true}

            value={notifications}
            onValueChange={this.handleNotificationEnable}
            thumbColor={notifications ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
            trackColor={{
                true: constants.colors.switches.onTintColor,
                false: constants.colors.switches.tintColor,
            }}
        />*/
    }

}

export default SettingsScreen;