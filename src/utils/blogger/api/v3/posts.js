/**
 * Created by DanielL on 14.07.2017.
 */

import qs from 'qs';
import parse from 'url-parse';

import { URL } from './index';


export function list(request, headers = {}) {
    const { blogId, ...queryParams } = request;

    const query = qs.stringify(queryParams);

    return fetch(`${URL}/${blogId}/posts/list?${query}`, {
        method: 'GET',
        headers,
    })
        .then(response => response.json())
        .then(json => {
            // check for error
            if (json && json.error) {
                throw Error(json.error.message, json.error.code);
            }

            // process json
            const { nextPageToken, etag, items } = json;

            return {
                etag,
                nextPageToken,
                articles: items,
            };
        });
}

export function getByPath(request, headers = {}) {
    const { blogId, ...queryParams } = request;

    const query = qs.stringify(queryParams);

    return fetch(`${URL}/${blogId}/posts/bypath?${query}`, {
        method: 'GET',
        headers,
    })
        .then(response => response.json())
        .then(articleData => {

            if (articleData && articleData.error) {
                throw Error(articleData.error.message, articleData.error.code);
            }

            return {
                article: articleData,
            };
        });
}

export default {
    list,
    getByPath,
}