import Realm from 'realm';


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
}


export default Article;