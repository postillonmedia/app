import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
    ActivityIndicator,
    BackHandler,
    Clipboard,
    View,
    Text,
    Image,
    Modal,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';

import merge from 'deepmerge';

import { Navigation } from 'react-native-navigation';
// TODO: import Toast from 'react-native-toast-native';
import Firebase from '../../../utils/firebase';

import { ThemeManager } from '@postillon/react-native-theme';
import { InAppBrowser } from '@matt-block/react-native-in-app-browser';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { onPressHandler } from './../../../utils/util';
import { debounce } from '../../../utils/util';
import { Config } from '../../../constants';
import { Themes } from '../../../constants/themes';

import { getLocalizedString, Icons } from '../../../App';

import Steady from '../../../components/steady';



export class MoreScreen extends Component {

    static propTypes = {
        year: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
    };

    static defaultProps = {
        year: new Date().getFullYear(),
    };

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
                text: getLocalizedString(locale,'more'),
                icon: Icons.more,
                testID: 'TAB_MORE'
            }
        });
    };

    modalSteadyLogin = null;

    constructor(props, context) {
        super(props, context);

        // debounce navigation functions
        this.handleBtnSettingsPressed = debounce(this.handleBtnSettingsPressed, Config.debounce.navigation, this);
        this.handleImprintPress = debounce(this.handleImprintPress, Config.debounce.navigation, this);
        this.handlePrivacyPolicyPress = debounce(this.handlePrivacyPolicyPress, Config.debounce.navigation, this);
        this.handleAboutPress = debounce(this.handleAboutPress, Config.debounce.navigation, this);

        this.state = {
            singleGiftOverviewVisible: false,
            interstitialIsLoading: false,
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

    setSingleGiftOverviewVisibility = (visible) => {
        this.setState({
            singleGiftOverviewVisible: visible,
        });
    };

    handleBtnSettingsPressed = () => {
        const { componentId, t, locale, theme } = this.props;

        Navigation.push(componentId,{
            component: {
                id: 'postillon.more.Settings',
                name: 'postillon.more.Settings',
                passProps: {
                    theme,
                    locale,
                },
                options: {
                    topBar: {
                        title: {
                            text: t('settings')
                        }
                    }
                }
            }
        });
    };

    handlePaymentInfoLongPress = () => {
        const { t, constants } = this.props;

        Clipboard.setString(t('support_with_single_gift_modal_bankinfo'));

        // TODO
        // Toast.show(t('support_with_single_gift_modal_bankinfo_copied'), Toast.SHORT, Toast.CENTER, constants.styles.toast);
    };

    handlePaymentPaypalPress = () => {
        this.openCustomTab('https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QJHR9T4Y5NJF6');
    };

    handleShopillon = () => {
        this.openCustomTab('https://www.der-postillon-shop.com/');
    };

    handleRateAppPress = () => {
        onPressHandler('market://details?id=com.postillon', this.openCustomTab('https://play.google.com/store/apps/details?id=com.postillon'));
    };

    handleSupportWithAdPress = () => {
        this.openCustomTab('http://www.der-postillon.com/p/auf-der-postilloncom-werben.html');
    };

    handleSupportWatchAdPress = () => {
        const { constants, t } = this.props;
        const { interstitialIsLoading } = this.state;

        if (interstitialIsLoading) {

        } else {
            this.setState({
                interstitialIsLoading: true,
            }, () => {
                const advert = Firebase.admob().interstitial(Config.keys.admob.interstitial);

                const AdRequest = Firebase.admob.AdRequest;
                const request = new AdRequest();

                advert.on('onAdLoaded', () => {
                    advert.show();

                    this.setState({
                        interstitialIsLoading: false,
                    });
                });

                advert.on('onAdFailedToLoad', (e) => {
                    // TODO
                    // Toast.show(t('support_watch_ad_failed'), Toast.SHORT, Toast.BOTTOM, constants.styles.toast);

                    this.setState({
                        interstitialIsLoading: false,
                    });
                });



                // Load the advert with our AdRequest
                advert.loadAd(request.build());
            });
        }
    };

    handleYoutubePress = () => {
        this.openCustomTab('https://www.youtube.com/user/Postillon24');
    };

    handleFaktillionPress = () => {
        onPressHandler('fb://page/943835679031804', 'fb://facewebmodal/f?href=https://www.facebook.com/Faktillon/', this.openCustomTab('https://www.facebook.com/Faktillon/'))
    };

    handleFAQPress = () => {
        this.openCustomTab('http://www.der-postillon.com/p/faq.html');
    };

    handleHistoryPress = () => {
        this.openCustomTab('http://www.der-postillon.com/p/der-postillon-1845-2010.html');
    };

    handlePrivacyPolicyPress = () => {
        const { componentId, t, locale, theme } = this.props;

        Navigation.push(componentId,{
            component: {
                id: 'postillon.more.PrivacyPolicy',
                name: 'postillon.more.PrivacyPolicy',
                passProps: {
                    theme,
                    locale,
                },
                options: {
                    topBar: {
                        title: {
                            text: t('privacyPolicy')
                        }
                    }
                }
            }
        });
    };

    handleImprintPress = () => {
        const { componentId, t, locale, theme } = this.props;

        Navigation.push(componentId,{
            component: {
                id: 'postillon.more.Imprint',
                name: 'postillon.more.Imprint',
                passProps: {
                    theme,
                    locale,
                },
                options: {
                    topBar: {
                        title: {
                            text: t('imprint')
                        }
                    }
                }
            }
        });
    };

    handleDocumentationPress = () => {
        this.openCustomTab('https://development.the-postillon.com');
    };

    handleGithubPress = () => {
        this.openCustomTab('https://github.com/postillonmedia');
    };

    handleAboutPress = () => {
        const { componentId, t, locale, theme } = this.props;

        Navigation.push(componentId,{
            component: {
                id: 'postillon.more.About',
                name: 'postillon.more.About',
                passProps: {
                    theme,
                    locale,
                },
                options: {
                    topBar: {
                        title: {
                            text: t('about')
                        }
                    }
                }
            }
        });
    };

    openCustomTab = (url) => {
        const { constants } = this.props;

        InAppBrowser.open(url, constants.styles.customTabs);
    };

    render() {
        const { styles, constants, t, year } = this.props;
        const { singleGiftOverviewVisible, interstitialIsLoading } = this.state;

        return (
            <ScrollView>
                <Modal
                    transparent={true}
                    animationType={'fade'}
                    hardwareAccelerated={true}
                    visible={singleGiftOverviewVisible}
                    onRequestClose={() => this.setSingleGiftOverviewVisibility(false)}
                >
                    <TouchableWithoutFeedback onPress={() => this.setSingleGiftOverviewVisibility(false)}>
                        <View style={styles.singleGiftContainer}>
                            <TouchableWithoutFeedback>
                                <View style={styles.singleGiftInnerContainer}>
                                    <Text style={styles.text}>{t('support_with_single_gift_modal_intro')}</Text>
                                    <Text
                                        style={[styles.text, styles.singleGiftBankInfo]}
                                        onLongPress={this.handlePaymentInfoLongPress}>
                                        {t('support_with_single_gift_modal_bankinfo')}
                                    </Text>
                                    <Text style={styles.text}>{t('support_with_single_gift_modal_paypal')}</Text>
                                    <Text
                                        style={[styles.text, styles.singleGiftPaypal]}
                                        onPress={this.handlePaymentPaypalPress}
                                    >
                                        {t('support_with_single_gift_modal_paypal_spend')}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <Steady />


                <View style={styles.group}>
                    <TouchableOpacity onPress={this.handleBtnSettingsPressed} style={[styles.button, styles.iconContainerInside, styles.settingsButton]}>
                        <View style={styles.iconContainer}>
                            <FeatherIcon style={styles.buttonText} name={'settings'} size={20} />
                            <Text style={styles.buttonText} numberOfLines={1}>{t('settings')}</Text>
                        </View>
                        <FeatherIcon name={'chevron-right'} size={20} color={constants.colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>{t('support').toUpperCase()}</Text>

                <View style={styles.group}>
                    <TouchableOpacity style={styles.button} onPress={this.handleShopillon}>
                        <FeatherIcon style={styles.buttonText} name={'shopping-cart'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('shopillon')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleRateAppPress}>
                        <FeatherIcon style={styles.buttonText} name={'thumbs-up'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('rate')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.setSingleGiftOverviewVisibility(true)}>
                        <FeatherIcon style={styles.buttonText} name={'gift'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('support_with_single_gift')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleSupportWithAdPress}>
                        <FeatherIcon style={styles.buttonText} name={'crosshair'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('support_with_ad')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.iconContainerInside]} onPress={this.handleSupportWatchAdPress} disabled={interstitialIsLoading}>
                        <View style={styles.iconContainer}>
                            <FeatherIcon style={styles.buttonText} name={'tv'} size={20} />
                            <Text style={styles.buttonText} numberOfLines={1}>{t('support_watch_ad')}</Text>
                        </View>
                        {interstitialIsLoading && <ActivityIndicator color={constants.colors.activityIndicator} animating={true} />}
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>{t('other').toUpperCase()}</Text>

                <View style={styles.group}>
                    <TouchableOpacity style={styles.button} onPress={this.handleFaktillionPress}>
                        <FeatherIcon style={styles.buttonText} name={'facebook'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('faktillon')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleYoutubePress}>
                        <FeatherIcon style={styles.buttonText} name={'video'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('postillon24')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleFAQPress}>
                        <FeatherIcon style={styles.buttonText} name={'help-circle'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('faq')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleHistoryPress}>
                        <FeatherIcon style={styles.buttonText} name={'clock'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('history', [year])}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handlePrivacyPolicyPress}>
                        <FeatherIcon style={styles.buttonText} name={'shield'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('privacyPolicy')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleImprintPress}>
                        <FeatherIcon style={styles.buttonText} name={'file-text'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('imprint')}</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.heading}>{t('development').toUpperCase()}</Text>

                <View style={styles.group}>
                    <TouchableOpacity style={styles.button} onPress={this.handleDocumentationPress}>
                        <FeatherIcon style={styles.buttonText} name={'book'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('documentation')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleGithubPress}>
                        <FeatherIcon style={styles.buttonText} name={'github'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('github')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleAboutPress}>
                        <FeatherIcon style={styles.buttonText} name={'info'} size={20} />
                        <Text style={styles.buttonText} numberOfLines={1}>{t('about')}</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }

}

export default MoreScreen;