import Realm from 'realm';

import {Parser, DomUtils, DomHandler} from 'htmlparser2';

class Article {

    static schema = {
        name: 'Article',
        primaryKey: 'id',
        properties: {
            published: {type: 'date'},
            updated: {type: 'date'},
            loaded: {type: 'date', default: new Date()},
            opened: {type: 'date', optional: true},
            archived: {type: 'date', optional: true},

            id: {type: 'string'},
            articleId: {type: 'string'},
            url: {type: 'string'},
            path: {type: 'string'},
            etag: {type: 'string'},

            title: {type: 'string'},
            html: {type: 'string'},

            blog: {type: 'Blog'},
            labels: {type: 'list', objectType: 'Label'},
            categories: {type: 'list', objectType: 'Category'},

            image: {type: 'string', optional: true},
            images: {type: 'list', objectType: 'Image'},
        },
    };

    static isArchivated(article) {
        return !!(article.archived && article.archived instanceof Date);
    }

    static getIntroduction(article) {
        let introduction = '';

        const parser = new Parser({
            onopentag: function(name, attribs){
                if (name === 'a' && attribs.name === 'more') {
                    parser.done();
                    parser.reset();
                }
            },
            ontext: function(text){
                introduction += text;
            }
        }, {
            decodeEntities: true,
            lowerCaseAttributeNames: true,
        });

        parser.write(article.html);
        parser.done();

        return introduction.trim();
    }
}


export default Article;