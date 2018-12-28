import React, { Children } from 'react';
import ReactNative, { View } from 'react-native';

import { DomUtils } from 'htmlparser2';

import Img from '../img';
import Text from '../text';


export default function (props = {}) {

    const { htmlAttribs, children, rawChildren, parentWrapper, keyProperty, data, styles, constants, ...otherProps } = props;

    if (htmlAttribs && htmlAttribs.class && htmlAttribs.class.indexOf('tr-caption-container') >= 0) {
        const image = DomUtils.findOne((elem) => elem && elem.name && elem.name === 'img', rawChildren);
        const caption = DomUtils.findOne((elem) => elem && ((elem.name && elem.name === 'td') && (elem.attribs && elem.attribs.class && elem.attribs.class.indexOf('tr-caption') >= 0)), rawChildren);

        const imageProps = {
            ...props,

            style: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },

            htmlAttribs: image.attribs,
            keyProperty: keyProperty + '-image',

            children: [],
            rawChildren: [],
        };

        const captionProps = {
            ...props,

            style: styles.caption,

            keyProperty: keyProperty + '-caption',

            data: caption.data,
            children: DomUtils.getText(caption),
            rawChildren: caption.children,
        };

        return (
            <View key={keyProperty + '-container'}>
                <Img {...imageProps} />
                <Text {...captionProps} />
            </View>
        );
    } else {
        return false;
    }

};