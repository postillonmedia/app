/**
 * Created by DanielL on 16.06.2017.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, { Image, Platform, Text, View } from 'react-native';
import ImageSourcePropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageSourcePropType';
import Thumbnail from './../../thumbnail';

import LinearGradient from 'react-native-linear-gradient';

import Images from './../../../realm/db/images';


export class ImageContainerView extends PureComponent {

    static displayName = 'ImageContainer';
    static componentName = 'ImageContainer';

    static propTypes = {
        isConnected: PropTypes.bool.isRequired,

        locale: PropTypes.string.isRequired,
        styles: PropTypes.object.isRequired,
        constants: PropTypes.object.isRequired,
        t: PropTypes.func.isRequired,

        source: ImageSourcePropType.isRequired,

        renderImageComponent: PropTypes.func,
        renderNotOnlineComponent: PropTypes.func,

        ImageComponent: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object,
        ]),
    };

    static defaultProps = {
        ImageComponent: Image,
    };

    constructor(props, context) {
        super(props, context);

        const { source } = this.props;

        this.setImageState(source, true);
    }

    componentWillReceiveProps(nextProps) {
        const { source } = nextProps;

        this.setImageState(source);
    }

    setImageState = (source, initialize = false) => {
        const isCompatible = (source && source.uri && typeof source.uri === 'string');

        let state;

        if (isCompatible) {
            const image = Images.getImageByUrl(source.uri) || {};

            let imagePath = image.path || undefined;

            if (Platform.OS === 'android') {
                if (imagePath) {
                    imagePath = 'file://' + imagePath;
                }
            }

            // query image cache
            this.queryImageCache(source.uri);

            state = {
                compatible: isCompatible,
                cached: null,
                path: (image.offline && imagePath) || null,
            };
        } else {
            state = {
                compatible: isCompatible,
                cached: null,
                path: null,
            };
        }

        // set/update state
        if (initialize) {
            this.state = state;
        } else {
            this.setState(state);
        }
    };

    queryImageCache = (uri) => {
        Image.queryCache([uri])
            .then((cached) => {
                cached[uri] && this.setState({
                    cached: cached[uri],
                });
            });
    };

    renderImage = (props) => {
        const { ImageComponent } = this.props;

        return (
            <ImageComponent
                {...props}
            />
        );
    };

    renderNotOnline = (props) => {
        const { source } = props;
        const { styles } = this.props;

        return (
            <View style={styles.container}>
                <Thumbnail source={source} />

                <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.6)']} style={styles.gradient}>
                    <Text style={styles.text}>Du bist zur Zeit nicht online</Text>
                </LinearGradient>
            </View>
        );
    };

    render() {
        const { isConnected, source, renderImageComponent, renderNotOnlineComponent, styles, constants, locale, t, ...props } = this.props;
        const { compatible, cached, path } = this.state;

        const renderImage = renderImageComponent || this.renderImage;
        const renderNotOnline = renderNotOnlineComponent || this.renderNotOnline;

        let imageProps = {
            ...props,
            source,

            path,
            cached,
        };

        if (compatible) {
            if (!isConnected) {
                // app is offline

                if (path) {
                    imageProps.source = {
                        ...imageProps.source,

                        uri: path,
                    };

                    return renderImage(imageProps);
                } else if (cached) {
                    return renderImage(imageProps);
                } else {
                    return renderNotOnline(imageProps);
                }
            } else {
                // app is online

                if (path) {
                    imageProps.source = {
                        ...imageProps.source,

                        uri: path,
                    };

                    return renderImage(imageProps);
                } else {
                    return renderImage(imageProps);
                }
            }
        }

        return renderImage(imageProps);
    }
}

export default ImageContainerView;
