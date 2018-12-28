import playbuzz from './playbuzz';
import polldaddy from './polldaddy';

export default function (props) {

    const { htmlAttribs, children, parentWrapper, onLinkPress, key, data, styles, constants, theme, locale, t, ...otherProps } = props;
    const src = htmlAttribs && htmlAttribs.src;

    if (src.indexOf('polldaddy') >= 0) {
        return polldaddy(props);
    } else if (src.indexOf('playbuzz') >= 0) {
        return playbuzz(props);
    } else {
        return false;
    }

}