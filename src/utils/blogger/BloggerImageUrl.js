/**
 * Created by DanielL on 21.06.2017.
 */

export const getImageUrl = (url, width) => {
    if (typeof url !== 'string') {
        throw Error('url parameter of getImageUrl() must be a string.');
    }

    if (typeof width !== 'number') {
        throw Error('width parameter of getImageUrl() must be a number.');
    }

    try {
        const urlParts = url.split('/');

        return url.replace(urlParts[urlParts.length-2], 's' + width);
    } catch (e) {
        return url;
    }
};