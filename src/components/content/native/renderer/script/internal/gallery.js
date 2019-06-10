import React from 'react';
import ReactNative, { FlatList, Image, View } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import { Zoomy } from '../../../../../zoomy/index';
import { ImageContainer } from '../../../../../mediacontainer';
import OfflineIndicator from '../../../../../offlineIndicator/image';

import Text from '../../text';


const runJSinContext = (script, context) => {
    return (new Function('with(this) { return ' + script + ' }')).call(context);
};

const context = {
    generateSlider: function (id, aSources) {
        if (Array.isArray(aSources)) {
            const gallery = [];

            for (let i = 0; i < aSources.length; i++) {
                let oSource = aSources[i];

                const image = {
                    url: oSource.pic,
                    text: oSource.text,
                    copyright: oSource.copy
                };

                gallery[i] = image;
            }

            return gallery;
        }

        return undefined;
    }
};


export default function (props = {}) {

    const { htmlAttribs, children, rawChildren, parentWrapper, parentTag, baseUrl, keyProperty, data, styles, constants, theme, locale, t, dom, ...otherProps } = props;


    const script = rawChildren && rawChildren.length > 0 && rawChildren[0].data && typeof rawChildren[0].data === 'string' && rawChildren[0].data.trim();

    if (script) {
        const gallery = runJSinContext(script, context);

        const width = ReactNative.Dimensions.get('window').width;
        const itemWidth = width - (width / 6);

        return (
            <Carousel
                key={keyProperty}
                data={gallery}
                renderItem={({item}) => (
                    <View style={{flex: 1}}>
                        <Zoomy>
                            <ImageContainer
                                source={{ uri: item.url }}
                                style={[styles.image, { flex: 1, minHeight: 200 }]}

                                ImageComponent={Image}

                                renderNotOnlineComponent={(props = {}) => (
                                    <OfflineIndicator {...props} />
                                )}

                                borderRadius={5}
                            />
                        </Zoomy>

                        <Text style={[styles.caption, {flex: 1}]}>{item.text}</Text>
                    </View>
                )}
                itemWidth={itemWidth}
                sliderWidth={null}
                activeSlideAlignment={'center'}
            />
        );

    } else {
        return false;
    }




};