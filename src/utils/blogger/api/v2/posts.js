import { URL } from './index';

import qs from 'qs';

import { Parser } from 'htmlparser2';
import { BloggerHandler } from '../../BloggerHandler';


export function list(request, headers = {}) {
    const { blogId, categories, ...queryParams } = request;

    const categoryString = categories && Array.isArray(categories) && categories.length > 0 && '-/' + categories.join('/') || '';
    const query = qs.stringify(queryParams);

    return new Promise((resolve, reject) => {
        const handler = new BloggerHandler((error, feed) => {
            if (error) {
                reject({
                    error,
                    feed,
                });
            } else {
                resolve({
                    error,
                    feed,
                });
            }
        });

        const parser = new Parser(handler);

        fetch(`${URL}/${blogId}/posts/default/${categoryString}?${query}`, {
            method: 'GET',
            headers,
        })
            .then(response => response.text())
            .then(text => {
                parser.write(text);
                parser.end();
            })
            .catch(error => reject({error}));

    });







}

export default {
    list,
}