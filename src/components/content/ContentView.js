/**
 * Created by DanielL on 18.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { View } from 'react-native';

import NativeRenderer from './native';
import WebViewRenderer from './webview';


export class ContentView extends PureComponent {

    static displayName = 'Content';
    static componentName = 'Content';

    static propTypes = {
        html: PropTypes.string.isRequired,
        baseUrl: PropTypes.string.isRequired,

        emSize: PropTypes.number.isRequired,
        baseFontSize: PropTypes.number.isRequired,
        textSelectable: PropTypes.bool,

        width: PropTypes.number.isRequired,

        imagesToExclude: PropTypes.arrayOf(PropTypes.string),
        renderAd: PropTypes.func,

        t: PropTypes.object.isRequired,
        styles: PropTypes.object.isRequired,
        constants: PropTypes.object.isRequired,
    };

    static defaultProps = {
        emSize: 14,
        baseFontSize: 14,
        textSelectable: false,

        width: undefined,

        imagesToExclude: [],
        renderAd: () => null,
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the webview renderer.
        return { error };
    }

    constructor(props, context, updater) {
        super(props, context, updater);

        this.state = {
            error: false,
        };
    }

    render() {
        const { error } = this.state;
        const { html, baseUrl, baseFontSize, emSize, width, imagesToExclude, renderAd, t, theme, styles, constants } = this.props;

        let Renderer = null;

        if (!error) {
            Renderer = NativeRenderer;
        } else {
            Renderer = WebViewRenderer;
        }

        return (
            <Renderer
                html={html}
                baseUrl={baseUrl}

                baseFontSize={baseFontSize}
                emSize={emSize}
                width={width}

                imagesToExclude={imagesToExclude}
                renderAd={renderAd}

                t={t}

                theme={theme}
                styles={styles}
                constants={constants}
            />
        );
    }

}

export default ContentView;