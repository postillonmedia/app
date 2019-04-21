import gallery from './gallery';

export default function (props) {

    const { htmlAttribs, children, rawChildren, parentWrapper, onLinkPress, key, data, styles, constants, theme, locale, t, ...otherProps } = props;
    const src = htmlAttribs && htmlAttribs.src;

    return gallery(props);

    if (rawChildren && rawChildren[0] && rawChildren[0].data && rawChildren[0].data.indexOf('generateSlider') >= 0) {
        return gallery(props);
    } else {
        return false;
    }

}