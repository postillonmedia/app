import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactNative, {ActivityIndicator, Platform, TouchableOpacity, View} from 'react-native';

import { walkthroughable, CopilotStep } from '@okgrow/react-native-copilot';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Article from "../../../realm/schemas/article";

const CopilotTouchableOpacity = walkthroughable(TouchableOpacity);


export class ControlsView extends PureComponent {

    static propTypes = {
        articleState: PropTypes.object,
        displayBackButton: PropTypes.bool,

        handleBackPress: PropTypes.func,
        handleLongBackPress: PropTypes.func,
        handleSettingsPress: PropTypes.func,
        handleArchivePress: PropTypes.func,
        handleSharePress: PropTypes.func,
    };

    static defaultProps = {
        displayBackButton: Platform.OS === 'ios',
    };


    handleBackPress = () => {
        const { handleBackPress } = this.props;

        handleBackPress && handleBackPress();
    };

    handleLongBackPress = () => {
        const { handleLongBackPress } = this.props;

        handleLongBackPress && handleLongBackPress();
    };

    handleSettingsPress = () => {
        const { handleSettingsPress } = this.props;

        handleSettingsPress && handleSettingsPress();
    };

    handleArchivePress = () => {
        const { handleArchivePress } = this.props;

        handleArchivePress && handleArchivePress();
    };

    handleSharePress = () => {
        const { handleSharePress } = this.props;

        handleSharePress && handleSharePress();
    };


    renderBackButton = () => {
        const { displayBackButton, styles, constants, t } = this.props;

        if (displayBackButton) {
            return (
                <CopilotStep name={'back'} order={2} text={t('copilot.back')}>
                    <CopilotTouchableOpacity style={styles.button} onPress={this.handleBackPress} onLongPress={this.handleLongBackPress}>
                        <FeatherIcon name={'arrow-left'} size={26} color={constants.colors.text.primary} />
                    </CopilotTouchableOpacity>
                </CopilotStep>
            );
        } else {
            return null;
        }
    };

    renderArchivateButton = () => {
        const { articleState, styles, constants } = this.props;
        const isArchivating = (articleState && articleState.isArchivating) || false;

        if (isArchivating) {
            return (
                <View style={styles.button}>
                    <ActivityIndicator animating={true} color={constants.colors.activityIndicator} />
                </View>
            );
        } else {
            const article = articleState.article;
            const isArchived = (articleState && articleState.isArchived) || Article.isArchivated(article);

            return (
                <TouchableOpacity style={styles.button} onPress={this.handleArchivePress}>
                    <FeatherIcon name={isArchived ? 'trash-2' : 'download'} size={26} color={constants.colors.text.primary} />
                </TouchableOpacity>
            );
        }
    };

    render() {
        const { styles, constants, t } = this.props;

        return (
            <View key={'controls'} style={styles.controls}>
                { this.renderBackButton() }

                <CopilotStep name={'settings'} order={3} text={t('copilot.settings')}>
                    <CopilotTouchableOpacity style={styles.button} onPress={this.handleSettingsPress}>
                        <FeatherIcon name={'sliders'} size={26} color={constants.colors.text.primary} />
                    </CopilotTouchableOpacity>
                </CopilotStep>

                { this.renderArchivateButton() }

                <TouchableOpacity style={styles.button} onPress={this.handleSharePress}>
                    <FeatherIcon name={'share-2'} size={26} color={constants.colors.text.primary} />
                </TouchableOpacity>
            </View>
        );
    }
}


export default ControlsView;