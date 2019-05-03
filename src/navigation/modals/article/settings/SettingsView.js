import React, { PureComponent } from 'react';
import ReactNative, { StyleSheet, Text, Switch, TouchableOpacity, View } from 'react-native';

import Slider from '@react-native-community/slider';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { Themes } from '../../../../constants/themes';
import { Config } from '../../../../constants/config';


export class SettingsView extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleUpdateFontSize = newFontSize => {
        const { fontSize, setFontSize } = this.props;

        if (newFontSize !== fontSize) {
            setFontSize(newFontSize);
        }
    };

    handleThemeChange = (enabled) => {
        const { setTheme } = this.props;

        setTheme(enabled ? Themes.DEFAULT : Themes.DARK);
    };

    handleArticleToArchiveWithoutPicturesPress = () => {
        const { stateManager, id, addArticleToArchiveWithoutPictures } = this.props;

        addArticleToArchiveWithoutPictures(id);

        stateManager.close();
    };

    render() {
        const { constants, styles, theme, fontSize, t } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.group}>
                    <Text style={styles.heading}>{t('fontsize').toUpperCase()}</Text>
                    <View style={styles.option}>
                        <Text style={styles.settingsFontSizeSliderSmall}>A</Text>
                        <Slider style={styles.settingsFontSizeSlider}
                                hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
                                thumbTintColor={constants.colors.switches.thumbTintColor}
                                minimumTrackTintColor={constants.colors.switches.onTintColor} maximumTrackTintColor={constants.colors.switches.tintColor}
                                minimumValue={Config.article.fontsize.min} maximumValue={Config.article.fontsize.max}
                                value={fontSize} step={3} onValueChange={this.handleUpdateFontSize} />
                        <Text style={styles.settingsFontSizeSliderBig}>A</Text>
                    </View>
                </View> 
  
                <View style={[styles.group, styles.lastGroup]}>     
                    <Text style={styles.heading}>{t('theme').toUpperCase()}</Text>
                    <View style={styles.option}>
                        <FeatherIcon name={'moon'} size={20} color={theme === Themes.DARK ? constants.colors.text.highlighted : constants.colors.text.lighter} style={styles.gradientIcon} />

                        <Switch
                            value={theme === Themes.DEFAULT}
                            onValueChange={this.handleThemeChange}
                            thumbColor={theme === Themes.DEFAULT ? constants.colors.switches.thumbTintColor : constants.colors.switches.offThumbTintColor}
                            trackColor={{
                                true: constants.colors.switches.onTintColor,
                                false: constants.colors.switches.tintColor,
                            }}
                        />

                        <FeatherIcon name={'sun'} size={20} color={theme === Themes.DEFAULT ? constants.colors.text.highlighted : constants.colors.text.lighter} style={styles.gradientIcon} />
                    </View>    
                </View>
            </View>
        );
    }

}

export default SettingsView;