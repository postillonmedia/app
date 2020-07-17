import React from 'react';
import ReactNative from 'react-native';

import parse from 'url-parse';

import {InAppBrowser} from '../../../../../utils/util';
import {getBlogByHostname} from '../../../../../constants/blogs';

import Text from '../text';

export default function(props = {}) {
  const {
    htmlAttribs,
    children,
    parentWrapper,
    keyProperty,
    data,
    styles,
    constants,
    ...otherProps
  } = props;

  const onPress = evt => {
    if (!(htmlAttribs && htmlAttribs.href)) {
      return;
    }

    const parsedUrl = parse(htmlAttribs.href);
    const {hostname, pathname: path} = parsedUrl;

    const blogId = getBlogByHostname(hostname);

    // if (hostname && blogId && path && path !== '/' && !(path[0] === '/' && path[1] === 'p' && path[2] === '/')) {
    //     // an article of the Postillon was pressed
    //
    //     // TODO: point to the right screen
    //     Navigation.handleDeepLink({
    //         link: 'postillon/article',
    //         payload: {
    //             url: htmlAttribs.href,
    //             parsedUrl,
    //             hostname,
    //             path,
    //             blogId,
    //         },
    //     });
    //
    // } else {
    InAppBrowser.open(htmlAttribs.href);
    // }
  };

  if (parentWrapper === 'Text') {
    return (
      <Text
        {...props}
        style={styles.a}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={onPress}
        key={keyProperty}>
        {children || data}
      </Text>
    );
  } else {
    return children || data;
  }
}
